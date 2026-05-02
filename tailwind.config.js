/** @type {import('tailwindcss').Config} */

// ─────────────────────────────────────────────────────────────────────────────
// SINGER (SRI LANKA) PLC — OFFICIAL TAILWIND THEME
// Source: Singer (Sri Lanka) PLC Interim Financial Report, Q3 FY2025/26
// Brand identity extracted directly from the PDF corporate identity
// This file is the SINGLE SOURCE OF TRUTH for all colors, typography,
// spacing, and design tokens. Never hardcode values in components.
// ─────────────────────────────────────────────────────────────────────────────

module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],

  theme: {
    extend: {

      colors: {
        singer: {
          50:  '#FFF1F1',
          100: '#FFD6D6',
          200: '#FFB3B3',
          300: '#FF7E7E',
          400: '#FF4C4C',
          500: '#E8000F',
          600: '#CC0000',
          700: '#A80000',
          800: '#8A0000',
          900: '#5C0000',
          950: '#3D0000',
        },

        surface: {
          page:     '#0D0F14',
          card:     '#141720',
          elevated: '#1C2033',
          sidebar:  '#0F1119',
          overlay:  '#252A3D',
          border:   'rgba(255, 255, 255, 0.07)',
          borderHover: 'rgba(204, 0, 0, 0.35)',
          borderFocus: 'rgba(204, 0, 0, 0.60)',
        },

        text: {
          primary:   '#F1F5F9',
          secondary: '#94A3B8',
          muted:     '#6B7280',
          disabled:  '#374151',
          inverse:   '#0D0F14',
          onRed:     '#FFFFFF',
        },

        positive: {
          DEFAULT: '#22C55E',
          bg:      'rgba(34, 197, 94, 0.12)',
          border:  'rgba(34, 197, 94, 0.30)',
          text:    '#22C55E',
          dark:    '#16A34A',
        },

        negative: {
          DEFAULT: '#EF4444',
          bg:      'rgba(239, 68, 68, 0.12)',
          border:  'rgba(239, 68, 68, 0.30)',
          text:    '#EF4444',
          dark:    '#DC2626',
        },

        warning: {
          DEFAULT: '#F59E0B',
          bg:      'rgba(245, 158, 11, 0.12)',
          border:  'rgba(245, 158, 11, 0.30)',
          text:    '#F59E0B',
        },

        info: {
          DEFAULT: '#4F8EF7',
          bg:      'rgba(79, 142, 247, 0.12)',
          border:  'rgba(79, 142, 247, 0.30)',
          text:    '#4F8EF7',
          dark:    '#2D6EE0',
        },

        chart: {
          red:     '#CC0000',
          blue:    '#4F8EF7',
          green:   '#22C55E',
          amber:   '#F59E0B',
          purple:  '#A855F7',
          teal:    '#14B8A6',
          slate:   '#64748B',
          prev:    '#2D3A5C',
        },
      },

      fontFamily: {
        sans:   ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono:   ['JetBrains Mono', 'Fira Code', 'Consolas', 'monospace'],
        numeric: ['Inter', 'system-ui', 'sans-serif'],
      },

      fontSize: {
        'display':  ['32px', { lineHeight: '1.1',  letterSpacing: '-0.03em', fontWeight: '700' }],
        'metric':   ['28px', { lineHeight: '1.15', letterSpacing: '-0.025em', fontWeight: '700' }],
        'metric-sm':['22px', { lineHeight: '1.2',  letterSpacing: '-0.02em', fontWeight: '700' }],
        'heading':  ['18px', { lineHeight: '1.3',  letterSpacing: '-0.015em', fontWeight: '600' }],
        'subhead':  ['15px', { lineHeight: '1.4',  letterSpacing: '-0.01em', fontWeight: '500' }],
        'body':     ['14px', { lineHeight: '1.6',  letterSpacing: '0em',     fontWeight: '400' }],
        'small':    ['13px', { lineHeight: '1.5',  letterSpacing: '0em',     fontWeight: '400' }],
        'label':    ['11px', { lineHeight: '1.4',  letterSpacing: '0.07em',  fontWeight: '500' }],
        'micro':    ['10px', { lineHeight: '1.4',  letterSpacing: '0.05em',  fontWeight: '400' }],
      },

      fontWeight: {
        regular:    '400',
        medium:     '500',
        semibold:   '600',
        bold:       '700',
      },

      spacing: {
        'sidebar':     '220px',
        'header':      '56px',
        'card-pad':    '20px',
        'card-pad-lg': '24px',
        'section-gap': '24px',
        'card-gap':    '16px',
        'inner-gap':   '12px',
      },

      borderRadius: {
        'card':   '16px',
        'chip':   '8px',
        'btn':    '999px',
        'input':  '8px',
        'icon':   '10px',
      },

      boxShadow: {
        'none':        'none',
        'card':        'none',
        'focus-red':   '0 0 0 3px rgba(204, 0, 0, 0.35)',
        'focus-blue':  '0 0 0 3px rgba(79, 142, 247, 0.35)',
        'glow-red':    '0 0 16px rgba(204, 0, 0, 0.20)',
        'tooltip':     '0 4px 12px rgba(0, 0, 0, 0.40)',
      },

      transitionDuration: {
        'fast':   '150ms',
        'base':   '200ms',
        'slow':   '300ms',
      },

      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },

      backgroundImage: {
        'singer-gradient': 'linear-gradient(135deg, #E8000F 0%, #CC0000 50%, #8A0000 100%)',
        'card-gradient':   'linear-gradient(180deg, #1C2033 0%, #141720 100%)',
        'none':            'none',
      },

      keyframes: {
        'fade-in': {
          '0%':   { opacity: '0', transform: 'translateY(4px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'badge-pop': {
          '0%':   { transform: 'scale(0.85)', opacity: '0' },
          '100%': { transform: 'scale(1)',    opacity: '1' },
        },
      },
      animation: {
        'fade-in':   'fade-in 200ms ease-out',
        'badge-pop': 'badge-pop 150ms ease-out',
      },

      zIndex: {
        'sidebar':  '40',
        'header':   '50',
        'tooltip':  '60',
        'modal':    '70',
        'toast':    '80',
      },

    },
  },

  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.tabular-nums': {
          'font-variant-numeric': 'tabular-nums',
          'font-feature-settings': '"tnum"',
        },
        '.lining-nums': {
          'font-variant-numeric': 'lining-nums',
        },
        '.slashed-zero': {
          'font-variant-numeric': 'slashed-zero',
        },
        '.singer-card': {
          'background':     '#141720',
          'border':         '1px solid rgba(255, 255, 255, 0.07)',
          'border-radius':  '16px',
          'padding':        '20px 24px',
          'transition':     'border-color 200ms ease, background 200ms ease',
        },
        '.singer-card:hover': {
          'border-color':  'rgba(204, 0, 0, 0.35)',
          'background':    '#1C2033',
        },
        '.badge-positive': {
          'background':    'rgba(34, 197, 94, 0.12)',
          'color':         '#22C55E',
          'border':        '1px solid rgba(34, 197, 94, 0.30)',
          'border-radius': '6px',
          'padding':       '2px 8px',
          'font-size':     '11px',
          'font-weight':   '500',
        },
        '.badge-negative': {
          'background':    'rgba(239, 68, 68, 0.12)',
          'color':         '#EF4444',
          'border':        '1px solid rgba(239, 68, 68, 0.30)',
          'border-radius': '6px',
          'padding':       '2px 8px',
          'font-size':     '11px',
          'font-weight':   '500',
        },
        '.badge-brand': {
          'background':    'rgba(204, 0, 0, 0.15)',
          'color':         '#FF4C4C',
          'border':        '1px solid rgba(204, 0, 0, 0.35)',
          'border-radius': '6px',
          'padding':       '2px 8px',
          'font-size':     '11px',
          'font-weight':   '500',
        },
        '.toggle-active': {
          'background':    '#CC0000',
          'color':         '#FFFFFF',
          'border-color':  '#CC0000',
        },
        '.toggle-inactive': {
          'background':    'transparent',
          'color':         '#94A3B8',
          'border':        '1px solid rgba(255, 255, 255, 0.12)',
        },
      });
    },
  ],
};
