# Design Guidelines — "A Day in the Forest" UI Kit

**Status:** Applied (2026-10-01) — kit đã được áp dụng vào code; mục nào lệch spec gốc có ghi chú "Áp dụng" tại chỗ
**Last Updated:** 2026-10-09 (design-system refactor: type tokens, `Container`, scrim, `PageHeader`, detail layout; height-aware first screen + `short` variant)
**Token source hiện tại:** [`src/styles/global.css`](../src/styles/global.css) · sky narrative: [`components/scene/zone-data.ts`](../components/scene/zone-data.ts)
**Review folder:** `design/ui-kit-review/` (mở `index.html`)

Guide này định nghĩa ngôn ngữ thị giác cho bộ UI custom riêng của portfolio: art style, màu, chữ, hình khối,
icon, nút, material, ảnh minh họa và cách prompt AI để generate đồng nhất. Mọi asset mới phải trace được về
một mục trong guide này.

---

## 1. Concept & nguyên tắc

**Concept:** một ngày trong khu rừng vẽ tay — bình minh → sáng → chiều vàng → hoàng hôn → đêm đom đóm.
Trang là một cuốn sổ phác thảo bằng màu bột (gouache) đặt trên giấy parchment; UI là những mảnh giấy, gỗ,
lá được dán lên cảnh.

| # | Nguyên tắc | Ý nghĩa khi thiết kế |
|---|---|---|
| 1 | **Content-first** | Artwork là bối cảnh, không cạnh tranh với chữ. Vùng đặt chữ luôn yên, ít chi tiết, contrast AA. |
| 2 | **Hand-made, không hand-wavy** | Chất vẽ tay ở bề mặt (texture, viền, icon wobble), nhưng lưới, khoảng cách, cỡ chữ vẫn chính xác theo token. |
| 3 | **Ấm, không ngọt** | Màu ngả đất, bão hòa vừa. Không neon, không gradient tím-xanh kiểu SaaS. |
| 4 | **Ánh sáng kể chuyện** | Light mode = ban ngày (nắng tán lá). Dark mode = đêm (ánh trăng xanh lạnh + điểm sáng đèn lồng ấm). |
| 5 | **Original** | Lấy cảm hứng từ background art anime Nhật vẽ tay, **không** tái tạo nhân vật, công trình hay cảnh nhận diện được của bất kỳ phim nào. |

### Từ khóa thị giác
`gouache` · `hand-painted background art` · `soft edges` · `dappled sunlight` · `paper grain` ·
`cumulus clouds` · `moss & bark` · `paper lanterns` · `fireflies` · `cozy countryside`

### Tránh
Glassmorphism, neon glow, 3D render bóng bẩy (PBR, bloom, tone mapping, chrome/glossy), isometric vector corporate, stock photo, emoji,
drop-shadow đen đặc, gradient 2 màu bão hòa, viền 1px xám lạnh, chữ trong ảnh.

**Ngoại lệ có điều kiện — 3D painted:** 3D được phép khi trông như tranh vẽ chứ không phải render: toon material
có dải sáng nhiễu, bóng đổ ngả màu (lavender/sky, không đen), rim mảnh; không PBR, bloom, tone mapping, shadow map.
Hiện chỉ dùng cho spirit ở hero (§6.4); nguồn: `components/spirit/painted-material.ts`.

---

## 2. Art style — Gouache painterly

Áp dụng cho mọi raster: cover dự án, banner trang, OG image, texture.

### 2.1 Quy tắc vẽ

| Thuộc tính | Quy tắc |
|---|---|
| Kỹ thuật | Gouache/màu bột opaque, layer phẳng chồng lên nhau, nét cọ thấy được ở mảng lớn (bầu trời, tán lá). |
| Viền | Mềm, không outline đen. Tách khối bằng value (sáng/tối) và nhiệt độ màu, không bằng line. |
| Ánh sáng | Một nguồn rõ ràng. Ngày: nắng ấm vàng từ trên-trái, bóng ngả xanh lam-tím. Đêm: trăng xanh lạnh + nguồn ấm cục bộ (đèn lồng, cửa sổ, đom đóm). |
| Mây | Cumulus khối lớn, đỉnh sáng, đáy ngả tím/xám ấm — motif chữ ký của bộ kit. |
| Thực vật | Lá vẽ thành mảng cụm, không vẽ từng lá; vài lá rim-light ở rìa. Rêu, cỏ cao, hoa dại nhỏ chấm điểm. |
| Chi tiết | Tập trung ở 1 điểm nhấn (focal); vùng còn lại đơn giản hóa. Tỷ lệ chi tiết ≈ 20% / 80%. |
| Texture | Grain giấy nhẹ toàn ảnh (≈ 3–5% opacity), không noise số. |
| Người | Nếu có: nhỏ, quay lưng hoặc xa, không mặt chi tiết, không giống nhân vật có sẵn. |
| Chữ / logo | **Không có** chữ, số đọc được, logo, watermark, UI chụp màn hình. |

### 2.2 Bố cục ảnh 16:9

- **Safe zone:** chủ thể chính trong 70% trung tâm; mép dưới 20% đơn giản (card có thể phủ gradient/label).
- **Rule of thirds:** focal point ở 1 giao điểm 1/3; đường dẫn mắt (đường mòn, dây đèn, dòng suối) hướng vào focal.
- **Đường chân trời:** 1/3 dưới hoặc 1/3 trên — không chia đôi.
- **Value:** ảnh đọc được khi thu nhỏ còn 320px (test thumbnail): focal phải tách khỏi nền bằng value.
- **Banner 3:1 (letterbox-safe):** model ảnh trả về ~16:9; crop 3:1 chỉ giữ 56% chiều cao. Prompt phải đặt *toàn bộ*
  nội dung (trời có mây, đường chân trời, vật chính) trong dải giữa 56%; dải trên 22% chỉ là trời trơn, dải dưới 22% chỉ là
  mặt phẳng trơn (gỗ, cỏ, nước) — sau đó center-crop. Không crop "cứu" vật chính bằng cách hy sinh bầu trời hoặc ngược lại.

### 2.3 Light vs dark cho raster

