import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        saly: {
          bg: {
            primary: 'var(--saly-bg-primary)',
            secondary: 'var(--saly-bg-secondary)',
            card: 'var(--saly-bg-card)',
            elevated: 'var(--saly-bg-elevated)',
            hover: 'var(--saly-bg-hover)',
          },
          border: 'var(--saly-border)',
          'border-strong': 'var(--saly-border-strong)',
          text: {
            primary: 'var(--saly-text-primary)',
            secondary: 'var(--saly-text-secondary)',
            muted: 'var(--saly-text-muted)',
            faint: 'var(--saly-text-faint)',
          },
          accent: {
            DEFAULT: 'var(--saly-accent)',
            muted: 'var(--saly-accent-muted)',
          },
          success: 'var(--saly-success)',
          warning: 'var(--saly-warning)',
          danger: 'var(--saly-danger)',
          info: 'var(--saly-info)',
        },
      },
      borderRadius: {
        saly: 'var(--saly-radius-md)',
        'saly-lg': 'var(--saly-radius-lg)',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['var(--saly-font-mono)'],
      },
      boxShadow: {
        saly: '0 1px 0 rgba(255,255,255,0.04) inset, 0 1px 2px rgba(0,0,0,0.4)',
        'saly-hover': '0 1px 0 rgba(255,255,255,0.06) inset, 0 8px 24px rgba(0,0,0,0.35)',
      },
      animation: {
        'pulse-subtle': 'pulse-subtle 2.5s ease-in-out infinite',
        'fade-in-up': 'fade-in-up 0.5s cubic-bezier(0.16, 1, 0.3, 1) both',
        'scale-in': 'scale-in 0.18s cubic-bezier(0.16, 1, 0.3, 1) both',
        'float-slow': 'float-orb 20s ease-in-out infinite',
      },
      keyframes: {
        'pulse-subtle': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.55' },
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.96) translateY(-4px)' },
          '100%': { opacity: '1', transform: 'scale(1) translateY(0)' },
        },
        'float-orb': {
          '0%, 100%': { transform: 'translate3d(0, 0, 0) scale(1)' },
          '50%': { transform: 'translate3d(24px, -20px, 0) scale(1.05)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
