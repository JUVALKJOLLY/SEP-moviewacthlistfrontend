// Sneat Design System - Color Palette, Typography, Shadows
export const sneatTheme = {
  // Colors
  colors: {
    primary: '#5a8ef5',
    primaryDark: '#3451d4',
    secondary: '#52f7a9',
    success: '#22c55e',
    danger: '#ef4444',
    warning: '#eab308',
    info: '#0ea5e9',
    
    // Backgrounds
    bgPrimary: '#0f1419',      // Main background
    bgSecondary: '#1a1e27',    // Card/component background
    bgTertiary: '#252a34',     // Elevated surface
    
    // Text
    textPrimary: '#e5e7eb',    // Main text
    textSecondary: '#9ca3af',  // Secondary text
    textTertiary: '#6b7280',   // Disabled text
    
    // Borders
    borderLight: '#374151',    // Subtle border
    borderMedium: '#4b5563',   // Standard border
    borderDark: '#6b7280',     // Strong border
  },

  // Typography
  typography: {
    // Font families
    fontSans: ['Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'sans-serif'],
    
    // Font sizes (with line heights)
    fontSize: {
      xs: { size: '12px', lineHeight: '16px', weight: 400 },
      sm: { size: '14px', lineHeight: '20px', weight: 400 },
      base: { size: '16px', lineHeight: '24px', weight: 400 },
      lg: { size: '18px', lineHeight: '28px', weight: 500 },
      xl: { size: '20px', lineHeight: '28px', weight: 600 },
      '2xl': { size: '24px', lineHeight: '32px', weight: 700 },
      '3xl': { size: '30px', lineHeight: '36px', weight: 700 },
      '4xl': { size: '36px', lineHeight: '40px', weight: 700 },
    },

    // Font weights
    fontWeight: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
    },
  },

  // Shadows
  shadows: {
    sm: '0 1px 3px rgba(0, 0, 0, 0.1)',
    md: '0 4px 6px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 25px rgba(0, 0, 0, 0.15)',
    '2xl': '0 25px 50px rgba(0, 0, 0, 0.25)',
    inner: 'inset 0 2px 4px rgba(0, 0, 0, 0.1)',
  },

  // Spacing scale
  spacing: {
    0: '0',
    1: '4px',
    2: '8px',
    3: '12px',
    4: '16px',
    5: '20px',
    6: '24px',
    8: '32px',
    10: '40px',
    12: '48px',
    16: '64px',
    20: '80px',
    24: '96px',
  },

  // Border radius
  borderRadius: {
    none: '0',
    sm: '4px',
    md: '6px',
    lg: '8px',
    xl: '12px',
    '2xl': '16px',
    full: '9999px',
  },

  // Breakpoints
  breakpoints: {
    xs: '0px',
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },

  // Transition durations
  transitions: {
    fast: '150ms',
    base: '250ms',
    slow: '350ms',
  },

  // CSS Classes for common patterns
  css: {
    card: 'bg-dark-800 border border-dark-700 rounded-lg shadow-sneat-dark',
    input: 'bg-dark-900 border border-dark-700 text-textPrimary placeholder-textTertiary rounded-md focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20',
    button: 'inline-flex items-center justify-center font-medium rounded-md transition-colors',
    buttonPrimary: 'bg-primary-600 text-white hover:bg-primary-700 active:bg-primary-800',
    buttonSecondary: 'bg-dark-800 text-textPrimary border border-dark-700 hover:bg-dark-700 active:bg-dark-600',
    label: 'text-sm font-medium text-textPrimary',
    badge: 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
  },
};

export default sneatTheme;