- **Cover dự án:** 1 bản duy nhất, ánh sáng ban ngày hoặc chiều vàng — đọc tốt trên cả 2 nền. Dark mode giảm
  nhẹ brightness bằng CSS (`dark:brightness-90`) khi apply, không generate bản riêng.
- **Texture/material:** luôn 2 bản `-light` / `-dark` (giấy parchment vs giấy chàm đêm).
- **Banner trang:** 2 bản (ngày / đêm) vì chiếm diện tích lớn và đi cùng narrative.

---

## 3. Color system

Giữ bản sắc hiện tại (moss green, parchment, night navy, golden dust) và chuẩn hóa thành scale 50–950.
Ảnh tổng hợp: `design/ui-kit-review/00-palette/palette-light-dark.png`.

### 3.1 Primitive scales

| Scale | Vai trò | 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| **moss** | primary (light) | `#f0f6ee` | `#dcebd6` | `#bcdab3` | `#9cc796` | `#7eb77f` | `#5e9a64` | `#4a7c59` | `#3d6a4b` | `#30543b` | `#233e2c` | `#15261b` |
| **spirit-teal** | primary (dark) | `#effaf7` | `#d5f2ea` | `#b4e6d9` | `#98d8c8` | `#74c2b4` | `#5a9dab` | `#467f8c` | `#386672` | `#2b4f59` | `#1f3a42` | `#13252b` |
| **parchment** | neutral ấm (light) | `#fdfbf6` | `#fbf7ee` | `#f5f0e8` | `#e2dbcd` | `#cfc4b0` | `#b0a38b` | `#8b7e68` | `#5c564c` | `#433e35` | `#2d2a24` | `#1c1a16` |
| **night** | neutral lạnh (dark) | `#eef0f5` | `#dadde8` | `#b7bccc` | `#959cb0` | `#737b92` | `#565e76` | `#3e465d` | `#2e3447` | `#232838` | `#1a1e2e` | `#10131e` |
| **golden-dust** | highlight, nắng, AI | `#fcf7ea` | `#f8ebc9` | `#f1d999` | `#e7c46d` | `#d4a853` | `#b98c3a` | `#96702d` | `#765725` | `#5a421d` | `#3f2f16` | `#261c0d` |
| **sakura** | điểm nhấn hoàng hôn | `#fdf2f5` | `#f9e0e7` | `#f2c3d1` | `#e8a0b4` | `#d97c97` | `#c25e7c` | `#9f4864` | `#7e3a50` | `#5f2c3c` | `#42202a` | `#28131a` |
| **sky** | bầu trời ngày, backend | `#eff9fd` | `#d8f0fa` | `#b3e2f5` | `#87ceeb` | `#5bb5dc` | `#3d98c2` | `#2f7a9e` | `#286380` | `#214e64` | `#193a4a` | `#0f242e` |
| **lavender** | chạng vạng, tools | `#f6f3fa` | `#ebe4f3` | `#d8cce8` | `#c4b5d8` | `#b08fd8` | `#9370c0` | `#77579f` | `#5f467f` | `#483661` | `#332745` | `#1f182a` |
| **bark** | gỗ, khung, viền nút | `#f7f2ea` | `#ebdfcb` | `#d8c19c` | `#c0a172` | `#a6855a` | `#8b6f47` | `#715a3a` | `#59472f` | `#423524` | `#2e2519` | `#1b160f` |

Mỗi màu hiện có trong `@theme` được giữ nguyên vị trí trong scale (vd. `ghibli-deep-forest #4a7c59` = moss-600,
`ghibli-golden-dust #d4a853` = golden-dust-400, `ghibli-night-forest #1a1e2e` = night-900).

### 3.2 Semantic tokens

