# Nguyen Phu Trieu — Portfolio

A bilingual Next.js portfolio for DevOps, cloud infrastructure, and platform engineering work. The home page combines a Kage-inspired editorial composition with a shader-driven Three.js Logic Core, isometric infrastructure nodes, a Flowing Mesh diagnostic surface, a Canvas 2D connectivity field, bloom, and pointer interaction. GSAP adds a pinned chapter narrative, word reveals, and project-depth choreography while retaining static accessible fallbacks.

## Architecture

- `app/page.tsx` — home-page content and project evidence.
- `app/projects` and `app/blog` — statically generated index and detail routes.
- `app/site-shell.tsx` — shared navigation, preferences, CSS ambient field, and footer.
- `app/ambient-three.tsx` — interactive, disposable, performance-capped hero scene.
- `app/scroll-reveal.tsx` — scoped GSAP/ScrollTrigger choreography.
- `app/globals.css` — tokens, themes, component styling, responsive rules, and fallbacks.
- `design-dna.json` — machine-readable source of redesign decisions.
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
