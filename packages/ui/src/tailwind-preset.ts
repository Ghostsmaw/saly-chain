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
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.96) translateY(-4px)' },
          '100%': { opacity: '1', transform: 'scale(1) translateY(0)' },
        },
        floatOrb: {
          '0%, 100%': { transform: 'translate3d(0, 0, 0) scale(1)' },
          '33%': { transform: 'translate3d(30px, -24px, 0) scale(1.06)' },
          '66%': { transform: 'translate3d(-20px, 18px, 0) scale(0.97)' },
        },
      },
      animation: {
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        shimmer: 'shimmer 2s linear infinite',
        'fade-in-up': 'fadeInUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) both',
        'scale-in': 'scaleIn 0.18s cubic-bezier(0.16, 1, 0.3, 1) both',
        'float-slow': 'floatOrb 18s ease-in-out infinite',
        'float-slower': 'floatOrb 26s ease-in-out infinite reverse',
      },
    },
  },
  plugins: [],
} satisfies Partial<Config>;

export default preset;
