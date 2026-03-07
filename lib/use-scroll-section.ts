import { useEffect, useState, useCallback, useRef } from 'react'

export type SectionName = 'hero' | 'about' | 'skills' | 'work' | 'contact'

interface ScrollState {
    /** Overall scroll progress 0–1 */
    scrollProgress: number
    /** Currently active section */
    activeSection: SectionName
    /** Progress within the active section 0–1 */
    sectionProgress: number
}

const SECTION_ORDER: SectionName[] = ['hero', 'about', 'skills', 'work', 'contact']

export function useScrollSection(): ScrollState {
    const [state, setState] = useState<ScrollState>({
        scrollProgress: 0,
        activeSection: 'hero',
        sectionProgress: 0
    })
    const rafId = useRef(0)

    const update = useCallback(() => {
        const scrollY = window.scrollY
        const docHeight = document.documentElement.scrollHeight - window.innerHeight
        const progress = docHeight > 0 ? Math.min(scrollY / docHeight, 1) : 0

        // Determine active section from data-section elements
        let activeSection: SectionName = 'hero'
        let sectionProgress = 0

        const sections = document.querySelectorAll<HTMLElement>('[data-section]')
        const viewportCenter = window.innerHeight * 0.4

        for (let i = sections.length - 1; i >= 0; i--) {
            const el = sections[i]
            const rect = el.getBoundingClientRect()
            if (rect.top <= viewportCenter) {
                activeSection = (el.dataset.section as SectionName) || 'hero'
                const sectionHeight = rect.height
                const passed = viewportCenter - rect.top
                sectionProgress = Math.min(Math.max(passed / sectionHeight, 0), 1)
                break
            }
        }

        setState({ scrollProgress: progress, activeSection, sectionProgress })
    }, [])

    useEffect(() => {
        const onScroll = () => {
            cancelAnimationFrame(rafId.current)
            rafId.current = requestAnimationFrame(update)
        }

        update() // initial
        window.addEventListener('scroll', onScroll, { passive: true })
        window.addEventListener('resize', update, { passive: true })

        return () => {
            cancelAnimationFrame(rafId.current)
            window.removeEventListener('scroll', onScroll)
            window.removeEventListener('resize', update)
        }
    }, [update])

    return state
}

/** Maps section name to a 0–1 range in the overall scroll */
export function getSectionScrollRange(section: SectionName): [number, number] {
    const ranges: Record<SectionName, [number, number]> = {
        hero: [0, 0.15],
        about: [0.15, 0.30],
        skills: [0.30, 0.55],
        work: [0.55, 0.80],
        contact: [0.80, 1.0]
    }
    return ranges[section]
}
