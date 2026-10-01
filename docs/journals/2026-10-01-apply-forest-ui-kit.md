# Áp Dụng UI Kit "A Day in the Forest" Lên Toàn Site

**Date**: 2026-10-01 14:30
**Severity**: Medium (đổi toàn bộ lớp visual, không đổi hành vi nghiệp vụ)
**Component**: tokens/materials, components/ui, components/icons, page-banner, public/images, SEO
**Status**: Resolved về code + verify; **chưa commit** (HEAD `8a10aa8`, cố ý để uncommitted)

## Sự kiện

Áp kit Forest: token scales + semantic tokens (accent `#3d6a4b`), material paper/wash, icon SVG vẽ tay thay `react-icons` hi2/io5 (social `IoLogo*` giữ nguyên theo quyết định user), cover gouache (srcSet 480/640/1280) + banner ngày/đêm + OG image mới. Material pass: nút wash, card paper, heading có brush divider, ornament thay emoji, avatar wreath.

Kết quả: JS gz 421 082 -> 424 663 B (**+0.85%**); LCP `/` 384 -> 336ms, `/works` 948 -> 400ms (A/B xen kẽ 15 run vs build HEAD). lint/tsc/build xanh.

## Bài học (mỗi cái đều đau một lần)

1. **Banner crossfade dựa vào `transitionend` -> kẹt.** Toggle ngược giữa lúc fade, hoặc swap khi ảnh cache-hot, thì `opacity-0` không bao giờ commit nên event không bắn. Fix: bắt đầu fade sau 2x `requestAnimationFrame`, kết thúc bằng timer, reset state stale lúc render, guard `isConnected`. Đừng tin `transitionend` khi transition có thể không xảy ra.
2. **Wash texture 100% soft-light kéo contrast chữ nút xuống 3.81:1** (< 4.5). Chuyển sang `::after` có mask ở 35% (đúng guide §7.1) -> min 5.01 light, 10.37 dark. Đã đọc guide mà vẫn làm 100% trước; đo contrast sau khi composite, đừng đo trên màu phẳng.
3. **Budget ảnh `/works` vỡ:** cover 640w nhồi vào card ~260px. Thêm biến thể **480w q72** -> 522 -> 386KB (không tính idle preload).
4. **Git Bash MSYS path conversion:** arg CLI `/works` bị đổi thành `C:/Program Files/Git/works`, script đo cho kết quả vô nghĩa. Dùng `MSYS_NO_PATHCONV=1`.
5. **Test browser bật `prefers-reduced-motion`** nên nhánh fade không chạy trong screenshot (bug #1 vì vậy lọt qua lần đầu). Emulate `no-preference` qua CDP khi test animation.

## Ghi nhận khác

- Plan đếm 29 route, thực tế **27** `<Route>`; lỗi đếm nhầm trong plan.
- Safari/WebKit mask `::after` **chưa kiểm**; `page-banner.tsx` 128 LOC (dự kiến 120, < 200).

## Open / Next steps

1. `design/` (110MB, repo public): `.gitignore` hay untracked? Chưa quyết, cần user.
2. Preload banner theme (67KB, idle) đẩy `/works` lên 453KB: giữ, preload khi hover/focus toggle, hay giảm card-paper xuống tile 512² (~-60KB, mất chi tiết DPR2)?
3. `paper-grain-{light,dark}.webp` (134KB) và `Card` (0 consumer) chưa dùng: giữ hay xóa?
4. Xóa `public/images/og-image.jpg` cũ sau khi deploy + re-scrape OG.
5. Test Safari/WebKit cho mask wash.

Reports: `plans/reports/*-261001-1356-*`; plan: `plans/261001-0616-apply-forest-ui-kit/plan.md`.

AgentWiki publish skipped: không xác nhận được CLI/MCP AgentWiki khả dụng; file local là nguồn chính.
