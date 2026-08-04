---
name: Nguyen Phu Trieu Portfolio
description: An infrastructure change-set folio for verified DevOps work.
colors:
  paper: "#090c18"
  sheet: "#101525"
  sheet-soft: "#171d30"
  ink: "#f7f8ff"
  muted: "#aeb7cc"
  rule: "#2b354e"
  blue: "#5a42ff"
  cyan: "#00c4cc"
  violet: "#7d2ae8"
  accent-ink: "#ffffff"
  manifest: "linear-gradient(135deg, #00c4cc 0%, #5a42ff 52%, #7d2ae8 100%)"
  soft-accent: "rgb(87 215 255 / 10%)"
  nav-bg: "rgb(9 12 24 / 94%)"
  light-paper: "#f3f4f7"
  light-sheet: "#fffefa"
  light-sheet-soft: "#e8ebf3"
  light-ink: "#11131b"
  light-muted: "#555f72"
  light-rule: "#c9ced9"
  light-blue: "#5a42ff"
  light-cyan: "#008f96"
  light-violet: "#7d2ae8"
  light-manifest: "linear-gradient(135deg, #00c4cc 0%, #5a42ff 52%, #7d2ae8 100%)"
  light-soft-accent: "rgb(23 63 212 / 7%)"
  light-nav-bg: "rgb(243 244 247 / 95%)"
typography:
  display-xl:
    fontFamily: "var(--font-be-vietnam-pro), sans-serif"
    fontSize: "clamp(2.75rem, 5.2vw, 5.4rem)"
    fontWeight: 800
    lineHeight: 0.99
    letterSpacing: "-0.04em"
  display-lg:
    fontFamily: "var(--font-be-vietnam-pro), sans-serif"
    fontSize: "clamp(2.25rem, 4vw, 4.15rem)"
    fontWeight: 800
    lineHeight: 1.03
    letterSpacing: "-0.04em"
  display-md:
    fontFamily: "var(--font-be-vietnam-pro), sans-serif"
    fontSize: "clamp(1.85rem, 2.8vw, 3rem)"
    fontWeight: 700
    lineHeight: 1.08
    letterSpacing: "-0.04em"
  display-sm:
    fontFamily: "var(--font-be-vietnam-pro), sans-serif"
    fontSize: "clamp(1.45rem, 2vw, 2.1rem)"
    fontWeight: 800
    letterSpacing: "-0.03em"
  body:
    fontFamily: "var(--font-be-vietnam-pro), sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.75
    letterSpacing: "normal"
  small:
    fontFamily: "var(--font-be-vietnam-pro), sans-serif"
    fontSize: "0.9rem"
    fontWeight: 700
    letterSpacing: "normal"
  meta:
    fontFamily: "var(--font-be-vietnam-pro), sans-serif"
    fontSize: "0.78rem"
    fontWeight: 700
    letterSpacing: "0.06em"
rounded:
  square: "0"
components:
  button-primary:
    backgroundColor: "{colors.manifest}"
    textColor: "{colors.accent-ink}"
    typography: "{typography.small}"
    rounded: "{rounded.square}"
    padding: "0 1.2rem"
  button-ghost:
    backgroundColor: "{colors.sheet}"
    textColor: "{colors.ink}"
    typography: "{typography.small}"
    rounded: "{rounded.square}"
    padding: "0 1.2rem"
  control-square:
    backgroundColor: "transparent"
    textColor: "{colors.muted}"
    rounded: "{rounded.square}"
    size: "2.75rem"
  tag:
    backgroundColor: "transparent"
    textColor: "{colors.muted}"
    typography: "{typography.meta}"
    rounded: "{rounded.square}"
    padding: "0.38rem 0.55rem"
  manifest-sheet:
    backgroundColor: "{colors.manifest}"
    textColor: "{colors.accent-ink}"
    rounded: "{rounded.square}"
    padding: "clamp(1.6rem, 3vw, 2.4rem)"
  editorial-row:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.square}"
    padding: "clamp(2rem, 4vw, 3.4rem) 0"
---

# Design System: Nguyen Phu Trieu Portfolio

## Overview

**Creative North Star: "Infrastructure Change-Set Folio"**

The portfolio behaves like a precise technical folio: cool paper fields, registration rules, clipped deployment sheets, and evidence arranged for fast inspection. It is editorial rather than dashboard-like, giving recruiters and technical reviewers a clear path from career statement to verified experience, projects, writing, repositories, and contact.

The system is dense but calm. Be Vietnam Pro carries every role, including Vietnamese copy, while strong weight contrast and restrained blue-to-ultraviolet fields create hierarchy. Dark and light themes preserve the same document logic; neither becomes a neon control panel or a generic card grid.

