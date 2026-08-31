---
name: Nguyen Phu Trieu Portfolio
description: A bilingual phosphor terminal portfolio for verified DevOps work.
colors:
  phosphor: "#77ff8a"
  phosphor-bright: "#d5ffdf"
  amber: "#ffbf47"
  void: "#020704"
  panel: "#071009"
typography:
  family: "var(--font-roboto), ui-monospace, monospace"
  display-weight: 700
  body-weight: 400
  label-weight: 700
motion:
  quick: "180ms"
  standard: "420ms"
  slow: "800ms"
  easing: "cubic-bezier(0.22, 1, 0.36, 1)"
rounded:
  square: "0"
---

# Design System: Phosphor Operations Terminal

## Creative direction

The portfolio is a live operations terminal, not a decorative dashboard. Its visual anchor is ThreeUI's authored `CrtBackground` in the `terminal` variant: a 19-row Zion boot log typed into a green-phosphor display and resolved through Raw WebGL plus an offscreen Canvas 2D text surface.

The complete machine-readable design extraction is in `design-dna.json`.

## Source integrity

The ThreeUI implementation is stored byte-for-byte in the project:

- `src/shaders/crt/CrtBackground.tsx`
- `src/shaders/crt/crtRenderer.ts`
- `src/shaders/crt/crtShaders.ts`
- `src/shaders/crt/crtScreens.ts`
- `src/shaders/threeui.css`

These files retain the registered source structure, shader programs, render lifecycle, interactions, breakpoints, and class names. `src/shaders/fonts/fragment-mono.woff2` is the font asset referenced by the authored stylesheet and was recovered from the live ThreeUI asset pipeline without changing its relative path.

## Core principles

- **One coherent machine.** Every route shares the CRT palette, square frames, indexed labels, and command-line interaction language.
- **Signal before decoration.** Phosphor green carries primary state; amber marks alternate/light mode and secondary status.
- **Evidence stays readable.** The WebGL field establishes atmosphere while all portfolio content remains semantic HTML above opaque reading surfaces.
- **Bilingual continuity.** Roboto Mono supports English and Vietnamese with one consistent terminal voice.
- **Progressive enhancement.** Navigation, projects, case studies, and contact details remain complete if WebGL or animation is unavailable.

## Visual DNA

The dark field begins at `#020704`, panels use `#071009`, primary phosphor is `#77ff8a`, and hot glyph cores approach `#d5ffdf`. Light mode intentionally becomes an amber CRT rather than a conventional white theme. Borders are one-pixel registration rules, corners stay square, and backgrounds combine restrained grids, scanlines, vignettes, and glow.

Typography is monospaced throughout. Headings are compact and uppercase; system labels use wide tracking; body text retains enough leading for long Vietnamese passages. Interactive labels use shell-like prefixes and bracketed states rather than generic pill styling.

## Spatial system

Content uses a fluid maximum width of 88rem with responsive gutters. The home hero is a two-pane terminal workstation: operational copy occupies the left channel, while the exact ThreeUI CRT viewport occupies the right. A narrow status rail and lower metadata strip establish the console frame.

Below 62rem the panes stack so the shader remains legible at tablet widths. Below 48rem navigation and action groups wrap, terminal metadata simplifies, and all cards become single-column. The main thresholds are 70rem, 62rem, 48rem, and 32rem.

## CRT renderer

`src/shaders/crt/CrtBackground.tsx` mounts the renderer with the selected `terminal` variant and the configured values `speed=1`, `typeSpeed=1`, `motion=1`, `hue=0`, `saturation=1`, `brightness=1`, and `opacity=1`.

The exact renderer:

- rasterizes the authored boot screen at backing resolution in Canvas 2D;
- uploads it into a WebGL texture and applies curvature, scanlines, grille, bloom, chromatic separation, noise, and vignette shaders;
- responds to pointer position and viewport resizing;
- caps backing resolution and observes its container with `ResizeObserver`;
- pauses rendering when the page or component is not visible;
- tears down listeners, observers, textures, programs, buffers, and the WebGL context on unmount.

The surrounding `.shader-frame` supplies the accessible label, hardware bezel, status lamps, and visual isolation needed for readable neighboring content. No documentation page or iframe is embedded.

## Motion system

GSAP remains responsible for route-scoped interface choreography: hero copy enters in sequence, project cards reveal with shallow depth, architecture paths draw into view, and the global progress line follows the document. The CRT's shader and typing motion remain owned entirely by the unmodified ThreeUI source.

Motion uses direct, mechanical timing without elastic overshoot. Hover treatments are short signal changes; large spatial transitions use the shared ease `cubic-bezier(0.22, 1, 0.36, 1)`.

### Reduced motion

When `prefers-reduced-motion: reduce` is active, application-level smooth scrolling, reveals, magnetic response, transforms, and decorative CSS animation stop. The registered ThreeUI renderer is intentionally retained without source edits so its authored behavior and checksums remain intact; content never depends on that motion.

## Accessibility and performance contract

- Preserve one visible `h1`, semantic heading order, landmarks, skip link, and dialog labels.
- Maintain visible keyboard focus and 44px targets where space permits.
- Keep all critical copy outside the canvas and never convey status with color alone.
- Treat the CRT and GSAP as enhancements; never gate navigation or evidence behind animation.
- Preserve the renderer's DPR/backing-size caps, visibility pause, and disposal lifecycle.
- Verify English, Vietnamese, both themes, desktop, mobile, keyboard navigation, and WebGL failure behavior.
