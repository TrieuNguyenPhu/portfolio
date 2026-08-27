# Nguyen Phu Trieu — Portfolio

Responsive Next.js portfolio for a software engineer working across backend systems and cloud infrastructure.

## Structure

- `app/page.tsx` composes the localized homepage and featured engineering work.
- `app/projects/projects.ts` is the source of truth for project summaries, architecture, evidence, and featured ordering.
- `app/projects/[slug]` renders static case-study pages with route-specific metadata.
- `app/site-*` owns shared navigation, footer, preferences, and page-shell behavior.
- `app/layout.tsx` owns global metadata, structured data, viewport settings, and fonts.
- `app/globals.css` contains centralized design tokens, responsive layouts, and reduced-motion rules.

The site uses localized content objects and lightweight React components without a UI framework or animation dependency. Architecture visuals and the octopus identity are implemented with reusable SVG and CSS.

```bash
npm install
npm run dev
```

Production check:

```bash
npm run lint
npm test
npm run build
```