**Key Characteristics:**

- Infrastructure evidence presented as an editorial change-set.
- Cool paper and ink surfaces in paired dark and light themes.
- Cobalt-to-ultraviolet manifest fields used as structural emphasis.
- Square controls, clipped sheets, fine rules, and numbered rows.
- Bilingual typography with compact metadata and oversized headlines.
- Motion is limited to scroll-triggered content reveals and hover feedback; add `data-reveal` plus an optional `data-reveal-delay` to scale it to new semantic blocks.

## Colors

The palette pairs quiet cool neutrals with a Canva-inspired cyan-to-blue-to-purple signal. The manifest gradient identifies focal sheets, primary actions, and major page titles without turning ordinary content into decoration.

### Primary

- **Deployment Blue** (`blue`, `light-blue`): Career emphasis, numbered indices, dates, active rules, and link feedback.
- **Manifest Field** (`manifest`, `light-manifest`): Primary actions, deployment-profile and education sheets, the brand marker, and page-level display titles.

### Secondary

- **Inspection Cyan** (`cyan`, `light-cyan`): High-visibility keyboard focus and the subtle page registration field.
- **Ultraviolet Endpoint** (`violet`, `light-violet`): The terminal color inside the manifest gradient, not a standalone decorative accent.

### Neutral

- **Night Paper / Cool Paper** (`paper`, `light-paper`): Page canvas and theme color.
- **Folio Sheet / Warm Sheet** (`sheet`, `light-sheet`): Secondary surfaces, ghost actions, and ticker fields.
- **Stacked Sheet** (`sheet-soft`, `light-sheet-soft`): Offset backing layers behind clipped documents.
- **Paper Ink / Carbon Ink** (`ink`, `light-ink`): Primary text and selected-control contrast.
- **Muted Annotation** (`muted`, `light-muted`): Supporting copy, dates, navigation, and inactive controls.
- **Registration Rule** (`rule`, `light-rule`): Dividers, outlines, and sheet construction lines.
- **Accent Ink** (`accent-ink`): Text on manifest fields in both themes.
- **Soft Inspection Field** (`soft-accent`, `light-soft-accent`): Sparse hover and background registration tint.
- **Navigation Veil** (`nav-bg`, `light-nav-bg`): Nearly opaque sticky-header backing.

**The Manifest Rarity Rule.** Use the cyan-to-purple field for a primary action, a document-like focal sheet, or one page-level display title—never for routine body copy or every card heading.

**The Theme Equivalence Rule.** Theme switching changes material values, not hierarchy, component geometry, or information order.

## Typography

**Display Font:** Be Vietnam Pro (with sans-serif fallback)  
**Body Font:** Be Vietnam Pro (with sans-serif fallback)  
**Label/Meta Font:** Be Vietnam Pro (with sans-serif fallback)

**Character:** A single Vietnamese-capable grotesk keeps the folio technically direct. Hierarchy comes from weight, scale, line-height, and tracking rather than a decorative font pairing.

### Hierarchy

- **Display XL** (`display-xl`): The home-page career statement; tightly tracked, compact, and limited to roughly 12 characters per line.
- **Display LG** (`display-lg`): Major section and footer statements, usually capped near 15–18 characters per line.
- **Display MD** (`display-md`): Strong panel summaries that compress supporting information into an editorial pull quote.
- **Display SM** (`display-sm`): Panel titles, organization names, and secondary headings.
- **Body** (`body`): Descriptions and evidence, generally held to 65–70 characters per line; article copy relaxes to a 1.9 line-height.
- **Small** (`small`): Text links and compact actions.
- **Meta** (`meta`): Dates, indices, categories, and technical labels; often uppercase with modest positive tracking.

**The One-Family Rule.** Keep all Latin and Vietnamese text in Be Vietnam Pro; do not introduce a display face that weakens bilingual continuity.

**The Evidence Hierarchy Rule.** Oversized type states the claim, normal-weight body text supplies evidence, and compact labels identify system metadata.

## Layout

The page uses a centered fluid folio width of `min(88rem, calc(100% - 2rem))`, expanding to a 4rem outer gutter from 42rem upward. The sticky header is full width and 4.5rem high; main content and footer internals share the same page measure. Section spacing scales with `clamp()` rather than a rigid spacing ladder.

Editorial evidence remains the core information pattern, but it is grouped into quiet sheet panels instead of long dividing rules. Experience, projects, and blog entries retain their narrow index or date column and flexible evidence column. At 64rem, project panels gain a third column for tags and repository actions; experience panels become date, role, and description columns. The hero becomes two columns at 56rem, and profile panels become an asymmetric 1.45-to-0.75 grid at 64rem.

