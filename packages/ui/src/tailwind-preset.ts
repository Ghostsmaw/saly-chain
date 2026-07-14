import type { Config } from 'tailwindcss';
import { colorTokens, fontTokens, radiusTokens, shadowTokens } from './tokens.js';

/**
 * Tailwind preset consumed by every SalyChain dashboard. Keeping all design
 * tokens in one place ensures the Admin, Business, and Developer surfaces
 * stay visually coherent.
 */
const preset = {
  content: [],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        background: colorTokens.background,
        surface: colorTokens.surface,
        text: colorTokens.text,
        brand: colorTokens.brand,
        accent: colorTokens.accent,
        success: colorTokens.success,
        warning: colorTokens.warning,
        danger: colorTokens.danger,
        info: colorTokens.info,
      },
      fontFamily: {
        sans: fontTokens.family.sans.split(','),
        mono: fontTokens.family.mono.split(','),
      },
      fontSize: {
        xs: fontTokens.size.xs,
        sm: fontTokens.size.sm,
        base: fontTokens.size.base,
        md: fontTokens.size.md,
        lg: fontTokens.size.lg,
        xl: fontTokens.size.xl,
        '2xl': fontTokens.size['2xl'],
        '3xl': fontTokens.size['3xl'],
        '4xl': fontTokens.size['4xl'],
      },
      borderRadius: {
        none: radiusTokens.none,
        sm: radiusTokens.sm,
        md: radiusTokens.md,
        lg: radiusTokens.lg,
        xl: radiusTokens.xl,
        '2xl': radiusTokens['2xl'],
        full: radiusTokens.full,
      },
      boxShadow: {
        soft: shadowTokens.sm,
        card: shadowTokens.md,
        floating: shadowTokens.lg,
        glow: shadowTokens.glow,
      },
      backgroundImage: {
        'brand-gradient':
          'linear-gradient(135deg, #6A35F0 0%, #8159FF 50%, #A082FF 100%)',
        'brand-subtle':
          'linear-gradient(180deg, rgba(106, 53, 240, 0.15) 0%, rgba(106, 53, 240, 0.0) 100%)',
        'chart-violet':
          'linear-gradient(180deg, rgba(129, 89, 255, 0.5) 0%, rgba(129, 89, 255, 0) 100%)',
        'chart-cyan':
          'linear-gradient(180deg, rgba(43, 201, 240, 0.45) 0%, rgba(43, 201, 240, 0) 100%)',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(106, 53, 240, 0.45)' },
          '50%': { boxShadow: '0 0 0 10px rgba(106, 53, 240, 0)' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
      animation: {
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        shimmer: 'shimmer 2s linear infinite',
      },
    },
  },
  plugins: [],
} satisfies Partial<Config>;

export default preset;
