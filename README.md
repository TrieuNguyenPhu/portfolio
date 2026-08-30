# Nguyen Phu Trieu — Portfolio

A bilingual Next.js portfolio for DevOps, cloud infrastructure, and platform engineering work. The interface uses Three.js for a progressive ambient signal scene and GSAP for route-scoped motion while keeping all content server-rendered and accessible without either enhancement.

## Architecture

- `app/page.tsx` — home-page content and project evidence.
- `app/projects` and `app/blog` — statically generated index and detail routes.
- `app/site-shell.tsx` — shared navigation, preferences, ambient field, and footer.
- `app/ambient-three.tsx` — disposable, performance-capped Three.js scene.
- `app/scroll-reveal.tsx` — scoped GSAP/ScrollTrigger choreography.
- `app/globals.css` — tokens, themes, component styling, responsive rules, and fallbacks.
- `design-dna.json` — machine-readable source of the redesign decisions.
- `DESIGN.md` — human-readable design and motion contract.

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
