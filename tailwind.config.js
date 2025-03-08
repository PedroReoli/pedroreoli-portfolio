const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  darkMode: ['class'],
  content: ["./src/_root/pages/**/*.{ts,tsx}", "./src/components/**/*.{ts,tsx}", "./public/index.html", "*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        xxs: '1rem',
        xs: '1.5rem',
        sm: '2rem',
      },
      screens: {
        xxs: "320px",
        xs: "375px",
        sm: "425px",
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Suas cores personalizadas
        'primary-500': '#8C429D',
        'background-card-color': '#F1EEDD',
        'primary-600': '#FF5A5A',
        'secondary-500': '#FFB620',
        'off-white': '#D0DFFF',
        'red': '#FF5A5A',
        'dark-1': '#000000',
        'dark-2': '#FFFFFF',
        'dark-3': '#101012',
        'dark-4': '#ffff',
        'light-1': '#FFFFFF',
        'light-2': '#5C5C7B',
        'light-3': '#7878A3',
        'light-4': '#5C5C7B',
        'purple-1': '#8C429D',
        'red-500': '#ef4444',
        'green-500': '#22c55e',
        'purple-500': '#a855f7',
        'yellow-500': '#eab308',
        'pink-500': '#ec4899',
        // Cosmic theme colors
        'cosmic-bg': '#0A1120',
        'cosmic-card': '#0F172A',
        'cosmic-border': '#1E293B',
        'cosmic-text': '#94A3B8',
        'cosmic-accent': '#60A5FA',
        'cosmic-accent-hover': '#3B82F6',
        'cosmic-glow': 'rgba(96, 165, 250, 0.2)',
      },
      screens: {
        xxs: '320px',
        xs: '375px',
        sm: '425px',
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      width: {
        420: '420px',
        465: '465px',
      },
      fontSize: {
        xxs: '0.625rem', // 10px
        xs: '0.75rem',   // 12px
        sm: '0.875rem',  // 14px
        base: '1rem',    // 16px
        lg: '1.125rem',  // 18px
        xl: '1.25rem',   // 20px
        '2xl': '1.5rem', // 24px
        '3xl': '1.875rem', // 30px
        '4xl': '2.25rem',  // 36px
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
      },
      spacing: {
        'card-xxs': '0.75rem',  // 12px
        'card-xs': '1rem',      // 16px
        'card-sm': '1.25rem',   // 20px
        'card-md': '1.5rem',    // 24px
      },
      minHeight: {
        'card-xxs': '200px',
        'card-xs': '250px',
        'card-sm': '300px',
      },
      keyframes: {
        'accordion-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: 0.6 },
          '50%': { opacity: 1 },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 4s ease-in-out infinite',
        'shimmer': 'shimmer 8s ease-in-out infinite',
      },
      backgroundImage: {
        'background-wallpaper': "url('/assets/wallpaper.svg')",
        'cosmic-gradient': 'linear-gradient(to bottom right, #040D21, #0A1A35, #061529)',
        'cosmic-glow-gradient': 'radial-gradient(circle, rgba(96, 165, 250, 0.3) 0%, rgba(96, 165, 250, 0.1) 40%, transparent 70%)',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
