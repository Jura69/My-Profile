# Portfolio Review v2 Fixes: 4 Phase Trong 1 Session — Bắt App-Không-Mount Silent Trước Deploy

**Date**: 2026-07-30 15:00
**Severity**: Medium (production-breaking bug bắt được trước deploy; resolved cùng session)
**Component**: Vite build (manualChunks/lazy routes), SEO (OG meta + sitemap), theme system, routing (error boundary), repo hygiene
**Status**: Resolved, verified bởi code review subagent

## Sự kiện

Thực thi trọn plan `260729-1350-portfolio-review-v2-fixes` — 4 phase liên tục trong 1 session, 16 commits push thẳng master (`bdd87ee..ed6f9c5`), Vercel auto-deploy sau mỗi phase, gate là `yarn build && yarn lint` sạch trước khi push.

Phase 1 dọn nốt WIP còn sót (leaves gate theo `data-day` + full-width), 7 file tách thành 4 nhóm commit bằng `git apply --cached` (cherry-pick hunk thay vì `git add -p` tương tác). Phase 2 SEO/perf: OG meta tĩnh cho crawler, og-image tự vẽ Canvas 2D trong browser (44KB, verify phủ glyph tiếng Việt bằng dual-fallback width probe, chuyển file qua HTTP listener PowerShell tạm thay vì base64 tay), sitemap build-time qua Vite plugin (`generateBundle` + `this.emitFile`, tránh thêm dep `@types/node`), lazy 18 routes. Phase 3 sửa content sai sự thật (stats "2+ yrs", title 47 ký tự, skills bỏ Chakra thêm Tailwind/Three.js) + UX (theme theo `prefers-color-scheme`, h1 chuẩn 3 trang listing, navbar căn cột 1100px, Activities rời nav giữ route). Phase 4 dọn repo: `.gitattributes` LF, xoá 4 cruft, gộp `layouts/`, rename `moondrop-ssp` + redirect, lint 6 warnings → 0, nén 12 ảnh jpg→webp (1.98MB→0.6MB), README viết lại đúng thực tế, docs-manager đồng bộ 5 file docs stale (net −137 dòng).

Code review subagent chạy độc lập sau đó: 8/8 acceptance criteria PASS, đẻ ra 1 High + 4 Medium — xử lý gọn trong 1 commit theo sau (`ea83b92`).

## Sự thật phũ phàng

Hai chỗ plan sai kỳ vọng, cả hai kiểu "trông như work nhưng không work":

1. **Lazy routes không giảm bundle như hứa.** Plan kỳ vọng "initial JS giảm ~50%" chỉ nhờ lazy-load 18 routes. Thực tế giảm **39KB**. Mỗi page component chỉ ~2KB nên cắt route chả ăn thua — thủ phạm thật nằm ở chỗ không ai ngó tới: `manualChunks` viết dạng object literal chỉ match exact specifier, không match subpath kiểu `react-dom/client` hay `gsap/ScrollTrigger`, nên hai lib nặng nhất vẫn kẹt trong app chunk. Đổi sang function-form thì `index.js` tụt từ 510.36KB xuống **51.51KB (−90%)** — gấp cả chục lần kỳ vọng ban đầu, nhưng vì lý do hoàn toàn khác plan nghĩ.

2. **App không mount, 0 console error.** Lần tách chunk đầu tiên, tách thêm 1 chunk "misc" riêng cho vài lib phụ. Build production xong, `vite preview` lên — trang trắng. Không exception, không warning, DevTools console sạch tinh. Đào ra: 1 lib trong misc gọi `React.useLayoutEffect` ngay lúc module-eval (top-level, không phải trong component) — rơi đúng lúc `vendor-react` chưa init xong nên `React` là `undefined`. Lỗi bị nuốt đâu đó trong chain resolve module, chỉ lộ khi tự tay re-import entry module để ép nó hiện ra. Dev server (`yarn dev`) không chạy qua `manualChunks` nên bug này **im lặng tuyệt đối** ở local, chỉ hiện trên production build thật.

Nếu tin `yarn build` exit code 0 là xong mà không có bước `vite preview` thật, cái này lên thẳng production — user thấy trang trắng, 0 log, 0 gì để debug từ xa. Bắt được trước khi ai ngoài team thấy là điểm hài lòng thật sự của session này.

## Chi tiết kỹ thuật

**manualChunks object-form miss subpath:**
```
// SAI — chỉ match exact specifier
manualChunks: { 'vendor-react': ['react', 'react-dom'] }

// ĐÚNG — match theo node_modules path segment
manualChunks(id) {
  if (id.includes('node_modules')) { /* match theo segment sau node_modules */ }
}
```

**Circular-init khi tách chunk misc riêng:** lib phụ gọi `React.useLayoutEffect` ở top-level module → cần `React` resolve xong trước lúc eval. Tách chunk riêng không đảm bảo thứ tự load sau `vendor-react`. Fix: gộp misc vào `vendor-react` — cùng chunk = cùng thứ tự init.

