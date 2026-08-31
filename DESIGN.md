---
name: Nguyen Phu Trieu Portfolio
description: A bilingual 3D cloud-orbit portfolio for verified DevOps work.
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

# Design System: Cloud Orbit Command

## Creative direction

The portfolio behaves like a cloud command environment: one cinematic WebGL object establishes the first impression, while precise registration lines, architecture routes, and project evidence support technical inspection. The composition draws from ThreeUI's orbital, signal-particle, rings, and orrery references without copying their layouts.

The canonical machine-readable extraction is in `design-dna.json`.

## Core principles

- **3D first, evidence always.** The hero earns attention; the rest of the page proves the engineering work.
- **One signal spectrum.** Cyan, blue, and violet identify routes, active states, and important actions.
- **Bilingual continuity.** Roboto supports English and Vietnamese without changing the visual voice.
- **Constructed depth.** Fine rules, clipped corners, technical sheets, WebGL space, and controlled perspective replace generic rounded cards.
- **Progressive enhancement.** Navigation, copy, and project evidence remain complete when WebGL or motion is unavailable.

## Visual DNA

Dark mode uses `#07090d` as the observation field and `#0d1119` for raised technical sheets. Light mode uses `#f4f7fb` and white sheets. The signal gradient runs from cyan `#22d3ee`, through blue `#2563eb`, to violet `#8b5cf6`.

Roboto is the only type family. Hero type is tightly tracked and editorial; body copy remains relaxed; labels use compact uppercase tracking. Corners stay square, borders are one-pixel registration rules, and system diagrams use orthogonal routes with restrained arcs and status points.

## Spatial system

Content uses a fluid maximum width of 88rem with responsive outer gutters. The home hero is a full-viewport composition: a shader-driven cloud core fills the right side while the career claim overlays the left. Below 62rem the object moves behind and below the copy. Below 48rem actions become full width and project/case-study layouts stack.

Primary thresholds are 70rem, 62rem, 48rem, and 32rem.

## Three.js scene

`app/ambient-three.tsx` provides the dedicated home-hero WebGL stage:

- shader-displaced icosahedral cloud core with Fresnel and scan-band lighting;
- surface particles, atmospheric dust, four technical orbits, and two energy tubes;
- moving AWS, Kubernetes, GitOps, and observability signal nodes;
- desktop bloom post-processing;
- pointer parallax, drag-to-orbit, node raycasting, and scroll-based camera response.

The renderer caps pixel ratio and particle density, lowers geometry on low-core devices, pauses outside the viewport, observes resize, and disposes every allocated resource. A failed WebGL context receives the CSS orbital fallback.

The scene is decorative and absent from the accessibility tree. DOM labels and a left-side vignette protect readable contrast while interaction remains optional.

## Motion system

The motion personality is **premium technical**: deliberate, precise, and without elastic overshoot. Quick feedback uses 350ms, standard transitions 500ms, and large spatial transitions 800ms.

`app/scroll-reveal.tsx` owns route-scoped GSAP behavior:

- hero words arrive by word, followed by supporting copy and proof;
- the desktop hero pins briefly while the core advances and HUD signals recede;
- project cards enter with shallow perspective and scrubbed visual parallax;
- architecture routes draw as they enter the viewport;
- the global progress line scrubs linearly;
- magnetic response is limited to primary buttons on fine pointers.

All animation is scoped and reverted on route changes.

### Reduced motion

When `prefers-reduced-motion: reduce` is active, the Three.js scene renders one static frame with no pointer, scroll, or continuous spatial motion. Reveal targets remain visible, SVG routes appear complete, magnetic movement is removed, and smooth scrolling is disabled.

## Accessibility and performance contract

- Preserve one visible `h1`, semantic heading order, landmarks, skip link, and dialog labels.
- Keep visible keyboard focus and 44px interaction targets where space allows.
- Do not convey status with color alone.
- Treat Three.js and GSAP as enhancements; never gate content behind motion.
- Cap renderer pixel ratio and scene complexity before adding visual effects.
- Pause WebGL when hidden or offscreen and dispose geometry, materials, post-processing, and renderer resources.
- Verify English, Vietnamese, light, dark, mobile, keyboard, WebGL fallback, and reduced-motion states.
