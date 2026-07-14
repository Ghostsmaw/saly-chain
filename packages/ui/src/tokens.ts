/**
 * SalyChain design tokens — derived from the Super Admin mock.
 *
 * Tokens are the single source of truth. Tailwind preset, runtime CSS
 * variables, and any future native targets all read from this file.
 */

export const colorTokens = {
  // ───── Base canvas ─────
  background: {
    DEFAULT: '#0B0820',
    raised: '#100C2A',
    elevated: '#15103A',
    overlay: '#1B1547',
    inverse: '#FFFFFF',
  },

  // ───── Surfaces ─────
  surface: {
    card: '#120E2E',
    cardHover: '#19143A',
    sidebar: '#0E0A26',
    border: '#231B55',
    borderStrong: '#2E2473',
    divider: '#1A1442',
  },

  // ───── Text ─────
  text: {
    primary: '#F4F2FF',
    secondary: '#B8B2E8',
    tertiary: '#7A75A8',
    muted: '#544F7A',
    inverse: '#0B0820',
    onAccent: '#FFFFFF',
  },

  // ───── Brand — violet/purple ─────
  brand: {
    50: '#F2EEFF',
    100: '#E0D6FF',
    200: '#C2ADFF',
    300: '#A082FF',
    400: '#8159FF',
    500: '#6A35F0', // primary
    600: '#5827CF',
    700: '#451CA3',
    800: '#341578',
    900: '#240F55',
  },

  // ───── Accent — cyan/teal (chart highlights) ─────
  accent: {
    50: '#E6FBFF',
    100: '#BFF4FF',
    300: '#5EE0FF',
    500: '#2BC9F0',
    700: '#1488B0',
  },

  // ───── Semantic ─────
  success: {
    50: '#E6FBF1',
    300: '#5EE2A6',
    500: '#16C784',
    700: '#0E8C5C',
  },
  warning: {
    50: '#FFF6E0',
    300: '#FFCB59',
    500: '#F0A92B',
    700: '#A56F12',
  },
  danger: {
    50: '#FFEBEC',
    300: '#FF8088',
    500: '#F0444F',
    700: '#A8242D',
  },
  info: {
    50: '#E6F0FF',
    300: '#7AA8FF',
    500: '#3B7DFA',
    700: '#1E55B8',
  },
} as const;

export const radiusTokens = {
  none: '0px',
  sm: '6px',
  md: '10px',
  lg: '14px',
  xl: '18px',
  '2xl': '24px',
  full: '9999px',
} as const;

export const spacingTokens = {
  xs: '4px',
  sm: '8px',
  md: '12px',
  lg: '16px',
  xl: '24px',
  '2xl': '32px',
  '3xl': '48px',
} as const;

export const fontTokens = {
  family: {
    sans: 'Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
    mono: '"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, monospace',
  },
  size: {
    xs: '11px',
    sm: '12px',
    base: '14px',
    md: '15px',
    lg: '17px',
    xl: '20px',
    '2xl': '24px',
    '3xl': '30px',
    '4xl': '36px',
  },
  weight: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
} as const;

export const shadowTokens = {
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.3)',
  md: '0 4px 12px -2px rgb(0 0 0 / 0.4)',
  lg: '0 12px 32px -8px rgb(0 0 0 / 0.5)',
  glow: '0 0 0 1px rgb(106 53 240 / 0.4), 0 8px 32px -8px rgb(106 53 240 / 0.5)',
} as const;

export const gradientTokens = {
  brandPrimary:
    'linear-gradient(135deg, #6A35F0 0%, #8159FF 50%, #A082FF 100%)',
  brandSubtle:
    'linear-gradient(180deg, rgba(106, 53, 240, 0.15) 0%, rgba(106, 53, 240, 0.0) 100%)',
  chartViolet:
    'linear-gradient(180deg, rgba(129, 89, 255, 0.5) 0%, rgba(129, 89, 255, 0) 100%)',
  chartCyan:
    'linear-gradient(180deg, rgba(43, 201, 240, 0.45) 0%, rgba(43, 201, 240, 0) 100%)',
} as const;

export const tokens = {
  color: colorTokens,
  radius: radiusTokens,
  spacing: spacingTokens,
  font: fontTokens,
  shadow: shadowTokens,
  gradient: gradientTokens,
} as const;

export type Tokens = typeof tokens;
