/**
 * Minimal HTML → Markdown for the build-time markdown twins. Input is React's own
 * prerendered markup (well-formed, known components), so a small tokenizer + tree walk is
 * enough — no DOM library. Decorative subtrees (aria-hidden, svg, scripts) are dropped;
 * tab buttons become the heading of their panel; links and images become absolute URLs.
 */

const VOID = new Set(['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'source', 'track', 'wbr'])
// nav: breadcrumbs repeat what the twin's header already says (canonical URL)
const SKIP = new Set(['script', 'style', 'svg', 'noscript', 'template', 'canvas', 'button', 'nav'])
const BLOCK = new Set(['div', 'section', 'article', 'header', 'footer', 'main', 'figure', 'figcaption', 'dl', 'dt', 'dd', 'blockquote'])
const BACKTICK = '`'

const ENTITIES = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ' }
const decode = s =>
    s.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (m, e) => {
        if (e[0] === '#') return String.fromCodePoint(e[1] === 'x' || e[1] === 'X' ? parseInt(e.slice(2), 16) : Number(e.slice(1)))
        return ENTITIES[e.toLowerCase()] ?? m
    })

function parseAttrs(raw) {
    const attrs = {}
    for (const m of raw.matchAll(/([^\s=/]+)(?:="([^"]*)")?/g)) attrs[m[1].toLowerCase()] = decode(m[2] ?? '')
    return attrs
}

/** Tokenize into a light tree: { tag, attrs, children } | { text }. Comments are dropped. */
function parse(html) {
    const root = { tag: '#root', attrs: {}, children: [] }
    const stack = [root]
    const re = /<!--[\s\S]*?-->|<\/([a-zA-Z0-9]+)\s*>|<([a-zA-Z0-9]+)((?:\s+[^\s=/>]+(?:="[^"]*")?)*)\s*(\/?)>|([^<]+)/g
    for (const m of html.matchAll(re)) {
        const top = stack[stack.length - 1]
        if (m[5] !== undefined) top.children.push({ text: decode(m[5]) })
        else if (m[2]) {
            const node = { tag: m[2].toLowerCase(), attrs: parseAttrs(m[3] || ''), children: [] }
            top.children.push(node)
            if (!VOID.has(node.tag) && !m[4]) stack.push(node)
        } else if (m[1]) {
            const tag = m[1].toLowerCase()
            const at = stack.map(n => n.tag).lastIndexOf(tag)
            if (at > 0) stack.length = at
        }
    }
    return root
}

const hasHeading = node => !!node.children?.some(c => /^h[1-6]$/.test(c.tag) || hasHeading(c))

const textOf = node => (node.text ?? node.children?.map(textOf).join('') ?? '').replace(/\s+/g, ' ').trim()

function collectTabLabels(node, labels = {}) {
    if (node.attrs?.role === 'tab' && node.attrs.id) labels[node.attrs.id] = textOf(node)
    node.children?.forEach(child => collectTabLabels(child, labels))
    return labels
}

const isHidden = node => SKIP.has(node.tag) || node.attrs['aria-hidden'] === 'true'

const isBlockNode = child =>
    !!child.tag &&
    (BLOCK.has(child.tag) ||
        /^(h[1-6]|p|ul|ol|li)$/.test(child.tag) ||
        child.attrs?.role === 'tabpanel' ||
        (child.tag === 'a' && hasHeading(child)))

export function htmlToMarkdown(html, origin) {
    const tree = parse(html)
    const tabLabels = collectTabLabels(tree)
    const abs = url => (!url || /^(https?:|mailto:|tel:)/.test(url) ? url : new URL(url, origin).href)

    /** Href of the card link being walked: its heading becomes the link, its cover image is dropped. */
    let cardHref = null

    /** Join sibling inline outputs. Adjacent elements (badges, link rows, stat pills) are
     *  separated on screen by CSS gaps, so they get a space when neither side has one. */
    const joinInline = nodes => {
        let acc = ''
        let prevWasElement = false
        for (const node of nodes) {
            const part = inline(node)
            if (!part) continue
            const isElement = node.text === undefined
            if (isElement && prevWasElement && !/\s$/.test(acc) && !/^\s/.test(part)) acc += ' '
            acc += part
            prevWasElement = isElement
        }
        return acc
    }

    /** Inline content of a node, whitespace collapsed. */
    const inline = node => {
        if (node.text !== undefined) return node.text.replace(/\s+/g, ' ')
        if (isHidden(node)) return ''
        const inner = joinInline(node.children)
        const trimmed = inner.trim()
        switch (node.tag) {
            case 'br':
                return '\n'
            case 'img':
                return node.attrs.alt && !cardHref ? `![${node.attrs.alt}](${abs(node.attrs.src)})` : ''
            case 'strong':
            case 'b':
                return trimmed ? `**${trimmed}**` : ''
            case 'em':
            case 'i':
                return trimmed ? `_${trimmed}_` : ''
            case 'code':
                return trimmed ? BACKTICK + trimmed + BACKTICK : ''
            case 'a':
                return trimmed ? `[${trimmed.replace(/\s+/g, ' ')}](${abs(node.attrs.href)})` : ''
            default:
                return inner
        }
    }

    const out = []
    const flush = text => {
        const t = text.replace(/[ \t]+/g, ' ').replace(/ *\n */g, '\n').trim()
        if (t) out.push(t)
    }

    /** Render a subtree's blocks into their own array (list item bodies). */
    const blocksOf = node => {
        const saved = out.length
        block({ ...node, tag: 'div' })
        return out.splice(saved)
    }

    /** Items keep their own blocks (headings, nested lists), indented under the marker. */
    const list = node => {
        const items = node.children
            .filter(c => c.tag === 'li')
            .map((li, i) => {
                const marker = node.tag === 'ol' ? `${i + 1}.` : '-'
                const pad = ' '.repeat(marker.length + 1)
                const lines = blocksOf(li).join('\n\n').split('\n')
                return `${marker} ${lines.map((l, k) => (k === 0 || !l ? l : pad + l)).join('\n')}`
            })
        if (items.length) out.push(items.join(items.some(item => item.includes('\n')) ? '\n\n' : '\n'))
    }

    /** Block walk: headings, paragraphs and lists become their own markdown blocks. */
    const block = node => {
        if (node.text !== undefined) return flush(node.text)
        if (isHidden(node)) return
        const heading = /^h([1-6])$/.exec(node.tag)
        if (heading) {
            const title = inline(node).trim()
            return flush(`${'#'.repeat(Number(heading[1]))} ${cardHref ? `[${title}](${cardHref})` : title}`)
        }
        if (node.tag === 'a' && hasHeading(node)) {
            cardHref = abs(node.attrs.href)
            block({ ...node, tag: 'div' })
            cardHref = null
            return
        }
        if (node.tag === 'img' && cardHref) return
        if (node.tag === 'p' || node.tag === 'img' || node.tag === 'a') return flush(inline(node))
        if (node.tag === 'ul' || node.tag === 'ol') return list(node)
        if (node.attrs.role === 'tabpanel' && tabLabels[node.attrs['aria-labelledby']]) {
            flush(`## ${tabLabels[node.attrs['aria-labelledby']]}`)
        }
        if (BLOCK.has(node.tag) || node.tag === '#root' || node.tag === 'li') {
            // Runs of inline children (text, spans, links) form one paragraph
            let run = []
            const endRun = () => {
                if (run.length) flush(joinInline(run))
                run = []
            }
            for (const child of node.children) {
                if (isBlockNode(child)) {
                    endRun()
                    block(child)
                } else run.push(child)
            }
            return endRun()
        }
        return flush(inline(node))
    }

    block(tree)
    return out.join('\n\n').replace(/\n{3,}/g, '\n\n')
}
