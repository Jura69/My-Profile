# Bỏ Mặt Trời Khỏi Ambient Scene Theo Yêu Cầu Thẩm Mỹ

**Date**: 2026-07-30 17:30
**Severity**: Low (thay đổi thẩm mỹ, không bug)
**Component**: components/scene (ambient-scene, celestial-arc, svg/sun)
**Status**: Resolved, verified bởi lint + build + DOM check + code review subagent

## Sự kiện

User chê sun SVG trong scroll narrative ngày→đêm xấu (screenshot dark mode: sun cam trên nền navy), yêu cầu bỏ. Xóa đối xứng toàn bộ: `svg/sun.tsx` (file), sun carrier trong `celestial-arc.tsx`, và `SUN_STOPS`/`sunColors()`/`SUN_END`/khối animate sun trong `ambient-scene.tsx` (net −132 dòng). Moon/hills/stars/particles giữ nguyên — moon block độc lập hoàn toàn với sun (`MOON_START` là literal riêng, không derive từ `SUN_END`). Đồng bộ 2 docs + comment stale trong `hero-dawn.tsx`.

Verify: `npm run lint` 0 lỗi, `npm run build` pass 11s, dev server DOM check (`[data-scene="sun"]` null, moon + hills còn, 0 console error). Code review subagent: DONE, không dangling refs / dead CSS vars / orphaned SVG defs.

## Ghi nhận

1. **Review bắt được comment tự viết lại vẫn sai.** Khi rewrite comment `celestial-arc.tsx` cho gọn, giữ nguyên câu cũ claim `gsap.quickSetter` — thứ chưa bao giờ tồn tại trong repo (ambient-scene ghi `.style` trực tiếp). Sửa 3/4 dòng comment cho đúng nhưng để lại đúng dòng sai duy nhất. Fix 1 dòng theo review.
2. **Reduced-motion snapshot `apply(0.18)` giờ là bầu trời trống** (không thiên thể — moon chỉ hiện từ p≥0.58). Chấp nhận: user muốn bỏ sun ở mọi chỗ, sky palette mid-morning + hills vẫn là composition hợp lệ.
3. **Prettier config hỏng từ trước** (CJS `module.exports` dưới `"type": "module"`, prettier không có trong devDependencies, `tabWidth: 2` lệch codebase 4-space) — ngoài scope, đã flag thành task riêng.

## Follow-up (optional, không bundle)

- `CelestialArc` giờ chỉ chở 1 moon — có thể rename/fold vào ambient-scene ở diff riêng.