| Token | Light | Dark | Dùng cho |
|---|---|---|---|
| `surface` | parchment-200 `#f5f0e8` | night-900 `#1a1e2e` | nền trang |
| `surface-elevated` | parchment-100 `#fbf7ee` | night-800 `#232838` | card, menu, popover |
| `surface-sunken` *(mới)* | `#ece4d6` | night-950 `#10131e` | code block, input, vùng lõm |
| `ink` | parchment-900 `#2d2a24` | `#e9e7e4` | chữ chính |
| `ink-muted` | parchment-700 `#5c564c` | `#a8adb8` | chữ phụ, mô tả |
| `ink-subtle` *(mới)* | parchment-600 `#8b7e68` | night-400 `#737b92` | caption ≥ 18px, icon phụ — **không** dùng cho body |
| `accent` | **moss-700 `#3d6a4b`** *(đổi từ #4a7c59)* | spirit-teal-300 `#98d8c8` | link, nút chính, focus |
| `accent-hover` *(mới)* | moss-800 `#30543b` | spirit-teal-200 `#b4e6d9` | hover nút/link |
| `accent-on-sky` | moss-800 `#30543b` | spirit-teal-300 `#98d8c8` | chữ accent đặt **thẳng trên bầu trời**: link nav đang chọn, eyebrow, link "All …" của section, breadcrumb — `accent` light chỉ còn 3.9:1 trên stop trời sáng nhất |
| `on-accent` *(mới)* | parchment-100 `#fbf7ee` | night-900 `#1a1e2e` | chữ trên nền accent |
| `accent-soft` *(mới)* | moss-100 `#dcebd6` | spirit-teal-900 `#1f3a42` | nền badge, hover ghost |
| `highlight` *(mới)* | golden-dust-400 `#d4a853` | golden-dust-300 `#e7c46d` | ngôi sao, điểm nhấn trang trí — **không** cho chữ nhỏ |
| `line` | parchment-300 `#e2dbcd` | night-700 `#2e3447` | viền card, divider |
| `line-strong` *(mới)* | parchment-400 `#cfc4b0` | night-600 `#3e465d` | viền nút outline, input |
| `focus-ring` *(mới)* | moss-600 `#4a7c59` (4.3:1, ≥ 3:1 UI) | spirit-teal-300 `#98d8c8` | outline focus-visible |

**Lý do đổi accent light:** `#4a7c59` trên `#f5f0e8` chỉ đạt **4.29:1** (fail AA cho chữ thường).
`#3d6a4b` đạt **5.5:1**, vẫn cùng sắc moss.

### 3.3 Contrast đã kiểm (WCAG 2.x)

| Cặp | Light | Dark | Mức |
|---|---|---|---|
| ink / surface | 12.6:1 | 13.4:1 | AAA |
| ink-muted / surface | 6.4:1 | 7.4:1 | AA |
| accent / surface | 5.5:1 | 10.2:1 | AA |
| on-accent / accent | 5.8:1 | 10.2:1 | AA |
| ink-subtle / surface | 3.5:1 | 3.9:1 | chỉ large text / UI (≥ 3:1) |
| badge text bậc 700 (moss/sky/golden) / lavender-600 trên surface light | 5.5–5.9:1 / 5.1:1 | — | AA |
| accent-on-sky / mọi stop trời | min 5.39:1 | min 6.38:1 | AA (`sky-contrast-tokens.cjs`) |
| golden-dust-200 (chữ highlight hero đêm) / mọi stop trời | — | min 7.43:1 | AA |
| chữ trắng / vàng nhỏ trên `.cover-scrim` (16 cover, 3 banner, thẻ overlay; 375 + 1440) | tiêu đề ≥ 6.8:1, eyebrow vàng ≥ 5.5:1 | như light (cover thêm `brightness-90`) | AA (`cover-contrast.cjs`, p5 trên pixel thật) |

Đồi cố định của scene ở đáy viewport: `ink-muted` trên đồi trước chỉ 3.76:1 và trên cây 2.28:1. Chữ nằm sẵn ở đó
khi trang mở (hero) phải đo bằng pixel thật (`text-contrast.mjs`); vì vậy chữ của mũi tên "Selected work" là `ink`, không phải `accent-on-sky`.

### 3.4 Category tokens (giữ tên, map vào scale)

| Token | Hiện tại | Map | Ghi chú khi apply |
|---|---|---|---|
| `skill-frontend` | `#6db86b` | moss-400 lân cận | text tone dùng moss-700 trên light |
| `skill-backend` | `#5a9bd5` | sky-500 lân cận | text tone dùng sky-700 trên light |
| `skill-ai` | `#d4a853` | golden-dust-400 | text tone dùng golden-dust-700 trên light |
| `skill-tools` | `#b08fd8` | lavender-400 | text tone dùng lavender-600 trên light |
| `timeline-creasia` | `#5a9dab` | spirit-teal-500 | |
| `timeline-infodation` | `#6db86b` | moss-400 | |
| `timeline-vnpt` | `#5a9bd5` | sky-500 | |
| `timeline-university` | `#b08fd8` | lavender-400 | |

Badge hiện dùng `text-skill-*` trên nền `/15` → chữ màu 400 trên parchment chỉ ~2.1:1 (đo `#6db86b`/`#f5f0e8`). Khi apply: nền giữ tint
400/15, **chữ dùng bậc 700 (light) / 300 (dark)**.

### 3.5 Sky narrative

Gradient bầu trời theo scroll vẫn do `zone-data.ts` sở hữu (6 stop light + 6 stop dark) — không copy ở đây.
Palette image trích các stop đó để xem cùng token. Stop được vẽ lại theo banner gouache: light = đỉnh xanh nhạt
(~`#b0d2ea`–`#d6cce6`) xuống đáy ấm (kem/hồng/vàng bơ); dark = **chàm có màu** (~`#121c3e`–`#3a3466`), không còn gần-đen.
Ràng buộc cứng: mọi stop giữ `--ink`, `--ink-muted` và `--accent-on-sky` (cùng `golden-dust-200` ở dark) ≥ 4.5:1 đặt thẳng
trên bầu trời (đo lúc áp dụng: ink-muted min 4.58 light, 4.59 dark) — đổi stop phải đo lại bằng `sky-contrast-tokens.cjs` của plan design-system. Artwork banner phải khớp 5 cảnh: dawn (đào-kem),
morning (xanh trời nhạt), golden afternoon (vàng bơ), dusk (lavender-sakura), night (chàm-đen + đốm vàng).

### 3.6 Tỷ lệ dùng màu

60% neutral (parchment / night) · 30% moss–teal + bầu trời trong artwork · 10% golden/sakura làm điểm nhấn.
Mỗi màn hình tối đa **1** màu nhấn nóng ngoài accent.

---

## 4. Typography

Giữ **M PLUS Rounded 1c**, chỉ load **400 / 500 / 700** — CSS Google Fonts của font CJK này ~30KB nén mỗi weight và nằm
trên đường LCP của Home (H1 hero vẽ lại khi web font về). Không thêm font.

Cỡ chữ là token trong `@theme` (`--text-*`, fluid bằng `clamp`) → utility `text-display`, `text-page-title`,
`text-section`, `text-lead`. **Token cỡ mới phải đăng ký thêm trong `lib/cn.ts`** (`extendTailwindMerge`), nếu không
tailwind-merge coi `text-section` là màu và xóa nó khi đứng cạnh `text-ink`.

| Role | Utility / class | Size (mobile → desktop) | Weight | Line-height | Tracking |
|---|---|---|---|---|---|
| Display (H1 hero, câu giá trị) | `text-display` | 42 → 84px, theo cả chiều cao: `clamp(42px, min(6vw, 9.5svh), 84px)` | extrabold | 1.03 | -0.03em |
| H1 page (banner, cover, header phẳng) | `text-page-title` | 36 → 56px | extrabold | 1.05 | -0.02em |
| H2 section | `text-section` | 28 → 36px | extrabold | 1.15 | -0.01em |
| H2 trong panel / trang chi tiết | `text-xl` / `text-2xl` | 20 / 24px | extrabold | 1.25 | 0 |
| H3 card title | `text-lg`–`text-[22px]` (overlay: 24 → 38px) | 16 → 22px | extrabold | 1.25 | 0 |
| Lead | `text-lead` | 17 → 20px | 400 | 1.6 | 0 |
| Body prose (chi tiết) | `text-[17px] leading-[1.75]` | 17px | 400 | 1.75 | 0 |
| Small / meta | `text-sm` | 14px | 500 | 1.5 | 0 |
| Eyebrow / label | `.eyebrow` | 12px | extrabold | 1.33 | 0.12em, uppercase |

**Weight "extrabold":** markup dùng `font-extrabold` đúng như canvas (800), nhưng token `--font-weight-extrabold` đang map về
**700**: một file 800 thật cộng ~0.9s LCP trên Slow 4G (đo bằng `vitals-breakdown.mjs`). Muốn khôi phục 800: xóa dòng token
trong `global.css` và thêm 800 vào URL font trong `index.html` (nên làm khi self-host font).

**Màn hình đầu phải vừa cả theo chiều cao.** Laptop 13–15" ở scale 125–150% chỉ còn ~650–790px cao (1280×650,
1440×790), nên cỡ hero lấy số nhỏ hơn giữa chiều rộng và chiều cao (`9.5svh` thắng trên màn thấp và rộng; điện thoại,
tablet vẫn theo `6vw`). Ô spirit cũng vậy: `lg:size-[min(440px,52svh)]`, cố định theo viewport nên đổi sang 3D không gây
layout shift. Variant **`short`** (`global.css`: lg **và** cao ≤ 820px) **chỉ siết nhịp dọc** (padding, margin) — không
đổi layout, cỡ hay thứ tự. Gate đo màn hình đầu: xem [REVIEW.md](../REVIEW.md).

