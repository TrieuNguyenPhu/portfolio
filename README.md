# Nguyen Phu Trieu — Portfolio

A bilingual Next.js portfolio for DevOps, cloud infrastructure, and platform engineering. The complete interface is styled as a phosphor operations terminal, anchored by ThreeUI's exact `CrtBackground` `terminal` variant using Raw WebGL and Canvas 2D. GSAP provides route-scoped reveals and depth while the content remains accessible without animation or WebGL.

## Architecture

- `app/page.tsx` — home terminal, configured CRT usage, profile, and project evidence.
- `app/projects`, `app/blog`, and `app/about` — statically generated terminal-styled routes.
- `app/site-shell.tsx` — shared navigation, language/theme preferences, and footer.
- `app/scroll-reveal.tsx` — scoped GSAP and ScrollTrigger choreography.
- `app/globals.css` — phosphor tokens, route styling, responsive rules, and fallbacks.
- `src/shaders/crt` — exact registered ThreeUI component, renderer, shaders, and terminal screen source.
- `src/shaders/threeui.css` — exact registered shared ThreeUI stylesheet.
- `design-dna.json` — machine-readable redesign decisions.
- `DESIGN.md` — human-readable visual, source-integrity, motion, and performance contract.

## Development

```bash
npm install
npm run dev
```

## Verification

```bash
npm run lint
npm test
npm run build
```

The production build pre-renders the home, about, blog, project index, blog article, and all project case-study routes.
