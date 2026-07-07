# Phase 3: Homepage Day-to-Night Rebuild — Script Inertia & CSS Amnesia

**Date**: 2026-07-07 22:04  
**Severity**: Medium (scope creep, CSS reset footprint)  
**Component**: Homepage (index.tsx, home/ sections, scene/use-pinned-intro, zone-particles)  
**Status**: Completed, committed

## Sự kiện

Completed phase 3: rebuilt 5 homepage scenes (HeroDawn kept, About morning, Skills bento, Experience dusk pinned, Night contact) fully Tailwind semantic tokens + Motion reveals. Removed 8 orphaned components (scroll-reveal-section, timeline-3d-path, timeline-card, skill-card, skill-category, bio, animated-button, lib/use-scroll-section). Homepage port sạch Chakra import. Code-reviewer: DONE, 7/7 acceptance. Build + lint pass, 0 errors.

**Commit**: `a3fb1df` — `feat(home): rebuild homepage into day-to-night scroll scenes` (15 files: +561/−912).

## Sự thật phũ phàng

Implementation went smooth until preflight OFF hit us: `<ol>` timeline + `<ul>` skills hiện cả marker mặc định vì Chakra CSSReset cũ không reset nữa (dùng Tailwind preflight chưa bật). 5 phút debug để realize mình vừa xóa một CSS file mà không nhận ra dependency. Paragraph.tsx phải giữ lại (plan ghi delete nhưng 16 trang detail vẫn import nó) — không phát hiện dependency trước khi planning. Skills bento ban đầu hard-code span dựa title-string lookup → review flagged M1 (chỉ 1 typo hoặc data drift = silent card drop). Port lại data-driven span; lỡ làm rồi mới hiểu nguy hiểm.

## Chi tiết kỹ thuật

**Bug 1 — Missing CSS reset (markers leak):**
```html
<!-- Plan: preflight OFF phase 1-5, đảm bảo coexist Chakra -->
<!-- Reality: Chakra CSSReset chạy ở Chakra pages (detail/works)
            nhưng CSSReset KHÔNG chạy ở homepage (Tailwind section)
            → <ol>/<ul> browser default markers nhấy lên -->
<ol class="space-y-2">  <!-- no list-none class →marker show -->
  <li>Timeline entry</li>
</ol>
```
Fix: thêm `list-none` inline ở experience-dusk.tsx + skills-bento.tsx.

**Bug 2 — Silent card drop risk (hard-coded span):**
```typescript
// BEFORE (brittle):
const spanMap = { "Frontend": "col-span-2", "AI & ML": "col-span-1" }
// If "Frontend" → "FrontEnd" typo, card span undefined → silent drop

// AFTER (data-driven):
type SkillGroup = { title: string, span: "col-span-2"|"col-span-1", items: [...] }
// Span co-located, refactor-safe
```
Review M1 → fixed ở session này trước commit.

**Deliverables:**
- `home-data.ts` (184 lines, port nguyên từ index.tsx cũ: skills 4 categories, experience 4 entries, hobbies, socials)
- `about-morning.tsx`, `skills-bento.tsx` (6-col responsive bento: FE4/BE4 span-2, AI2/Tools2 span-1), `experience-dusk.tsx` (rail + 4 cards + usePinnedIntro hook), `night-contact.tsx` (hobbies + socials + mailto)
- `use-pinned-intro.ts` (ScrollTrigger pin, guarded: !reducedMotion && !coarsePointer; pinSpacing ON)
- Rewrite index.tsx: compose 5 scenes IN Layout wrapper, xóa toàn Chakra; giữ SEO/JSON-LD

**Key decisions implemented:**
1. CV download: declarative `<a download>` (phase 2 review L1: bỏ imperative DOM blob) ✓
2. Fireflies zone (night-a): phase 2 scroll-driven CSS vars trigger tự động ở đáy → không cần sửa zone-particles ✓
3. Preflight OFF → manual list-none (CSS debt, phase 6 sẽ reset khi bật preflight) ✓

## Cố gắng

- Code-review subagent: computed-styles assertions + contrast check → caught M1 bento span, L1 CV download, 5 minor formatting
- Smoke test: browser preview light/dark + mobile bento responsiveness (1/2/6 col ✓) + reduced-motion toggle (content static, no animation ✓)
- Grep verify: 0 @chakra in index.tsx/home/ ✓, 1 pin:true ✓, 1 ScrollTrigger import (scene/) ✓, reveals once ✓

## Nguyên nhân gốc

1. **Preflight coexist assumption bug**: plan ghi "Chakra CSSReset coexist" nhưng không test thiếu CSSReset trong scope Tailwind-only sections → CSS reset assumption ăn may từ phase 1 (Chakra pages có đủ detail/ pages reset sạch)
2. **Dependency blindness**: paragraph.tsx dùng rộng detail pages nhưng phase 3 scope ghi "xóa hết orphaned" → parser heuristic missed 16 callers (grep tiền không đủ)
3. **Data-driven span chót vát**: hard-code span-map dựa title lookup phổ biến pattern nhưng review đẫn tới typo-risk; data-drive bằng refactor nhanh trong session

## Bài học

- **CSS coexist = detail-blind trap**: coexist mode sound on paper nhưng "Chakra reset ở Chakra pages, TW reset ở TW pages" = false assumption. Phải test MỖI zone CSS reset được hay không (getComputedStyle `list-style` mandatory).
- **Grep is not dependency tracer**: grep `paragraph` → 16 callers ✓; grep `GridItemStyle` (phase 5 xóa) → catch được; nhưng heuristic đơn giản bỏ sót. Phase 5 PHẢI manual audit "import X from deprecated-file" cho tất cả.
- **Data > strings**: hard-code lookup values (title string → span value) mỏng manh. Colocate dữ liệu tính toán với data shape — type-safe + refactor-proof. M1 được adopt vào phase 4 đối với work featured grid.
- **Declarative > imperative**: `<a download>` vs blob DOM manipulation — 5 LOC thành 1 attr, browser native, kiếm được accessibility + preload. Review guide gold.

## Tiếp theo

- Phase 4: Works grid (4 featured projects, tái dùng skills bento responsive pattern); lưu ý M1 data-driven strategy
- Phase 5: Detail templates (article.tsx gỡ GridItemStyle khi migrate timeline, paragraph.tsx vẫn giữ; re-audit callers)
- Phase 6: Chakra removal + preflight ON → list-none debt repay; React 19 + jest removal
- **Policy update**: Coexist CSS mode → mandatory zone test (computed-style assertions per section); data-driven lookup vào dev rubric

---

Status: DONE  
Summary: Phase 3 complete; rebuilt homepage 5 scenes Tailwind/Motion, removed 8 legacy components, guarded pinned intro (reduced-motion + touch). Caught CSS reset debt + bento data-driven typo risk via code review; all 7/7 acceptance criteria verified.