- Prose tối đa ~65ch; không justify (tránh khe hở chữ) — **ngoại lệ:** bio ở About dùng `text-justify` (quyết định của user, commit `1b8dc72`); số liệu dùng `tabular-nums`.
- Heading section có thể kèm 1 ornament SVG (lá/đom đóm) đặt **sau** chữ — xem §6.3.

---

## 5. Shape, spacing, elevation

| Token | Giá trị | Dùng |
|---|---|---|
| radius-sm | 8px | badge vuông, input |
| radius-md | 12px (`rounded-xl`) | nút |
| radius-lg | 16px (`rounded-2xl`) | card |
| radius-pill | 9999px | badge, chip, toggle |
| spacing base | 4px scale Tailwind | |
| section rhythm | `py-16 md:py-24` | mọi section Home và khối "Off the clock"; header trang `pt-8 md:pt-14 short:pt-6`; hero Home siết `short:` (pt-4, mt-3/mt-5) |
| container | `Container` (`components/ui/container.tsx`) = 1100px, gutter `px-4 sm:px-6 lg:px-8` | **một** cột cho navbar, footer, section, trang danh sách và chi tiết; prose tối đa 68ch |

**Elevation = giấy chồng giấy, không phải bóng đen.** Shadow tint theo màu nền:

- Light: `0 1px 0 #e2dbcd, 0 6px 16px -6px rgb(139 111 71 / 0.18)` (bóng nâu bark nhạt)
- Dark: `0 1px 0 #2e3447, 0 8px 20px -8px rgb(0 0 0 / 0.45)` + viền trên 1px `rgb(255 255 255 / 0.04)`
- Hover card: nhấc 2–4px + shadow sâu hơn; không scale > 1.02.

**Viền vẽ tay:** card và nút có thể dùng `mask-image` brush-edge (asset §8) để mép hơi gồ ghề.
Mép gồ ghề ≤ 2px — đủ cảm, không làm layout trông lỗi.

---

## 6. Iconography (SVG custom)

### 6.1 Spec chung

| Thuộc tính | Quy tắc |
|---|---|
| Grid | 24×24 viewBox, padding 2px (live area 20×20) |
| Stroke | 1.75px (nguồn SVG); khi apply `KitIcon` render **2px**, `stroke-linecap="round"`, `stroke-linejoin="round"`, `fill="none"` |
| Kích thước hiển thị | `KitIcon` mặc định **1.25em** (nét chỉ chiếm ~18/24 khung, còn react-icons gần tràn khung → 1em trông nhỏ hơn hẳn); ornament heading 1.15em |
| Màu | `stroke="currentColor"` — theme tự đổi; không hardcode hex |
| Chất vẽ tay | Đường hơi cong/không thẳng tuyệt đối (lệch 0.2–0.4px), đầu nét tròn, góc bo; **không** filter/turbulence |
| Duotone (tùy chọn) | 1 mảng `fill="currentColor" opacity="0.18"` cho khối chính — chỉ icon trang trí/section |
| Tối ưu | ≤ 1.5KB/icon, không `<style>`, không id trùng, không transform lồng |
| A11y | icon trang trí `aria-hidden`; icon-only button phải có `aria-label` (đã có) |

### 6.2 Inventory thay `react-icons` (io5 / hi2)

| Nhóm | Icon (tên file) | Thay cho |
|---|---|---|
| Theme | `sun`, `moon` | IoSunny, IoMoon |
| Nav | `menu`, `close`, `chevron-right`, `chevron-down`, `arrow-right`, `external-link`, `download` | Io* |
| Contact | `mail`, `github`, `linkedin`, `instagram`, `facebook`, `google` | IoLogo*, IoMailOutline |
| Experience | `building`, `terminal`, `signal-tower`, `graduation-cap` | HiOutline* |
| AI skills | `server-stack`, `chart-check`, `agent-network`, `chat-spark` | HiOutline* |
| Nav pages | `leaf-home`, `works-satchel`, `headphones`, `campfire` | mới (About, Works, Audiophile, Activities) |
| Hi-Fi | `hifi-dial` | HiFi |
| Things I Love | `MusicNotes`, `Camera`, `OpenBook`, `Sakura` (`components/icons/kit-icons-hobbies.tsx`, vẽ tay theo cùng quy tắc) + `agent-network` cho ML | emoji 🎵📷🤖📖🌸 |

Logo mạng xã hội: vẽ lại theo chất kit nhưng **giữ silhouette nhận diện** (chữ "in", con mèo GitHub, máy ảnh IG)
— thay đổi chỉ ở độ dày nét và bo góc.

**Áp dụng:** 5 logo (github, linkedin, instagram, facebook, google) **giữ** `react-icons/io5` `IoLogo*` (quyết định của user, theo brand guidelines của từng nền tảng); chỉ `mail` dùng icon kit.

**Không thay:** logo công nghệ trong skills bento (`react-icons/si`, `di`) — đó là nhận diện thương hiệu của
công nghệ, vẽ lại làm giảm độ nhận biết. Nằm ngoài phạm vi kit.

