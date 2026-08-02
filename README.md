# Nguyen Phu Trieu — Portfolio

Responsive Next.js portfolio for a DevOps engineer.

## Structure

- `app/page.tsx` contains the single-page UI, localized content, and client-side preferences.
- `app/layout.tsx` owns document metadata, viewport settings, and the shared font.
- `app/globals.css` contains the design tokens, responsive layout, and motion rules.

The project intentionally keeps the portfolio in three application files: it is easier to maintain than introducing components or state layers that the current single-page site does not need. Add a component only when a section is reused or gains independent behavior.

```bash
npm install
npm run dev
```

Production check:

```bash
npm run lint
npm run build
```
