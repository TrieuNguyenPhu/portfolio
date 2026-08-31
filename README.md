# Nguyen Phu Trieu — Working Systems

A rebuilt Next.js portfolio organized as seven editorial volumes. The landing experience uses ThreeUI's exact `CompleteShelfLandingPage` source and canonical Three.js r165 document; the profile translates the same bookshelf language into verified DevOps, DevSecOps, project, and career evidence.

## Source integrity

The registered files are stored without modification:

- `src/shaders/landing-pages/LandingPages.tsx`
- `public/landing-pages/complete-shelf-v2.html`
- `src/shaders/threeui.css`

Git attributes force LF for these sources so their published SHA-256 values remain stable after checkout. The application imports `CompleteShelfLandingPage` from `@designcodeio/threeui@1.1.0` and pins `three@0.165.0`.

## Routes

- `/` — exact interactive Working Volumes shelf with the configured typography and copper accent.
- `/profile` — seven portfolio volumes derived from the supplied CV.

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
