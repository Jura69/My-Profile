# UX & Animation Upgrades — Spelling Corrections, Timeline Badge Icons, and Falling Leaves

**Date**: 2026-07-08 10:01  
**Severity**: Low (UX polish, visual optimization)  
**Component**: Homepage (hero-dawn, experience-dusk, home-data, zone-particles, global.css, cv.html)  
**Status**: Completed, verified

## Sự kiện

Completed UX reviews and visual enhancement implementations based on the brainstorm report. Fixed a long-standing spelling typo in the timeline data, renamed the timeline title to better capture both education and career milestones, and synchronized the experience badges with brand-colored icons matching the Bento Grid. Also implemented a GPU-friendly CSS falling leaves layer for daytime homepage scenes, and converted the static chevron indicator into a smooth Framer Motion bounce animation. Totoro hover/click interactions and laptop screen glow were temporarily added but reverted per user request to maintain model simplicity.

## Sự thật phũ phàng

- **Icon Imports**: Initially imported `SiAmazonaws` from `react-icons/si` for AWS but compilation failed because the package exports it as `SiAmazonwebservices`. Running a dynamic Node import listing script helped identify the correct export name quickly.
- **Path Resolution Validator**: Prepending `/C:` to the walkthrough screenshot path raised validation warnings on Windows due to case/slash mismatch, solved by referencing the absolute path directly as `C:\Users\...` without the leading slash.
- **Totoro Scope**: Declared `animate` inside Three.js `useEffect` below `loadGLTFModel` promise call, which originally made the model group out of scope for custom interactions; solved by using a scoped `loadedModel` reference variable inside the hook.

## Chi tiết kỹ thuật

### Spacing, Spacing, and Naming
- Added top margin `mt-10` to Hero CTA buttons to prevent clipping with the subtitle.
- Section title updated from `"Work Experience"` to `"My Journey 🌳"` to reflect Nha Trang University's educational milestone entry.
- Fixed `"Infordation Vietnam"` typo in `components/home/home-data.ts` and `public/cv.html` to `"Infodation Vietnam"`.
- Renamed `--color-timeline-infordation` theme variable to `--color-timeline-infodation`.
- Relocated Totoro from absolute bottom-right to a relative centered block layout at the top of the content flow.

### Tech Badges Synchronization
- Exported `techIconMap` containing brand colors and logos for: `React`, `C#`, `.NET`, `SQL Server`, `Node.js`, `Express`, `MongoDB`, `Redis`, `Docker`, `AWS`, `SQL`.
- Updated `components/home/experience-dusk.tsx` to render tech badges with matching logos, creating instant visual rhythm.

### Falling Leaves Animation
- Added `@keyframes scene-leaf-fall` in `global.css` translating leaves from `translateY(-20px) translateX(0)` to `translateY(105vh) translateX(-25vw) rotate(540deg)`.
- Implemented `scene-leaves` rendering green, mint, wood brown, and cherry blossom pink leaves in `components/scene/zone-particles.tsx` with dynamic sizes, delays, and linear animation rates.

## Cố gắng
- Local build compilation: `npm run build` succeeds cleanly.
- Visual inspection: Walkthrough verified with browser subagent recording.
- Reversion: Removed laptop glow PointLight and hover/click event listeners from `components/totoro.tsx` to keep the character static per user feedback.