### 6.3 Ornaments (SVG trang trí)

`divider-vine`, `divider-brush`, `divider-firefly-trail` (viewBox 240×24, stretch ngang) · `sprig-leaf`,
`acorn`, `paper-lantern`, `firefly`, `cloud-puff`, `sparkle-star`, `LeafHeart` (lá hình tim, tiêu đề Things I Love; vẽ thêm trong code) (24×24) · `monogram-lt` (mark cá nhân,
32×32 viewBox; từng được đề xuất làm logo navbar). **Quyết định user (2026-10-01): navbar dùng `SpiritIcon` (Mầm Đèn,
`components/icons/spirit-mam-den.tsx`)**, thay icon nhân vật cũ (đã gỡ khỏi repo cùng model 3D cũ); `MonogramLt` vẫn có trong
`kit-ornaments` nhưng chưa dùng.

**Áp dụng:** ornament heading đặt **sau** chữ (thay emoji cuối heading cũ) qua prop `ornament` của `SectionHeading`; dưới heading là divider `DividerVine` (dây leo + lá) rộng `w-32`, màu `accent` — đổi từ `DividerBrush`/`line-strong` sau review local vì quá mờ. Nguồn: `components/ui/section-heading.tsx`, `components/icons/kit-*.tsx`.

### 6.4 Mầm Đèn — nhân vật gốc của site

Linh vật rừng **original**: viên đá phủ rêu trên bốn mấu rễ, một chồi non cong mang đèn lồng hạt (seed lantern) phía trước;
đứng trên đảo rêu nhỏ. Một bộ hình, ba cách thể hiện (3D sống, ảnh render tĩnh, 2D SVG):

| Nơi dùng | Dạng | Nguồn |
|---|---|---|
| Hero (chính) | 3D painted, procedural trong three; ánh sáng chuyển mượt theo theme (ngày: nắng + hemi, đèn hạt là quả mọng trong mờ; đêm: trăng lạnh + đèn hạt là nguồn ấm chính — lõi kem → viền hổ phách, quầng mềm, lập loè nhẹ, vũng sáng trên rêu, mép band mềm hơn ban ngày); motion: thở, đảo nổi nhấp nhô, đèn treo con lắc lò xo, lá rung, mắt/thân nhìn theo con trỏ (rảnh thì liếc quanh, ngước nhìn đèn), đom đóm đêm / phấn hoa ngày; đổi theme: sang đêm ngước nhìn đèn + đèn bùng sáng 1 nhịp, sang ngày chớp mắt + nheo + quay khỏi nắng; chớp/nhắm mắt = mí cung ∪ | `components/spirit/` |
| 404 ("lạc đường": nghiêng đầu, ngó về biển chỉ đường) · cuối trang chủ ("ngủ gật": mắt nhắm, mầm rũ, đèn dịu, chữ z) | Ảnh tĩnh render từ chính scene 3D, bản day/night theo theme | `public/images/spirit/`, `components/ui/spirit-still.tsx`; pose trong `spirit-expression.ts` |
| Hero (placeholder, fallback no-WebGL/lỗi) | `SpiritIllustration` — 2D full-colour, khung hình khớp camera 3D để không nhảy layout | `components/icons/spirit-mam-den.tsx` |
| Navbar logo (40px) | `SpiritIcon` — cùng art, crop sát, bỏ chi tiết < 2px | cùng file |

