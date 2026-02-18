/**
 * LEXGRO Design Tokens
 * Extracted from Framer site analysis - January 2026
 *
 * These tokens define the visual language of the Lexgro brand.
 * Use these constants throughout the application for consistency.
 */

// =============================================================================
// COLOR PALETTE
// =============================================================================

export const colors = {
  // Primary Brand Colors (Green System)
  primary: {
    green: '#298C42',        // Main brand green (75 occurrences in Framer)
    greenDark: '#1F8238',    // Darker variant for hover/active states
    greenLight: '#3DA056',   // Lighter variant
    teal: '#1AA774',         // Secondary green (54 occurrences)
    mint: '#25B97B',         // Tertiary accent green
    forest: '#001706',       // Deep forest green
    darkTeal: '#005128',     // Dark teal accent
  },

  // Accent Colors
  accent: {
    orange: '#FF8158',       // Primary accent (8 occurrences) - CTAs, highlights
    orangeWarm: '#FFBC00',   // Warning/attention yellow-orange
    purple: '#673AE4',       // Purple accent
    purpleLight: '#635CAD',  // Secondary purple
    magenta: '#C82DFF',      // Bright purple/magenta
    blue: '#75ACFF',         // Light blue accent
  },

  // Background Colors
  background: {
    dark: '#011907',         // Dark section backgrounds
    darkAlt: '#233B29',      // Alternative dark background
    light: '#C0E9CA',        // Light green tint (42 occurrences)
    lighter: '#D6FFE0',      // Very light green (23 occurrences)
    cream: '#FFF1E9',        // Warm cream background
    creamAlt: '#FFEFEC',     // Alternative cream
    white: '#FFFFFF',
    offWhite: '#F7F9FC',     // Off-white for subtle sections
    grayLight: '#F8F8F9',    // Very light gray
  },

  // Text Colors
  text: {
    dark: '#212121',         // Primary dark text (WCAG AAA on white)
    primary: '#212121',      // Standard text (22 occurrences)
    muted: '#4b5563',        // Muted/secondary text (neutral gray, WCAG AA)
    light: '#98B39F',        // Light text on dark backgrounds
    white: '#FFFFFF',
  },

  // UI Colors
  ui: {
    gray: '#D9D9D9',         // Borders, dividers
    grayLight: '#ABABAB',    // Light gray elements
    border: 'rgba(41, 140, 66, 0.1)',        // Default border
    borderLight: 'rgba(41, 140, 66, 0.05)',  // Subtle border
    borderMedium: 'rgba(41, 140, 66, 0.2)',  // More visible border
  },

  // Semantic Colors
  semantic: {
    success: '#298C42',      // Use primary green
    warning: '#FFBC00',
    error: '#FF8158',        // Use accent orange for now
    info: '#75ACFF',
  },

  // Gradient Stops (for SVG/CSS gradients)
  gradients: {
    greenStart: '#38BF5A',
    greenEnd: '#03ED3E',
    darkGreenStart: '#3DA056',
    darkGreenEnd: '#1F8238',
  },
} as const;

// =============================================================================
// TYPOGRAPHY
// =============================================================================

export const fonts = {
  primary: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  display: '"Inter Display", Inter, system-ui, sans-serif',
  mono: '"Fragment Mono", "SF Mono", Monaco, "Cascadia Code", monospace',
} as const;

export const fontSizes = {
  xs: '0.75rem',     // 12px
  sm: '0.875rem',    // 14px
  base: '1rem',      // 16px
  lg: '1.125rem',    // 18px
  xl: '1.375rem',    // 22px
  '2xl': '1.75rem',  // 28px
  '3xl': '2.25rem',  // 36px
  '4xl': '3rem',     // 48px
  '5xl': '3.75rem',  // 60px
  '6xl': '4.5rem',   // 72px
} as const;

export const fontWeights = {
  light: 400,
  normal: 500,
  medium: 600,
  bold: 700,
  extrabold: 800,
} as const;

export const lineHeights = {
  tight: 1.2,        // 120% - headings
  snug: 1.3,         // 130%
  normal: 1.45,      // 145% - body text
  relaxed: 1.6,      // 160%
  loose: 1.8,        // 180%
} as const;

export const letterSpacing = {
  tighter: '-0.05em',
  tight: '-0.025em',
  normal: '0',
  wide: '0.025em',
  wider: '0.05em',
  badge: '0.2em',           // Section badges specifically
} as const;

