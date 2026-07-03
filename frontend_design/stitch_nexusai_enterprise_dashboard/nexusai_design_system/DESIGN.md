---
name: NexusAI Design System
colors:
  surface: '#121414'
  surface-dim: '#121414'
  surface-bright: '#38393a'
  surface-container-lowest: '#0c0f0f'
  surface-container-low: '#1a1c1c'
  surface-container: '#1e2020'
  surface-container-high: '#282a2b'
  surface-container-highest: '#333535'
  on-surface: '#e2e2e2'
  on-surface-variant: '#c7c4d7'
  inverse-surface: '#e2e2e2'
  inverse-on-surface: '#2f3131'
  outline: '#908fa0'
  outline-variant: '#464554'
  surface-tint: '#c0c1ff'
  primary: '#c0c1ff'
  on-primary: '#1000a9'
  primary-container: '#8083ff'
  on-primary-container: '#0d0096'
  inverse-primary: '#494bd6'
  secondary: '#ddb7ff'
  on-secondary: '#490080'
  secondary-container: '#6f00be'
  on-secondary-container: '#d6a9ff'
  tertiary: '#4cd7f6'
  on-tertiary: '#003640'
  tertiary-container: '#009eb9'
  on-tertiary-container: '#002f38'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#e1e0ff'
  primary-fixed-dim: '#c0c1ff'
  on-primary-fixed: '#07006c'
  on-primary-fixed-variant: '#2f2ebe'
  secondary-fixed: '#f0dbff'
  secondary-fixed-dim: '#ddb7ff'
  on-secondary-fixed: '#2c0051'
  on-secondary-fixed-variant: '#6900b3'
  tertiary-fixed: '#acedff'
  tertiary-fixed-dim: '#4cd7f6'
  on-tertiary-fixed: '#001f26'
  on-tertiary-fixed-variant: '#004e5c'
  background: '#121414'
  on-background: '#e2e2e2'
  surface-variant: '#333535'
typography:
  display-lg:
    fontFamily: Geist
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.04em
  display-lg-mobile:
    fontFamily: Geist
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Geist
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.02em
  body-base:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
    letterSpacing: 0em
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
    letterSpacing: 0em
  code-sm:
    fontFamily: JetBrains Mono
    fontSize: 13px
    fontWeight: '450'
    lineHeight: 18px
    letterSpacing: 0em
  label-caps:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 4px
  gutter: 24px
  margin-desktop: 48px
  margin-mobile: 16px
  container-max: 1440px
---

## Brand & Style
The design system is engineered for a high-performance enterprise AI discovery platform. The brand personality is **precise, authoritative, and visionary**, catering to technical stakeholders who require clarity amidst complex data.

The style is a synthesis of **High-End Minimalism** and **Technical Glassmorphism**. It leverages the "YC aesthetic"—deep blacks, micro-interactions, and high-contrast typography—to communicate premium quality. The UI feels like a high-end physical instrument: weighted, responsive, and meticulously crafted. 

Key visual principles:
- **Optical Precision:** Every element sits on a strict 4px grid.
- **Luminous Accents:** Use vibrant gradients sparingly to signify AI activity or high-value data points.
- **Intentional Negative Space:** Generous margins to prevent cognitive overload during complex verification tasks.

## Colors
The palette is rooted in a deep "Ink Black" foundation to maximize contrast and reduce eye strain during long verification sessions.

- **Foundational Neutrals:** We use a tiered grayscale (Zinc/Slate) to create architectural depth. The background is pure `#09090B`, while interactive surfaces use `#111113`.
- **AI Accents:** Electric Blue and Purple are reserved for "Primary Action" states and "AI Insight" indicators. Cyan is used for "Active Processing" or "Streaming" data.
- **Semantic Clarity:** Success, Warning, and Danger colors use high-vibrancy tokens to ensure immediate recognition against the dark backdrop.

## Typography
The typography system balances editorial impact with technical legibility.

- **Geist (Headlines):** Used for all display and heading levels. Its geometric precision conveys a modern, developer-centric feel.
- **Inter (Body):** The workhorse for all UI text, property lists, and descriptions. It provides exceptional readability at small scales.
- **JetBrains Mono (Technical):** Dedicated to execution logs, match scores, and raw data outputs. This monospaced font signals "verification" and "accuracy."

**Scale Rules:**
- Use `display-lg` only for hero sections or primary dashboard metrics.
- All body text should adhere to a 1.5x line-height ratio for optimal scanning.

## Layout & Spacing
The design system utilizes a **12-column fluid grid** for internal dashboard views and a **fixed-center grid** for marketing or landing pages.

- **Rhythm:** All spacing (padding, margins, gaps) must be a multiple of the 4px base unit.
- **Desktop:** 24px gutters with 48px outer margins. Use `max-w-7xl` for standard content containers.
- **Tablet:** 16px gutters with 32px margins. 
- **Mobile:** 16px gutters and margins. Content typically collapses to a single column, with execution timelines transforming into vertical step-indicators.

Layouts should prioritize "Top-Down" hierarchy, where global navigation is consistently positioned on the left (collapsed) or top (standard).

## Elevation & Depth
Depth is created through **Tonal Layering** and **Subtle Glassmorphism** rather than traditional heavy shadows.

- **Level 0 (Base):** `#09090B` - The canvas.
- **Level 1 (Card):** `#18181B` - Primary containers. Includes a 1px border of `#27272A` (Zinc-800).
- **Level 2 (Popovers/Modals):** `#111113` with a `backdrop-filter: blur(12px)`. This creates the "Glass" effect essential for the premium feel.
- **Shadows:** Use a single, highly-diffused ambient shadow for elevated elements: `0 20px 40px -12px rgba(0,0,0,0.5)`.
- **Glows:** "AI-native" elements may use a subtle outer glow (bloom) matching the accent color (e.g., `drop-shadow(0 0 8px rgba(99, 102, 241, 0.3))`).

## Shapes
The shape language is sophisticated and modern. 

- **Standard Elements:** Buttons, inputs, and small widgets use `rounded-xl` (12px).
- **Main Containers:** Large cards, dashboard sections, and modals use `rounded-2xl` (16px).
- **Neo-Brutalist Accents:** Badges and specialized "Status" cards use a smaller `rounded-md` (6px) with a 2px solid border to create a "technical" high-contrast look.

## Components
Consistent implementation of these components ensures the "NexusAI" identity remains cohesive.

- **Buttons:** 
  - *Primary:* Gradient background (Electric Blue to Purple), white text, `rounded-xl`.
  - *Secondary:* Ghost style with 1px border, subtle hover fill.
- **Execution Timelines:** Vertical or horizontal tracks using `code-sm` typography. Status nodes pulse when active.
- **Match Score Radial:** A circular gauge using a 4px stroke. Use the Cyan accent for high scores and Amber for low-confidence results.
- **Validation Checklists:** High-contrast list items. Completed items use a subtle strike-through with an Emerald checkmark; pending items use a dashed border.
- **Neo-Brutalist Cards:** Featured AI models or "Verified" tools should use a `#18181B` background with a thick 2px border in a muted accent color.
- **Input Fields:** Darker than the card surface (`#09090B`), with a 1px Zinc-800 border that glows Primary Blue on focus.