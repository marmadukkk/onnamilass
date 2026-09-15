export const theme = {
  colors: {
    bg: '#07060c',
    bgRaised: '#110e18',
    ink: '#f4eef8',
    muted: '#a89bb8',
    wisteria: '#c4a5e8',
    wisteriaDeep: '#8b5cf6',
    purple: '#7c3aed',
    purpleGlow: '#b388ff',
    line: '#2a2438',
    black: '#05040a',
    white: '#fbf8ff',
  },
  space: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.75rem',
    xl: '2.75rem',
    xxl: '5rem',
  },
  fonts: {
    display: '"Cormorant Garamond", "Times New Roman", serif',
    jp: '"Shippori Mincho", "Noto Serif JP", serif',
    body: '"Zen Kaku Gothic New", "Segoe UI", sans-serif',
  },
  fontSizes: {
    xs: '0.72rem',
    sm: '0.875rem',
    md: '1rem',
    lg: '1.25rem',
    xl: '1.85rem',
    xxl: '3.2rem',
    hero: 'clamp(3.2rem, 8vw, 6.4rem)',
  },
  radii: {
    sm: '2px',
    md: '8px',
    lg: '18px',
    pill: '999px',
  },
  media: {
    phone: '@media (max-width: 640px)',
    tablet: '@media (max-width: 980px)',
    desktop: '@media (min-width: 981px)',
  },
  z: {
    petals: 2,
    content: 3,
    nav: 20,
    grain: 40,
  },
} as const

export type AppTheme = typeof theme
