# Phase 01: Tailwind Foundation + AnimatePresence Hotfix — Phát Hiện Chuỗi Bug Tiềm Tàng

**Date**: 2026-07-07 15:42  
**Severity**: Critical + High  
**Component**: App routing (AnimatePresence), CSS cascade (Tailwind ↔ Chakra), index.html theme init  
**Status**: Hotfixed, root causes identified

## Sự kiện

Hoàn thành Phase 01 (Tailwind 4.3.2 coexist Chakra, tokens Ghibli, 8 UI primitives, layout components mới). Build + lint pass. Smoke test 20 routes + 404 bỡn khi phát hiện **bug Navigation sập**: SPA navigate đổi URL nhưng nội dung trang cũ kẹt, không transition. Dev + prod build đều lỗi. Git stash toàn bộ thay đổi → test code gốc → **bug pre-existing từ Next.js → Vite migration**, không ai phát hiện vì mọi người chỉ xem homepage.

## Sự thật phũ phàng

Trang web này có thể đã broken navigation trong **hơn 3 tháng** mà không ai biết. Framer-motion AnimatePresence mode="wait" quanh Routes exit animation **KHÔNG BAO GIỜ complete**, mọi page transition đều chết. Nếu không keyed-test 20 routes hôm nay, đến hôm nào code đó cũng bỏng tay. Phần tệ hơn: code-review phát hiện **C1-Critical CSS cascade bug** — Chakra CSSReset unlayered đè chết mọi Tailwind utilities. 20 routes "pass" vì components trông tạm được nhờ inherit color từ parent, không phải từ class.

## Chi tiết kỹ thuật

**Bug 1 — AnimatePresence exit hang:**
```
framer-motion 11: mode="wait" → exit animation stuck
→ Routes children mount nhưng exit variants không trigger complete
→ SPA navigate URL thay đổi, old content stay in DOM, overlap new content
→ stdin: preventDefault bị ghi đè, scroll không reset
```
Hotfix: gỡ AnimatePresence khỏi src/app.tsx, dùng useLayoutEffect scroll reset theo pathname. Page transitions rebuild Motion phase 5.

**Bug 2 — CSS Cascade 5 unlayered override (C1):**
```
Chakra CSSReset injected unlayered via emotion
→ CSS Cascade 5 spec: unlayered declarations > @layer utilities (mọi specificity)
→ Button {background, border, color} bị override, text-red-500/bg-blue-100 không hoạt
```
Fix: import utilities unlayered. Phase 6 bật preflight PHẢI atomic cùng commit gỡ Chakra.

**Bug 3 — index.html inline script (H1):**
```javascript
document.body.setAttribute("class", "dark") // body === null, thrown TypeError
```
Script chạy trong `<head>`, body chưa parse. .dark class thêm sau không chạy. "No flash" pass ăn may timing. Fix: move script sau body hoặc defer.

## Cố gắng & hàn gắn

- **Smoke test**: 20 routes + 404 → catch AnimatePresence, miss CSS cascade
- **Code review (subagent)**: computed styles + DOM assertions → catch C1 + H1
- **Hotfix AnimatePresence**: remove wrapper, reset scroll per pathname
- **Hotfix CSS**: revert to unlayered utilities import

## Nguyên nhân gốc

1. AnimatePresence integration không test SPA navigation → shipped broken
2. CSS architect không xem computed styles, relay render appearance → miss layer override
3. index.html theme init không test DOMContentLoaded order

## Bài học

- **CSS Cascade 5 > intuition**: Unlayered beats @layer không phải lỗi Chakra, là CSS spec. Cần atomic verify bằng getComputedStyle, không rely render eye-check.
- **Pre-existing bugs hide**: Smoke test hit happy path (homepage 90% access) → mọi người "think it works" mà navigation broken tháng. Phải test full route coverage.
- **Code review value**: Independent reviewer + empirical assertions catch lỗi smoke test bỏ. Phase 2 onwards: computed style assertions mandatory.
- **Script timing matters**: Inline script order dalam HTML critical, đừng assume DOM ready.

## Tiếp theo

- Phase 2: Refine Ghibli tokens (semantic vars dark mode precision)
- Phase 5: Motion page transitions rebuild, test AnimatePresence per route pair
- Phase 6: Chakra removal + preflight ON, verify all component computed styles
- **Policy**: Code review + computed-style test cho mọi layout/theme change

---

Status: DONE  
Summary: Phase 01 complete; discovered pre-existing AnimatePresence navigation bug, CSS cascade override by Chakra, index.html theme script timing issue — all hotfixed, code review proved essential.