Quy tắc: trang trí thuần (canvas `aria-hidden`, không tab stop); tương tác chạm/nhấn chỉ là phần thưởng nhỏ; reduced-motion = khung tĩnh.
Màu 2D dùng literal của palette (moss, stone, golden-dust, ink) nên đọc giống nhau ở cả hai theme. Ràng buộc kỹ thuật và vòng đời: xem
[system-architecture.md](./system-architecture.md#3d-graphics-implementation).

---

## 7. Components

### 7.1 Button

Hybrid: hình + chữ là CSS/HTML thật; chất liệu là texture raster phủ lên.

| Variant | Light | Dark | Material |
|---|---|---|---|
| **solid** | nền accent `#3d6a4b`, chữ on-accent | nền `#98d8c8`, chữ `#1a1e2e` | `button-wash-*` overlay `mix-blend-mode: soft-light` 35% + brush-edge mask |
| **outline** | viền 2px `line-strong`→accent khi hover, chữ accent | tương tự với teal | mép brush-edge mask |
| **ghost** | chữ accent, hover nền `accent-soft` | tương tự | không texture |
| **icon** | 40×40, radius-md, giống outline/ghost | | |

States: hover (accent-hover, nhấc 1px), active (ấn xuống 1px, shadow mất), focus-visible (ring 2px
`focus-ring` offset 2px), disabled (opacity 50%, bỏ texture). Height: sm 32 / md 40 / lg 48px; touch ≥ 44px trên
mobile. Chữ trên nút không bao giờ nằm trong ảnh.

### 7.2 Card

`surface-elevated` + `paper-grain` overlay (opacity 0.5 light / 0.35 dark) + shadow §5. Cover 16:9 ở trên,
bo `radius-lg` đồng bộ, mép ảnh có viền trong 1px `line`. Hover: nhấc 3px, cover zoom 1.03 (khớp code: `group-hover:scale-[1.03]`, 300ms).
Không blur (`backdrop-blur`) trên bất kỳ bề mặt UI nào.

Bốn công thức card (khi nào dùng: [code-standards.md](./code-standards.md)):

| Card | Dùng | Đặc điểm |
|---|---|---|
| `FeaturedProjectCard` | flagship trong tab Works | cover 16:9, kicker `.eyebrow` accent, H3 22px, badge `md` |
| `OverlayProjectCard` | "Selected work" ở Home | tiêu đề **trên tranh**: `.cover-scrim`, kicker vàng `golden-dust-200`, H3 trắng, blurb 2 dòng, pill tech chỉ ở lg |
| `ProjectRowCard` | danh sách "More from …" và pager trang chi tiết | thumbnail 136×77 (96×64 mobile), tiêu đề, blurb 2 dòng (bỏ nếu không có), mũi tên |
| `ProjectCard` | lưới audiophile / activities | thumbnail 16:9, tiêu đề, blurb tùy chọn |

Cả card là một link được đặt tên bằng tiêu đề → ảnh trong card là trang trí (`alt=""`). Thẻ facts của trang chi tiết là giấy
phẳng (không `paper-grain`): texture 95KB phủ cả thẻ từng thành phần tử LCP trên điện thoại.

### 7.3 Badge / chip

- **Badge** (`components/ui/badge.tsx`): pill nền tint, chữ bậc 700 (light) / 300 (dark), 12px. `size="sm"` (mặc định, nhãn inline)
  hoặc `size="md"` = pill 26px, weight 700 — dùng cho tech tag trên card và stack trong facts. Tone `neutral` cho trạng thái ("Under development").
- **Chip** (`components/ui/chip.tsx`): pill 36px nền `surface`, viền `line`, icon brand (màu kéo về `--ink` 25% để đọc được ở cả hai theme)
  hoặc chấm màu. **Một** kiểu chip cho skills và hobbies; render `<li>`, đặt trong `<ul>`.
- Biến thể **washi tape** (ảnh `washi-tape-*`) chỉ cho nhãn nổi bật ("Featured") — tối đa 1/card. **Chưa áp dụng:** UI hiện không có nhãn "Featured".

### 7.4 Section heading

`SectionHeading` (`components/ui/section-heading.tsx`): `.eyebrow` (chương "01 · Morning" … "05 · Night", hoặc nhãn loại
"Beyond code") + H2 `text-section` + `DividerVine` accent bên dưới. Căn trái mặc định; `eyebrow` là prop bắt buộc. Thứ tự
chương Home: hero → 01 Morning (Selected work) → 02 Noon (About) → 03 Afternoon (Skills) → 04 Dusk (Journey) → 05 Night (Say hello).

### 7.5 Theme toggle

Icon `sun`/`moon` mới; chuyển icon bằng crossfade + rotate 30° (Motion), tắt khi reduced-motion.

### 7.6 Navbar & footer

- **Navbar** 72px cố định: **trong suốt** trên bầu trời ở đầu trang, thành **giấy đặc** (`bg-surface` + viền `line`) khi
  `scrollY > 8`; không glass. Render đầu luôn "chưa cuộn" (an toàn hydration), đồng bộ ngay sau mount cho deep link
  (`/#work`) và scroll được khôi phục. Link: About · Works · Audiophile, active = `accent-on-sky` đậm + gạch dưới, target ≥ 44px;
  GitHub là `<a>` dùng `iconButtonClasses('ghost')`. Menu mobile: cùng link + GitHub, item 48px. Activities không có trên nav.
- **Footer** trên `surface-sunken`: tên + câu giới thiệu, `<nav aria-label="Footer">` hai cột (Pages, Elsewhere), link `accent`, chữ `ink-muted` đầy đủ độ đậm.

### 7.7 Page header

`PageHeader` (`components/ui/page-header.tsx`) là header **duy nhất** cho trang danh sách và chi tiết: breadcrumb
(`Breadcrumb`, link ≥ 32px, mục cuối `aria-current`) → tranh có eyebrow vàng + H1 `text-page-title` trắng đè trên `.cover-scrim`
→ lead `text-lead`. Tranh là banner ngày/đêm (works, audiophile, activities) hoặc cover dự án 2.4:1 (16 trang works,
`coverPosition` khi chủ thể bị cắt; điện thoại nhận bản 640w vì cover là LCP); không tranh (audiophile chi tiết, YTC) = eyebrow +
H1 phẳng cùng thang. Khung có `min-h` 240/260px để H1 hai dòng + eyebrow vẫn nằm trong dải scrim ở 375px. Trên desktop thấp khung bị chặn
`short:max-h-[52svh]` (ảnh `object-cover` chỉ cắt thêm tranh, H1 vẫn neo đáy) để lead nằm trên mép màn hình ở 1280×650;
crop 16 cover và contrast chữ đã đo lại ở khung 1036×338.

**`.cover-scrim`** — scrim duy nhất cho chữ trên tranh: đặt trên **khối chữ neo đáy** kèm `pt-24`; gradient
.85 ở đáy → .7 tại mép trên của chữ → mờ hết trong 6rem phía trên. Dải đậm luôn phủ chữ dù tiêu đề xuống mấy dòng.

### 7.8 Detail layout

`DetailBody` (`components/layout/detail-layout.tsx`): cột prose (`<article>`) + thẻ facts 300px (`<aside>`, `h2.eyebrow`)
ở lg; trên điện thoại thẻ facts lên trước (chỉ đổi thứ tự hiển thị). Mỗi fact là cặp `dt`/`dd` (`FactRow`): giá trị đậm, stack thành
badge `md`, trạng thái thành badge neutral; giá trị ngắn đứng hai cột trên điện thoại. `DetailPager` kết trang: thẻ trước/sau
(`ProjectRowCard`, vòng quanh danh sách cùng category) + link "All …" `accent-on-sky`.

---

## 8. Material & texture library

| Asset | File | Spec |
|---|---|---|
| Giấy nền | `paper-grain-light.png`, `paper-grain-dark.png` | 1024² seamless tile, grain giấy cotton, không vết bẩn lớn |
| Wash nút | `button-wash-moss.png`, `button-wash-teal.png` | 1024×256, vệt gouache ngang seamless theo trục X |
| Brush-edge mask | `brush-edge-mask.png` | 1024×256, hình chữ nhật bo góc trắng mép cọ trên nền đen (dùng làm `mask-image`) |
| Card paper | `card-paper-light.png`, `card-paper-dark.png` | 1024² seamless, mịn hơn paper-grain |
| Washi tape | `washi-tape-moss.png`, `washi-tape-golden.png`, `washi-tape-sakura.png` | 512×128, nền trắng tinh (tách alpha khi apply) |
| Avatar frame | `avatar-wreath.png` | 1024², vòng lá + hoa dại gouache, tâm trống trắng |

Raster export master **PNG**; khi apply chuyển WebP (q 80) qua `sharp` như ảnh hiện có. Texture nền phải ≤ 60KB
WebP sau khi nén — nếu lớn hơn, giảm tile 512².

**Áp dụng:** file nằm ở `public/images/ui/*.webp`. Ngân sách thực tế ≤ 100KB/texture: `card-paper-*` ~95KB (q90, giữ chi tiết grain), `paper-grain-*` ~67KB. `avatar-wreath` hiển thị với inset -30% (dải lá của tile nằm ở 48–75% bề rộng).

---

## 9. Imagery

### 9.1 Project covers (16:9, master ≥ 1920×1080, apply WebP 480 (card compact, q72) + 640 + 1280 rộng: `public/images/works/<id>-cover-{480,640,1280}.webp`)

Mỗi cover là 1 cảnh gouache ẩn dụ cho domain dự án. Không chữ, không logo, không UI.

| id | Ẩn dụ cảnh |
|---|---|
| foodlover | Quầy bếp nhỏ ven rừng buổi sáng, nồi canh bốc khói, sổ công thức mở trên bàn gỗ, rổ rau |
| ecommerce | Phố chợ làng, các sạp nối nhau bằng dây đèn giấy (microservices), chim đưa thư mang bưu kiện |
| tensorflow | Đôi bàn tay đang ra ký hiệu trên đồng cỏ chạng vạng, đốm sáng đom đóm vẽ theo quỹ đạo cử chỉ |
| ticketapp | Rạp chiếu ngoài trời giữa hàng cây lúc hoàng hôn, vé giấy bay nhẹ, ghế băng gỗ |
| ai-center | Ngôi nhà trên cây trung tâm, nhiều đèn lồng nối sợi chỉ sáng tới các nhà nhỏ quanh đồi |
| planogram | Kệ tạp hóa làng xếp ngay ngắn, một thấu kính đồng lơ lửng soi kệ, vệt sáng kiểm tra |
| ocr-cccd | Bàn gỗ, thẻ giấy trơn dưới kính lúp đồng, các mảnh giấy nhỏ bay lên như được "đọc" ra |
| advance-system | Người khảo sát nhỏ quay lưng, cầm bảng kẹp, đi dọc phố tiệm làng buổi sáng |
| mondelez-display | Góc tiệm với kệ trưng bày bánh kẹo lễ hội, cờ đuôi nheo, ánh nắng xiên — không nhãn hiệu |
| asset-management | Nhà kho cũ, thùng gỗ gắn thẻ giấy, dụng cụ treo bảng gỗ, bụi nắng lơ lửng |
| bat-loyalty | Hũ thủy tinh trên quầy đầy dần đồng xu thưởng màu vàng phát sáng, thẻ tích điểm đóng dấu lá |
| bat-psa | Bàn học ấm cúng ban đêm, bảng bần ghim biểu đồ vẽ tay và ghi chú, đèn bàn vàng |
| castrol-fleet | Đoàn xe tải nhỏ uốn lượn trên đường đồi, gara sửa xe dưới chân đồi, bản đồ cắm ghim |
| vending-ai-agent | Máy bán hàng tự động phát sáng dưới gốc cây ở trạm xe buýt quê lúc chạng vạng |
| warehouse-management | Kho thóc lớn, kệ cao, băng chuyền thùng gỗ, nhãn gỗ sọc như mã vạch |
| creasia-erp | Nhìn từ trên cao một thị trấn nhỏ hài hòa, các khu nối bằng đường mòn về tháp đồng hồ trung tâm |

### 9.2 Page banners & OG (2 bản day/night trừ OG)

| Asset | Kích thước | Cảnh |
|---|---|---|
| `banner-works-day/night` | 2400×800 | Bàn làm việc gỗ ngoài hiên nhìn ra rừng, bản vẽ và dụng cụ |
| `banner-audiophile-day/night` | 2400×800 | Máy hát + tai nghe trên bậu cửa sổ gỗ mở ra thung lũng |
| `banner-activities-day/night` | 2400×800 | Lửa trại sân trường bên đồi, cờ đuôi nheo, sân khấu nhỏ |
| `banner-404-day/night` | 2400×800 | Đường mòn rừng rẽ nhánh, biển chỉ đường gỗ trống chữ |
| `og-image-spirit.jpg` | 1200×630 | **Đang dùng** (2026-10-02, user chọn): trời bình minh của hero, tên bên trái, Mầm Đèn render 3D bên phải nhìn về phía tên. Sinh bằng `scripts/render-spirit-stills.mjs` |
| `og-image-forest.jpg` | 1200×630 | Bản gouache cũ (đồi cỏ, cây lớn). Giữ file để link đã chia sẻ không vỡ; phương án ghép Mầm Đèn lên nó bị loại vì đảo 3D trông như dán lên tranh |

**Tiêu đề trên banner/cover** (quyết định của chủ sở hữu: tiêu đề đè lên tranh là có chủ đích): eyebrow + `<h1>` +
ornament ở góc dưới-trái qua `PageHeader` (§7.7), chữ trắng `text-page-title` trên `.cover-scrim` + text-shadow nhẹ.
Đo bằng `cover-contrast.cjs` trên 3 banner × ngày/đêm và 16 cover (375 + 1440, cover thêm khung thấp 1280 bằng `SHORT=338`): tiêu đề p5 ≥ 6.8:1, eyebrow vàng ≥ 5.5:1.
404 không có tiêu đề overlay (khung banner cũ).

---

## 10. Motion

Giữ **Animation Discipline Contract** của plan rebuild trước
([plan](../plans/260707-1414-ghibli-ui-rebuild-day-in-forest/plan.md)): GSAP chỉ trong `components/scene/`,
Motion cho component, Lenis cho scroll, content không animate liên tục, tôn trọng reduced-motion.
Asset mới không thêm animation chạy liên tục; texture tĩnh.

**Prerender-safe (2026-10):** trang được prerender ra HTML thật, nên markup không bao giờ chứa `opacity: 0`
(crawler, người tắt JS và first paint sẽ thấy trống). Reveal dùng `components/ui/reveal.tsx` (div thường, chỉ ẩn
phần dưới màn hình sau khi mount rồi hiện khi cuộn tới); entrance của hero là keyframe CSS `.hero-rise`.
Reduced-motion: không ẩn gì cả. Chi tiết: [DESIGN.md](../DESIGN.md#motion-principles).

**Hero (split):** dòng tên + avatar → H1 câu giá trị → lead → CTA → stats → thẻ "Now building" lần lượt `.hero-rise` với delay
0.05 → 0.75s (inline `animationDelay`). Mũi tên "Selected work" nảy nhẹ (chỉ icon, Motion), đứng yên khi reduced-motion. Ban đêm
thêm quầng đèn lồng (radial gradient `hidden dark:block`, bán kính nằm trong ô spirit) và chữ highlight vàng phát sáng.

**Nền ambient — mây cumulus trôi** (`components/scene/drifting-clouds.tsx`, `cloud-sprite.ts`): ≤ 5 đám (3 trên
màn cảm ứng) ở nửa trên bầu trời. Sprite vẽ procedural 1 lần trên canvas (seed cố định): metaball các cụm nhỏ
trong một vòm (lõi to, mép nhỏ → viền súp-lơ), đáy tan dần, mép gouache hơi xơ; độ sáng = độ dày mây theo hướng
nắng trên-trái (self-shadow), chia 3 dải mềm. Xuất 2 alpha mask, DOM tô bằng `mask-image` trên 2 màu phẳng
(`--cloud-shade` dưới `--cloud-lit`) nên đổi màu theo trời không phải vẽ lại sprite. Trôi trái→phải 230–340s/lượt (~6–9px/s ở 1440px), xa = nhỏ, nhạt, chậm hơn.
Màu suy từ sky stop đang chạy (ngày: mũ kem, bụng lavender; đêm: slate trăng, bụng navy, mỏng dần qua zone đêm
để sao đọc được). Ràng buộc: `--ink` / `--ink-muted` ≥ 4.5:1 trên mây đã blend ở mọi progress — đổi hệ số
`CLOUD_TONES` (`ambient-scene.tsx`) thì đo lại. Reduced-motion: mây đứng yên đúng vị trí nghỉ (khung đầu của animation).

**My Journey — đường mòn đèn hạt** (`components/home/experience-dusk.tsx`, `journey-trail.tsx`, `journey-card.tsx`):
đường mòn chấm uốn lượn nhẹ trong một làn hẹp qua các mốc (mép trái trên điện thoại).
Một đèn hạt (motif Mầm Đèn) đi theo dòng đọc (62% viewport) qua `useScrollProgress` (ScrollTrigger + Lenis, không
đọc layout mỗi frame); đoạn đã đi được tô màu accent, mốc nào đèn tới thì sáng (`data-lit`). Mọi cập nhật mỗi frame
chỉ là transform (khung clip trượt lên + SVG trượt xuống; đèn là layer HTML) — không repaint. Desktop đọc
trái→phải: thời gian (220px, căn phải) | đường mòn | card (chiếm phần còn lại) — không so le, để không bỏ trống nửa
màn hình; card trượt vào từ phải, thời gian từ trái. Không còn pin heading. Reduced-motion:
đường vẽ sẵn, mọi mốc sáng, không có đèn.

---

## 11. AI generation prompt anatomy

Mọi raster dùng chung **style block** dưới đây, ghép sau mô tả cảnh. Ảnh palette
(`00-palette/palette-light-dark.png`) được đính làm tham chiếu màu khi tool cho phép.

**Style block (giữ nguyên chữ):**

```text
Hand-painted gouache illustration in the style of classic Japanese animation background art.
Opaque layered brushwork, soft edges, no outlines, visible brush texture in large areas, subtle cotton-paper grain.
Warm natural light, towering cumulus clouds, lush moss greens, warm parchment highlights, cool lavender-blue shadows.
Palette limited to: moss green #4a7c59 #7eb77f, spirit teal #98d8c8, parchment #f5f0e8, golden dust #d4a853,
sakura #e8a0b4, sky blue #87ceeb, bark brown #8b6f47, night navy #1a1e2e.
Calm, cozy, nostalgic countryside mood. Single clear focal point, simple uncluttered areas for UI overlays.
```

**Negative block:**

```text
No text, no letters, no numbers, no logos, no watermarks, no signatures, no brand names, no UI screenshots.
No existing anime characters or recognizable film locations. No photorealism, no 3D render, no neon,
no glossy plastic, no heavy black outlines, no lens flare.
```

Texture prompt bỏ phần cảnh/mây, chỉ giữ dòng kỹ thuật + màu + "seamless tileable, flat even lighting,
top-down scan".

---

## 12. Review folder & naming

```text
design/ui-kit-review/
├── index.html              # gallery duyệt tất cả asset
├── manifest.json           # danh sách asset + prompt + trạng thái
├── 00-palette/             # palette-light-dark.png + palette.html (nguồn render)
├── 01-covers/              # cover-<project-id>.png
├── 02-banners/             # banner-<page>-<day|night>.png, og-image.png
├── 03-materials/           # texture & material raster
├── 04-icons/               # <name>.svg + contact-sheet.html
└── 05-ornaments/           # divider-*.svg, motif svg, monogram
```

File kebab-case, không dấu, không khoảng trắng. Folder này là master review, app **không** import; bản chạy là WebP trong `public/images/{ui,banners,works}`.

## 13. Apply checklist

- [x] 1. Thêm scale + semantic token mới vào `src/styles/global.css` (giữ tên token cũ làm alias).
- [x] 2. Đổi `accent` light → `#3d6a4b`; badge text → bậc 700/300.
- [x] 3. Icon/ornament SVG thành component `components/icons/kit-*.tsx`; gỡ `react-icons/hi2`; `io5` chỉ còn `IoLogo*` (§6.2).
- [x] 4. Raster WebP: materials `public/images/ui/`, covers `public/images/works/`, banners `public/images/banners/`, OG `public/images/og-image-spirit.jpg`.
- [x] 5. Cập nhật `button-styles.ts`, `card.tsx`, `badge.tsx` theo §7.
- [ ] 6. Smoke test routes light/dark + reduced-motion; đo bundle/LCP không tăng > 5% (kết quả ở báo cáo verify của plan, không lặp ở đây).
- [ ] Washi tape: chưa áp dụng (§7.3).
