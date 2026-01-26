/**
 * LEXGRO Chakra UI v3 Theme Configuration
 *
 * This creates a custom Chakra system with Lexgro brand tokens.
 * Chakra UI v3 uses createSystem() to define the design system.
 */

import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react';
import { colors, fonts, fontSizes, fontWeights, lineHeights, borderRadius, shadows, spacing, breakpoints } from './tokens';

// Define the custom theme configuration
const lexgroConfig = defineConfig({
  theme: {
    tokens: {
      // Brand color palette
      colors: {
        // Primary green scale
        brand: {
          50: { value: colors.background.light },
          100: { value: colors.primary.mint },
          200: { value: colors.primary.teal },
          300: { value: colors.primary.greenLight },
          400: { value: colors.primary.green },
          500: { value: colors.primary.green },
          600: { value: colors.primary.greenDark },
          700: { value: colors.primary.darkTeal },
          800: { value: colors.background.dark },
          900: { value: colors.primary.forest },
        },

        // Accent colors
        accent: {
          orange: { value: colors.accent.orange },
          orangeWarm: { value: colors.accent.orangeWarm },
          purple: { value: colors.accent.purple },
          purpleLight: { value: colors.accent.purpleLight },
          magenta: { value: colors.accent.magenta },
          blue: { value: colors.accent.blue },
        },

        // Background colors
        bg: {
          dark: { value: colors.background.dark },
          darkAlt: { value: colors.background.darkAlt },
          light: { value: colors.background.light },
          lighter: { value: colors.background.lighter },
          cream: { value: colors.background.cream },
          white: { value: colors.background.white },
          offWhite: { value: colors.background.offWhite },
        },

        // Text colors
        text: {
          dark: { value: colors.text.dark },
          primary: { value: colors.text.primary },
          muted: { value: colors.text.muted },
          light: { value: colors.text.light },
          white: { value: colors.text.white },
        },
      },

      // Font families
      fonts: {
        heading: { value: fonts.display },
        body: { value: fonts.primary },
        mono: { value: fonts.mono },
      },

      // Font sizes
      fontSizes: {
        xs: { value: fontSizes.xs },
        sm: { value: fontSizes.sm },
        md: { value: fontSizes.base },
        lg: { value: fontSizes.lg },
        xl: { value: fontSizes.xl },
        '2xl': { value: fontSizes['2xl'] },
        '3xl': { value: fontSizes['3xl'] },
        '4xl': { value: fontSizes['4xl'] },
        '5xl': { value: fontSizes['5xl'] },
        '6xl': { value: fontSizes['6xl'] },
      },

      // Font weights
      fontWeights: {
        light: { value: fontWeights.light },
        normal: { value: fontWeights.normal },
        medium: { value: fontWeights.medium },
        bold: { value: fontWeights.bold },
        extrabold: { value: fontWeights.extrabold },
      },

      // Line heights
      lineHeights: {
        tight: { value: lineHeights.tight },
        snug: { value: lineHeights.snug },
        normal: { value: lineHeights.normal },
        relaxed: { value: lineHeights.relaxed },
        loose: { value: lineHeights.loose },
      },

      // Border radii
      radii: {
        none: { value: borderRadius.none },
        sm: { value: borderRadius.sm },
        md: { value: borderRadius.md },
        lg: { value: borderRadius.lg },
        xl: { value: borderRadius.xl },
        '2xl': { value: borderRadius['2xl'] },
        '3xl': { value: borderRadius['3xl'] },
        full: { value: borderRadius.full },
      },

      // Shadows
      shadows: {
        soft: { value: shadows.soft },
        card: { value: shadows.card },
        cardElevated: { value: shadows.cardElevated },
        deep: { value: shadows.deep },
        button: { value: shadows.button },
        input: { value: shadows.input },
      },

      // Spacing
      spacing: {
        0: { value: spacing[0] },
        1: { value: spacing[1] },
        2: { value: spacing[2] },
        3: { value: spacing[3] },
        4: { value: spacing[4] },
        5: { value: spacing[5] },
        6: { value: spacing[6] },
        8: { value: spacing[8] },
        10: { value: spacing[10] },
        12: { value: spacing[12] },
        16: { value: spacing[16] },
        20: { value: spacing[20] },
        24: { value: spacing[24] },
        32: { value: spacing[32] },
      },
    },

    // Semantic tokens for light/dark mode
    semanticTokens: {
      colors: {
        // Background semantic tokens
        'bg.canvas': {
          value: { _light: '{colors.bg.white}', _dark: '{colors.bg.dark}' },
        },
        'bg.subtle': {
          value: { _light: '{colors.bg.offWhite}', _dark: '{colors.bg.darkAlt}' },
        },
        'bg.muted': {
          value: { _light: '{colors.bg.light}', _dark: '{colors.bg.darkAlt}' },
        },

        // Text semantic tokens
        'fg.default': {
          value: { _light: '{colors.text.primary}', _dark: '{colors.text.white}' },
        },
        'fg.muted': {
          value: { _light: '{colors.text.muted}', _dark: '{colors.text.light}' },
        },
        'fg.subtle': {
          value: { _light: '{colors.text.muted}', _dark: '{colors.text.muted}' },
        },

        // Border semantic tokens
        'border.default': {
          value: { _light: 'rgba(41, 140, 66, 0.1)', _dark: 'rgba(255, 255, 255, 0.1)' },
        },
        'border.muted': {
          value: { _light: 'rgba(41, 140, 66, 0.05)', _dark: 'rgba(255, 255, 255, 0.05)' },
        },

        // Brand colors (same in both modes for consistency)
        'brand.solid': { value: '{colors.brand.500}' },
        'brand.contrast': { value: '{colors.bg.white}' },
        'brand.fg': { value: '{colors.brand.600}' },
        'brand.muted': { value: '{colors.brand.100}' },
        'brand.subtle': { value: '{colors.brand.50}' },

        // Accent colors
        'accent.solid': { value: '{colors.accent.orange}' },
        'accent.contrast': { value: '{colors.bg.white}' },
      },
    },
  },

  // Global CSS
  globalCss: {
    'html, body': {
      fontFamily: 'body',
      color: 'fg.default',
      bg: 'bg.canvas',
      lineHeight: 'normal',
      WebkitFontSmoothing: 'antialiased',
      MozOsxFontSmoothing: 'grayscale',
    },
    '*, *::before, *::after': {
      borderColor: 'border.default',
    },
    'a': {
      color: 'brand.solid',
      textDecoration: 'none',
      _hover: {
        textDecoration: 'underline',
      },
    },
    'h1, h2, h3, h4, h5, h6': {
      fontFamily: 'heading',
      fontWeight: 'bold',
      lineHeight: 'tight',
    },
  },
});

// Create and export the Chakra system
export const system = createSystem(defaultConfig, lexgroConfig);

// Export the config for reference
export { lexgroConfig };
