# DESIGN.md

Design memory for `garin.dev`. This file is the source of truth for the next visual pass. The current site content and assets are canon; the current visual layout is not canon.

## Product intent

- Product type: one-screen personal calling-card site for Sergei Garin.
- Audience: recruiters, founders, hiring managers, engineering leads, and people checking contact/CV credibility quickly.
- Primary read: name → role → short proof-of-work sentence → contact links.
- Primary action: open a profile, download CV, or email Sergei.
- Trust posture: calm, precise, senior, product-minded. No portfolio theatrics, no startup-template gloss.
- Target direction: Clean Identity Object — a compact masthead card where portrait, copy, and links feel like one composed identity artifact.

Reference direction: `/Users/sergeygarin/.openclaw/media/tool-image-generation/website-clean-masthead-C-identity-object---5e6fe94d-e076-41be-b62b-68459e39537d.png`.
Use it for intent, hierarchy, density, and restraint only. Do not clone generated-image artifacts, exact composition, portrait treatment, typography, or link styling, and do not treat it as a pixel spec.

## Artifact map

- `DESIGN.md` is the only design-memory artifact for now.
- No supporting design docs are needed unless implementation reveals stable token/component/state rules that would make this file bloated.
- Downstream implementation should update this file if the approved design direction changes before code lands.

## Canonical content and assets

Current assets and approved identity content are the source of truth unless Sergey explicitly changes them. For this redesign, the preferred copy below is the copy contract; do not preserve legacy wording or layout just because it exists in the current implementation.

- `src/pages/index.astro`
- `src/layouts/main.astro`
- `src/components/link.astro`
- `src/styles/global.css`
- `src/static/me.jpg`
- `src/static/me_cropped.jpg`
- `src/public/cv.pdf`
- `job@garin.dev`
- `https://github.com/MrFlashAccount`
- `https://twitter.com/mrflashaccount`
- `https://t.me/mrflashaccount`

Preferred copy for the redesign:

- Name: `Sergei Garin`
- Role: `Frontend engineer for sharp, reliable product interfaces.`
- Micro-bio: `I turn messy product ideas into calm, fast, production-ready UI.`
- Links: `GitHub`, `X`, `Telegram`, `CV`, `Email`

Do not add invented proof, fake metrics, testimonials, project cards, employer logos, or extra sections to make the page feel fuller.

## Composition law

- The page should resolve as one screen, not a scroll portfolio.
- Build one compact masthead/card-like identity object. It may sit centered in the viewport with generous outer breathing room.
- Portrait and text must feel composed together, not like a photo column plus a content column.
- The photo may act as part of the object/background if readability is protected and the actual asset supports it; otherwise reduce photo dominance while keeping it visually integrated with the text block.
- The main reading path must be immediate: `Sergei Garin` first, role second, micro-bio third, links last.
- Keep the number of visible elements low. Every visible line should carry identity or action.
- Mobile should keep the same artifact feeling: compact, legible, calm, no stacked résumé page.

## Visual system

### Color

- Use a restrained black / charcoal / soft-white / warm-ivory system.
- Prefer strong but soft contrast over harsh pure-white-on-pure-black glare.
- No bright accents, rainbow gradients, neon, glassmorphism, decorative blobs, textures, or noise.
- If an overlay is needed for photo readability, keep it functional and quiet.

### Typography

- Typography should create the drama, not decoration.
- Name gets the strongest display treatment: large, confident, elegant, and readable.
- If a serif/display face is used, keep it engineering-sharp rather than fashion/luxury editorial; readability and credibility beat reference-image mood.
- Role and micro-bio should be clean, direct, and lower-volume than the name.
- Links should feel editorial/systemic, not like app buttons.
- Avoid cramped text, generic SaaS hero scale, and random weight changes.

### Shape, spacing, and density

- Dense enough to feel like a precise identity card; airy enough to feel senior and deliberate.
- Use one dominant container/object at most. Do not break the page into multiple cards.
- Corners, borders, and shadows should be minimal and structural, not decorative.
- Alignment should feel measured. Avoid casual scatter, bento fragments, or floating badges.

### Links and actions

- Links are part of the identity system.
- Prefer plain text links in a composed row/list, optionally separated by subtle dividers.
- Avoid social-icon button clusters, filled pills, loud CTAs, and repeated competing actions.
- `Email` and `CV` can be present with equal restraint; neither should become a giant marketing button.

### Motion and interaction

- Motion is optional and should be nearly invisible.
- Use simple hover/focus feedback that preserves the strict identity-object feel.
- Respect reduced motion.
- Focus states must be visible and coherent with the restrained palette.

## Hard nos

Do not introduce:

- portfolio/blog structure
- skills grid or `GREAT AT` chip wall
- project previews
- fake metrics, quotes, testimonials, logos, or badges
- bento/card clutter
- decorative gradients, blobs, textures, or noise
- generic `Senior Frontend Engineer` as the final hero copy
- social buttons as the primary link language
- the old/current split layout as design canon
- extra copy that weakens the sharp calling-card read

## Implementation acceptance checks

A later implementation is acceptable when:

- The page reads as a one-screen personal calling-card site.
- Portrait + text + links feel like one composed identity artifact.
- The approved copy and canonical links/assets are present.
- The current content/assets are preserved unless deliberately replaced by Sergey.
- No app files treat the old visual layout as the source of truth.
- Links are restrained identity-system elements, not loud social buttons.
- The design has no decorative gradients/blobs/textures/noise and no portfolio-section creep.
- Desktop and mobile both preserve the compact masthead/card intent.
- Text contrast, readable order, focus visibility, keyboard access, and reduced-motion behavior are not visibly broken.