// =============================================================================
// SPACING & LAYOUT
// =============================================================================

export const layout = {
  maxWidth: '1440px',
  contentWidth: '1200px',
  narrowWidth: '800px',
} as const;

export const breakpoints = {
  mobile: '810px',
  tablet: '1200px',
  desktop: '1440px',
} as const;

export const spacing = {
  0: '0',
  1: '0.25rem',    // 4px
  2: '0.5rem',     // 8px
  3: '0.75rem',    // 12px
  4: '1rem',       // 16px
  5: '1.25rem',    // 20px
  6: '1.5rem',     // 24px
  8: '2rem',       // 32px
  10: '2.5rem',    // 40px
  12: '3rem',      // 48px
  16: '4rem',      // 64px
  20: '5rem',      // 80px
  24: '6rem',      // 96px
  32: '8rem',      // 128px
} as const;

// =============================================================================
// BORDERS & RADII
// =============================================================================

export const borderRadius = {
  none: '0',
  sm: '6px',
  md: '10px',
  lg: '14px',
  card: '16px',             // All card components (critical - never approximate)
  xl: '24px',
  '2xl': '32px',
  '3xl': '50px',
  pill: '100px',            // Section badges
  full: '9999px',
  statItem: '8px',          // Hero stat items
} as const;

export const borderWidth = {
  none: '0',
  thin: '1px',
  medium: '1.5px',
  thick: '2px',
} as const;

// =============================================================================
// SHADOWS
// =============================================================================

export const shadows = {
  // Soft shadow for cards and elevated elements
  soft: 'rgba(13, 18, 14, 0.05) 0px 4px 6px -1.8px, rgba(13, 18, 14, 0.06) 0px 9px 14px -2.7px',

  // Card shadow (matches DESIGN-SYSTEM.md - never approximate)
  card: '0 4px 24px rgba(0, 0, 0, 0.04)',

  // Card shadow with inset highlight
  cardElevated: 'rgba(37, 167, 119, 0.2) 0px 1px 3px 0px, rgba(55, 251, 179, 0.1) 0px 0px 0px 1px, rgba(55, 251, 179, 0.12) 0px -2.4px 0px 0px inset',

  // Deep shadow for modals/dropdowns
  deep: 'rgba(1, 44, 12, 0.06) 0px 3.15px 5.05px 0px, rgba(37, 167, 119, 0.2) 0px 1px 3px 0px, rgba(55, 251, 179, 0.1) 0px 0px 0px 1px',

  // Button shadow
  button: 'inset 0px 1px 0px 0px rgba(255, 255, 255, 0.25), 0px 4px 11px -5px rgba(26, 61, 35, 0.1)',

  // Input field shadow
  input: 'inset 0px 1.68px 1px 0px rgba(255, 255, 255, 0.1), inset 0px 1.68px 3px 0px rgba(255, 255, 255, 0.2)',

  // No shadow
  none: 'none',
} as const;

// =============================================================================
// EFFECTS
// =============================================================================

export const blur = {
  subtle: '7.5px',
  medium: '24px',
  heavy: '100px',
  extreme: '250px',
} as const;

export const opacity = {
  0: '0',
  5: '0.05',
  10: '0.1',
  20: '0.2',
  30: '0.3',
  50: '0.5',
  70: '0.7',
  80: '0.8',
  90: '0.9',
  100: '1',
} as const;

// =============================================================================
// TRANSITIONS
// =============================================================================

export const transitions = {
  fast: '150ms ease',
  normal: '250ms ease',
  slow: '350ms ease',
  slower: '500ms ease',
} as const;

// =============================================================================
// Z-INDEX
// =============================================================================

export const zIndex = {
  hide: -1,
  base: 0,
  dropdown: 100,
  sticky: 200,
  fixed: 300,
  modalBackdrop: 400,
  modal: 500,
  popover: 600,
  tooltip: 700,
  toast: 800,
} as const;

// =============================================================================
// TYPE EXPORTS
// =============================================================================

export type Colors = typeof colors;
export type Fonts = typeof fonts;
export type FontSizes = typeof fontSizes;
export type Shadows = typeof shadows;
export type Spacing = typeof spacing;
export type Breakpoints = typeof breakpoints;
