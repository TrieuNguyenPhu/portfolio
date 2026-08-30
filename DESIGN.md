---
name: Nguyen Phu Trieu Portfolio
description: A bilingual infrastructure signal observatory for verified DevOps work.
colors:
  dark-paper: "#07090d"
  dark-sheet: "#0d1119"
  light-paper: "#f4f7fb"
  light-sheet: "#ffffff"
  ink-dark: "#f6f8fc"
  ink-light: "#090d18"
  cyan: "#22d3ee"
  blue: "#2563eb"
  violet: "#8b5cf6"
  manifest: "linear-gradient(135deg, #22d3ee 0%, #2563eb 52%, #8b5cf6 100%)"
typography:
  family: "var(--font-roboto), sans-serif"
  display-weight: 700
  body-weight: 400
  label-weight: 700
motion:
  quick: "350ms"
  standard: "500ms"
  slow: "800ms"
  easing: "cubic-bezier(0.22, 1, 0.36, 1)"
rounded:
  square: "0"
---

# Design System: Infrastructure Signal Observatory

## Creative direction

The portfolio behaves like a technical observatory: a calm field of infrastructure signals, precise registration lines, architecture routes, and evidence arranged for quick inspection. It combines the cinematic depth of a Three.js scene with the clarity expected from an engineering case study.

The experience is deliberately editorial rather than dashboard-like. Recruiters can scan the career statement and project outcomes quickly; technical reviewers can continue into architecture, engineering decisions, repositories, and operational evidence.

The canonical machine-readable extraction is in `design-dna.json`.

## Core principles

- **Evidence before decoration.** 3D, gradients, and motion support system relationships; they never replace project evidence.
- **One signal spectrum.** Cyan, blue, and violet identify routes, active states, and important actions.
- **Bilingual continuity.** Roboto is used for both English and Vietnamese so switching language does not change the visual voice.
- **Constructed depth.** Fine rules, clipped corners, translucent technical sheets, and the ambient scene build depth without rounded consumer-app cards.
- **Equivalent themes.** Light and dark modes keep the same hierarchy, geometry, and information order.
- **Progressive enhancement.** Content and navigation remain complete when WebGL or motion is unavailable.

## Visual DNA

### Palette

Dark mode uses `#07090d` as the observation field and `#0d1119` for raised technical sheets. Light mode uses `#f4f7fb` and white sheets. The signal gradient runs from cyan `#22d3ee`, through blue `#2563eb`, to violet `#8b5cf6`.

Use the signal gradient for:

- the primary action;
- active navigation and progress routes;
- focused system nodes;
- sparse ambient illumination.

Do not apply it to routine body copy or every card heading. Most content should remain neutral so evidence has a stable reading surface.

### Typography

Roboto is the only type family. Hierarchy comes from weight, scale, line height, and tracking:

- Hero: `clamp(3.5rem, 7.8vw, 8rem)`, weight 700, compact line height, tightly tracked.
- Section title: `clamp(2.4rem, 5vw, 5rem)`, weight 600.
- Project title: editorial display scale with weight 600–700.
- Body: 1rem–1.15rem, weight 400, relaxed line height.
- Labels and metadata: 0.56rem–0.72rem, weight 700–800, uppercase with positive tracking.

Long-form article copy stays narrower and more relaxed than interface copy. Vietnamese headings may occupy more lines but keep the same optical scale as English.

### Geometry

- Corners are square by default.
- Primary visual sheets may clip the upper-right corner.
- Borders are one-pixel registration rules.
- System diagrams use orthogonal routes, restrained arcs, small status points, and labeled nodes.
- Pills are reserved for semantic status only; technology tags remain compact ruled labels.

## Spatial system

Content uses a fluid maximum width of 88rem with responsive outer gutters. The global page field extends beyond the content container so the grid, ambient light, and Three.js scene feel spatial rather than boxed.

The home hero is a two-part composition on wide screens: a large career claim and an architecture workbench. Below 62rem the workbench drops beneath the claim. Below 48rem editorial splits stack, actions become full width, and project/case-study layouts become a single column.