Below 48rem, split editorial headers stack. Below 42rem, compact navigation keeps Blog and Projects visible while removing the long brand text; the 2rem page gutter contracts to 1rem. Below 29rem, the hero display tightens and long contact text may wrap. Horizontal skill tickers scroll without exposing a scrollbar.

**The Evidence Grouping Rule.** Keep each experience, project, and article entry self-contained in one quiet sheet; do not add decorative dividers between every datum.

**The Mobile Priority Rule.** Preserve primary destinations, language, theme, and repository access before decorative brand text.

## Elevation & Depth

The system has no box-shadow vocabulary. Depth is structural: one or two square backing sheets shift by 0.5rem and 1rem behind the clipped deployment profile, while borders, tonal surface changes, a restrained page field, and a near-opaque sticky-navigation veil separate planes.

**The Constructed Depth Rule.** Build depth with offset sheets, rules, clipping, and tonal layering; do not add soft card shadows or glass effects.

## Shapes

Corners are square (`square`) across actions, controls, tags, panels, rows, and social links. Signature manifest sheets introduce one clipped upper-right corner using a polygon cut—2rem on the deployment profile and 1.8rem on the education panel—then mark that cut with a fine corner rule. The small brand marker uses the same family of angular geometry.

Borders are precise one-pixel registration rules. Underlined text actions use one- or two-pixel rules rather than pills or filled capsules. The clipped corner is reserved for manifest-like focal sheets; ordinary containers remain rectangular.

**The No-Radius Rule.** Keep interactive and content containers square; do not round buttons, tags, controls, or panels.

**The Clipped-Manifest Rule.** Use the cut corner only on blue-violet document fields that carry concentrated identity or evidence.

## Components

### Buttons

- **Shape:** Square, ruled actions with a 3.1rem minimum height and compact horizontal padding.
- **Primary:** Manifest-gradient field with accent ink and a transparent border.
- **Ghost:** Folio-sheet background with a registration-rule border.
- **Hover / Focus:** Fine-pointer hover lifts either action by 2px; the ghost border becomes blue. Keyboard focus uses a 3px cyan outline offset by 4px. Reduced-motion mode removes transitions and arrival animation.

### Tags

- **Style:** Compact square labels with transparent fill, a one-pixel registration rule, muted metadata text, and tight inset padding.
- **State:** Tags identify a stack or subject; they do not behave like rounded filters or selectable chips.

### Cards / Containers

- **Corner Style:** Square by default; clipped only for manifest sheets.
- **Background:** Sheet tones for quiet panels and the manifest field for focal panels.
- **Shadow Strategy:** None; see Elevation & Depth.
- **Border:** One-pixel registration rules or ruled row edges.
- **Internal Padding:** Fluid panel padding; editorial rows use fluid vertical padding with no floating-card inset.

### Navigation

The 4.5rem sticky header uses a near-opaque paper veil and a bottom registration rule. Text links are muted at rest, become ink on hover or active state, and reveal a 3px manifest underline. Language selection is a square two-button segmented control; the selected language reverses to ink on paper. Theme and GitHub actions are 2.75rem square outlined controls.

### Manifest Sheets

The deployment profile and education panel are the signature components: cobalt-to-ultraviolet fields, white evidence text, a clipped upper-right corner, and ruled internal rows. The deployment profile gains two offset backing sheets; the education panel remains a single grounded block.

### Editorial Rows

Project and blog records begin with a two-digit blue index, then place title, metadata, description, tags, and actions on a ruled baseline. Experience records replace the index with a blue date. Rows remain full-width and flat so a reviewer can scan vertically without card-to-card visual noise.

## Do's and Don'ts

### Do:

- **Do** use Be Vietnam Pro for every language and typographic role.
- **Do** preserve square controls, clipped manifest sheets, and one-pixel registration rules.
- **Do** keep project, experience, and blog content in flat editorial rows.
- **Do** reserve manifest gradients and blue emphasis for primary actions, focal sheets, indices, and state feedback.
- **Do** keep visible cyan keyboard focus and remove nonessential motion under `prefers-reduced-motion: reduce`.
- **Do** collapse grids and brand text at the established mobile breakpoints while preserving core navigation and controls.

### Don't:

- **Don't** turn the portfolio into a dark neon DevOps dashboard.
- **Don't** introduce rounded cards, pills, soft drop shadows, glassmorphism, or floating card grids.
- **Don't** apply the manifest gradient to every heading or decorative surface.
- **Don't** add ornamental motion beyond purposeful arrival and fine-pointer state feedback.
- **Don't** hide language, theme, project, blog, or repository access to protect decorative space.