**3 bug review bắt thêm (không phải bug ban đầu):**
- `manualChunks` match bằng `id.includes('three')` dính luôn absolute checkout path nếu path chứa chữ "three" → kéo 590KB vào eager. Fix: match theo segment sau thư mục `node_modules`, không match toàn path.
- Lazy route thiếu error boundary: sau redeploy, tab cũ giữ reference chunk hash cũ đã bị xoá khỏi `dist/`; SPA rewrite (`vercel.json`) trả `index.html` (200, HTML) cho request lẽ ra 404 vào file JS → import động parse fail → trắng trang, không tự hồi. Fix: `RouteErrorBoundary` bắt lỗi chunk-load, auto-reload 1 lần có guard chống loop, fallback nút reload thủ công.
- Theme persist giá trị OS-derived ngay lúc mount (kể cả khi user chưa từng bấm toggle) → theme chỉ đi theo OS đúng 1 lần rồi cứng luôn. Fix: chỉ persist khi có lựa chọn tường minh (key đã tồn tại hoặc user bấm toggle).

**1 Medium bị bác bỏ:** reviewer nghi static OG title đè title per-page. DOM-inspect thật: React 19 hoist thẻ per-page LÊN SAU static tag trong `<head>` nên per-page luôn thắng — reviewer đoán sai chiều append, không phải bug thật.

## Cố gắng

- Đo bundle bằng `yarn build` output trực tiếp thay vì tin ước lượng trong plan — lộ ngay 39KB thay vì "~50%".
- `vite preview` thật + tự re-import entry module để ép lỗi circular-init hiện ra console, thay vì đoán qua source map.
- Reviewer subagent độc lập tự chạy lại build + lint, đọc `dist/`, cross-check 42/42 image reference — bắt thêm High + 4 Medium mà smoke test thường không chạm tới.

## Nguyên nhân gốc

1. **Kỳ vọng "lazy route = giảm bundle" sai từ gốc** — không phân tích trước cái gì thực sự nặng (page code hay vendor lib). Route code nhẹ; vendor libs mới nặng, lazy-split đúng chỗ (vendor, không phải route) mới ăn tiền.
2. **`manualChunks` object-form là API dễ hiểu sai** — trông như match theo tên package nhưng chỉ match exact specifier string. Không warning, không lỗi báo hiệu, chunk vẫn build ra — chỉ là to hơn dự kiến, im lặng.
3. **Silent circular-init** là hệ quả thứ tự load chunk không deterministic khi nhiều entry chunk cùng phụ thuộc `React` ở top-level. Module system không throw lỗi rõ ràng lúc resolve graph, chỉ throw khi code thực sự chạy tới dòng dùng `undefined` — và lỗi đó bị nuốt trong chain resolve.
4. **Grep `*.tsx` sót `.ts`** — thói quen mặc định components là `.tsx`, quên hooks/utils thuần thường là `.ts`.

## Bài học

- **Không tin % ước lượng trong plan — đo bằng build output thật.** Số liệu "~50%" chỉ là phỏng đoán; số thật lệch hẳn (39KB rồi mới ra -90%) vì đúng nguyên nhân hoàn toàn khác giả định ban đầu.
- **`manualChunks` phải viết function-form nếu cần match subpath.** Object-form chỉ an toàn khi chắc chắn specifier là exact string.
- **Dev server không chạy qua `manualChunks` — production build PHẢI smoke-test thật (`vite preview`) trước khi push.** Đây là lỗi lẽ ra đã lọt thẳng production nếu chỉ tin `yarn build` exit 0.
- **Call site count lệch 2 lần liên tiếp trong cùng plan:** ước lượng ban đầu ~19 → verify tay ra 21 (session 1) → build gate lòi thêm 1 thành 22 (session 2, vì `use-pinned-intro.ts` đuôi `.ts` bị glob `*.tsx` bỏ sót). Đừng tin số đếm tay khi xoá/gộp API — để build/TypeScript tự bắt phần thiếu.
- **Code review ăn tiền khi tự verify bằng evidence** (DOM inspection, build output) chứ không chỉ đọc code — 1 Medium bị bác bỏ đúng nhờ vậy, tránh sửa nhầm chỗ không hỏng.

## Tiếp theo

- Không còn task mở trong plan này — 9/9 success criteria đạt, review concerns xử lý hết (`ea83b92`), docs đã đồng bộ.
- Ghi nhận riêng, ngoài scope: 3 file webp cũ (`ka11-2` 185KB, `Ticket2` 194KB, `Ticket3` 165KB) vẫn to hơn 150KB, chưa nén — plan chỉ định danh `ea1000`+`Ytc2`; để dành task riêng.
- Deferred có chủ đích, không phải nợ: prerender/SSG per-page OG, data-driven routes `/works/:id`, AVIF, nội dung Activities mới (cần data thật từ user).

---

Status: DONE
Summary: Thực thi trọn 4 phase plan portfolio-review-v2-fixes trong 1 session (16 commits, push từng phase, 9/9 success criteria). Bắt được 1 silent production-only failure (app không mount, 0 console error) và 1 kỳ vọng bundle-size sai hoàn toàn (lazy routes không phải thủ phạm — manualChunks function-form mới là fix thật, -90% thay vì ~50%) trước khi user thấy, cả hai chỉ lộ ra nhờ test `vite preview` thật thay vì tin build exit code.
