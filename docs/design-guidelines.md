# Design Guidelines — "A Day in the Forest" UI Kit

**Status:** Applied (2026-10-01) — kit đã được áp dụng vào code; mục nào lệch spec gốc có ghi chú "Áp dụng" tại chỗ
**Last Updated:** 2026-10-01
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
Ràng buộc cứng: mọi stop giữ `--ink` và `--ink-muted` ≥ 4.5:1 đặt thẳng trên bầu trời (đo lúc áp dụng: min 4.58 light, 4.59 dark) —
đổi stop phải đo lại. Artwork banner phải khớp 5 cảnh: dawn (đào-kem),
morning (xanh trời nhạt), golden afternoon (vàng bơ), dusk (lavender-sakura), night (chàm-đen + đốm vàng).

### 3.6 Tỷ lệ dùng màu

60% neutral (parchment / night) · 30% moss–teal + bầu trời trong artwork · 10% golden/sakura làm điểm nhấn.
Mỗi màn hình tối đa **1** màu nhấn nóng ngoài accent.

---

## 4. Typography

Giữ **M PLUS Rounded 1c** (đã load 300/400/500/700/800) — nét tròn hợp chất "vẽ tay ấm". Không thêm font
(YAGNI, tiết kiệm request).

| Role | Size (mobile → desktop) | Weight | Line-height | Tracking |
|---|---|---|---|---|
| Display (hero name) | 40 → 64px | 800 | 1.05 | -0.02em |
| H1 page | 32 → 44px | 800 | 1.15 | -0.01em |
| H2 section | 24 → 32px | 700 | 1.2 | 0 |
| H3 card title | 18 → 20px | 700 | 1.3 | 0 |
| Body | 16 → 17px | 400 | 1.7 | 0 |
| Small / meta | 14px | 500 | 1.5 | 0.01em |
| Eyebrow / label | 12px | 700 | 1.4 | 0.12em, uppercase |

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
| spacing base | 4px scale Tailwind | section gap 96–128px desktop, 64px mobile |
| container | ~1100px content, prose 65ch | |

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

Logo mạng xã hội: vẽ lại theo chất kit nhưng **giữ silhouette nhận diện** (chữ "in", con mèo GitHub, máy ảnh IG)
— thay đổi chỉ ở độ dày nét và bo góc.

**Áp dụng:** 5 logo (github, linkedin, instagram, facebook, google) **giữ** `react-icons/io5` `IoLogo*` (quyết định của user, theo brand guidelines của từng nền tảng); chỉ `mail` dùng icon kit.

**Không thay:** logo công nghệ trong skills bento (`react-icons/si`, `di`) — đó là nhận diện thương hiệu của
công nghệ, vẽ lại làm giảm độ nhận biết. Nằm ngoài phạm vi kit.

### 6.3 Ornaments (SVG trang trí)

`divider-vine`, `divider-brush`, `divider-firefly-trail` (viewBox 240×24, stretch ngang) · `sprig-leaf`,
`acorn`, `paper-lantern`, `firefly`, `cloud-puff`, `sparkle-star` (24×24) · `monogram-lt` (mark cá nhân,
32×32 viewBox; từng được đề xuất làm logo navbar). **Quyết định user (2026-10-01): navbar dùng `SpiritIcon` (Mầm Đèn,
`components/icons/spirit-mam-den.tsx`)**, thay icon nhân vật cũ (đã gỡ khỏi repo cùng model 3D cũ); `MonogramLt` vẫn có trong
`kit-ornaments` nhưng chưa dùng.

**Áp dụng:** ornament heading đặt **sau** chữ (thay emoji cuối heading cũ) qua prop `ornament` của `SectionHeading`; dưới heading là divider `DividerVine` (dây leo + lá) rộng `w-32`, màu `accent` — đổi từ `DividerBrush`/`line-strong` sau review local vì quá mờ. Nguồn: `components/ui/section-heading.tsx`, `components/icons/kit-*.tsx`.

### 6.4 Mầm Đèn — nhân vật gốc của site

Linh vật rừng **original**: viên đá phủ rêu trên bốn mấu rễ, một chồi non cong mang đèn lồng hạt (seed lantern) phía trước;
đứng trên đảo rêu nhỏ. Một bộ hình, hai cách thể hiện:

| Nơi dùng | Dạng | Nguồn |
|---|---|---|
| Hero (chính) | 3D painted, procedural trong three; đèn hạt sáng ấm; ánh sáng chuyển mượt theo theme (ngày: nắng + hemi; đêm: trăng + ánh đèn hạt) | `components/spirit/` |
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

### 7.3 Badge / chip

Pill, nền tint 400/15%, chữ bậc 700 (light) / 300 (dark), weight 600, 12px. Biến thể **washi tape** (ảnh
`washi-tape-*`) chỉ cho nhãn nổi bật ("Featured") — tối đa 1/card. **Chưa áp dụng:** UI hiện không có nhãn "Featured" nên không có chỗ dùng.

### 7.4 Section heading

Eyebrow 12px uppercase + H2 + ornament nhỏ. Divider giữa section dùng `divider-*` SVG màu `line-strong`.

### 7.5 Theme toggle

Icon `sun`/`moon` mới; chuyển icon bằng crossfade + rotate 30° (Motion), tắt khi reduced-motion.

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
| `og-image-forest.jpg` | 1200×630 | Đồi cỏ lúc golden hour, cây lớn đơn độc, mây cumulus; nửa trái để trống cho chữ khi compose |

**Tiêu đề trên banner** (works / audiophile / activities): `<h1>` + ornament đặt góc dưới-trái banner qua prop `title` /
`ornament` của `PageBanner`, chữ trắng 30→48px, scrim `from-black/65 via-black/25 to-transparent` + text-shadow nhẹ.
Đo trên 6 banner (desktop + crop mobile): p5 contrast ≥ 3.66:1 (chữ lớn cần 3:1), trung vị ≥ 6.8:1. 404 không có tiêu đề overlay.

---

## 10. Motion

Giữ **Animation Discipline Contract** của plan rebuild trước
([plan](../plans/260707-1414-ghibli-ui-rebuild-day-in-forest/plan.md)): GSAP chỉ trong `components/scene/`,
Motion cho component, Lenis cho scroll, content không animate liên tục, tôn trọng reduced-motion.
Asset mới không thêm animation chạy liên tục; texture tĩnh.

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
- [x] 4. Raster WebP: materials `public/images/ui/`, covers `public/images/works/`, banners `public/images/banners/`, OG `public/images/og-image-forest.jpg`.
- [x] 5. Cập nhật `button-styles.ts`, `card.tsx`, `badge.tsx` theo §7.
- [ ] 6. Smoke test routes light/dark + reduced-motion; đo bundle/LCP không tăng > 5% (kết quả ở báo cáo verify của plan, không lặp ở đây).
- [ ] Washi tape: chưa áp dụng (§7.3).
