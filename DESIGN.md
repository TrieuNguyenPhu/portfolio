---
name: Working Systems
description: An editorial DevOps portfolio built around ThreeUI's authored Working Volumes bookshelf.
primary: "#c87046"
paper: "#f1eadf"
night: "#171a24"
walnut: "#3a2118"
heading: "Iowan Old Style"
body: "Inter"
---

# Design System: Working Systems

## Direction

The product is framed as a small technical press. Projects, experience, tools, and education are seven working volumes rather than a dashboard of cards. The exact ThreeUI shelf is the front door; the profile is the readable catalog.

## Source contract

`CompleteShelfLandingPage` is used with the requested Iowan Old Style heading, Inter body, 400 weights, copper `#c87046`, 60px heading scale, 12px body scale, and `-0.055em` heading tracking. The registered component source, canonical HTML, and shared stylesheet are stored byte-for-byte. The canonical document continues to own its Three.js r165 scene, book geometry, CanvasTexture artwork, shelf lighting, pointer/keyboard navigation, book-opening interaction, page navigation, responsive CSS, reduced-motion behavior, and static fallback.

The exact component is imported from the published ThreeUI package so its internal dependencies (`pageTypography`, `pageRecipes`, and framing helpers) stay on the supported package boundary. The registered `LandingPages.tsx` remains in the repository for checksum and source traceability and is excluded from direct application compilation because the public registry intentionally supplies only the required file, not its private catalog siblings.

## Palette

The canonical dark paper `#171a24`, pale paper `#f1eadf`, walnut `#3a2118`, deep walnut `#1c0e0a`, warm ink `#f4eee6`, and copper `#c87046` define the whole project. Individual portfolio volumes reuse the authored seven-book palette to connect the readable profile to the interactive shelf.

## Typography and layout

Iowan Old Style (with Baskerville and Times fallbacks) carries names and editorial headings. Inter carries labels, dates, evidence, navigation, and metadata. The profile uses a twelve-column editorial field, intentionally large serif titles, fine rules, asymmetric text blocks, and generous page-like margins.

At mobile widths, the 3D entry retains the authored responsive document inside its frame. The profile collapses to a single reading column, places each book cover before its evidence, preserves large but bounded typography, and keeps direct résumé/contact actions visible.

## Interaction

The canonical frame supports wheel, arrow, tab, pointer, drag, orbit, book opening, page turning, and close/reset actions. Application-level interaction is deliberately quiet: copper link changes, shallow book-cover rotation, and sticky editorial navigation. Reduced-motion removes outer transforms and lets the exact canonical document apply its own authored reduced-motion path.

## Accessibility and fallback

The profile is semantic HTML and never depends on WebGL. The canonical page provides an accessible static seven-book catalog when WebGL initialization fails, labeled dialogs and buttons, keyboard navigation, focus states, live-region updates, and coarse-pointer/reduced-motion branches. The frame remains same-origin so the package can apply configured typography and colour safely.