The primary responsive thresholds are:

- 70rem: compact navigation utilities and narrower feature layouts.
- 62rem: stacked hero and case-study compositions.
- 48rem: single-column editorial content and full-width actions.
- 32rem: reduced navigation chrome and compact project visuals.

## Three.js scene

`app/ambient-three.tsx` provides one fixed, non-interactive WebGL canvas shared by every route. It contains:

- an icosahedron wireframe that reads as an infrastructure globe;
- two technical orbital rings;
- shader-driven signal particles;
- curved data routes built from Catmull–Rom paths;
- slow pointer and scroll parallax.

The renderer uses alpha transparency, a capped pixel ratio, a visibility pause, resize observation, and explicit disposal of geometry, materials, and renderer resources. Devices with very low concurrency and users requesting reduced motion receive the CSS observation field without WebGL.

The scene is decorative and therefore absent from the accessibility tree. It must never capture pointer input or obscure readable contrast.

## Motion system

The motion personality is **premium technical**: deliberate, quiet, and precise. Motion communicates arrival, route progression, and system response.

### Timing

- Quick feedback: 350ms.
- Standard reveal: 500ms.
- Large spatial transition: 800ms.
- Signature easing: `cubic-bezier(0.22, 1, 0.36, 1)` or GSAP `power3.out`.

No interaction uses elastic overshoot. Multiple elements arrive with short stagger intervals instead of simultaneous large movement.

### GSAP choreography

`app/scroll-reveal.tsx` owns route-scoped GSAP behavior:

- content blocks enter with restrained opacity, vertical position, and scale changes;
- architecture routes draw as they enter the viewport;
- the global scroll progress line scrubs linearly;
- the header has one short initial arrival;
- primary buttons receive subtle magnetic response only on fine pointers.

All animations are scoped to the site shell and reverted on route changes. New semantic sections can opt in with `data-reveal`; SVG routes use `.visual-route`, `.workbench-flow`, or `.map-route`.

### Reduced motion

Under `prefers-reduced-motion: reduce`:

- the Three.js canvas is not mounted;
- ambient CSS animations are disabled;
- reveal targets are immediately visible;
- SVG routes appear complete;
- magnetic and transform-based hover movement is removed;
- smooth scrolling is disabled.

## Components

### Navigation

The sticky command bar contains brand, primary destinations, search, language, theme, and repository access. On narrow screens it becomes two rows and removes low-priority brand copy before removing destinations.

### Buttons

Primary buttons use the signal gradient with white text. Ghost buttons use the local sheet surface and registration border. Both have a minimum 44px interaction target, visible keyboard focus, and square geometry.

### Search

Search opens as a labeled dialog with a clear close action and searchable page/project results. It supports the existing keyboard shortcut and preserves focus behavior.

### Project evidence

Featured work pairs an architecture visual with status, period, summary, engineering decisions, stack, case-study link, and repository link. Archive projects use a denser version of the same evidence hierarchy.

### Architecture visuals

The SVG workbench and case-study maps share the same node-and-route vocabulary as the Three.js scene. They remain meaningful without animation and carry descriptive accessible names.

## Accessibility and performance contract

- Keep one visible `h1` per route and preserve semantic heading order.
- Maintain skip-link, landmark, and dialog labels.
- All keyboard focus uses a high-contrast cyan outline with offset.
- Interactive targets remain at least 44px where space allows.
- Do not convey status with color alone.
- Keep all core content server-rendered; Three.js and GSAP are enhancements.
- Cap renderer pixel ratio and particle count before adding post-processing.
- Pause WebGL when the document is hidden and dispose every allocated resource.
- Never use motion to gate content visibility in reduced-motion mode.

## Extension rules

When adding a section or project:

1. Start with the claim and supporting evidence.
2. Reuse the existing section heading, node, route, tag, and action primitives.
3. Add `data-reveal` only after the static reading order works.
4. Add 3D content only when it explains a relationship that the existing architecture visual cannot.
5. Verify English, Vietnamese, light, dark, mobile, keyboard, and reduced-motion states.
