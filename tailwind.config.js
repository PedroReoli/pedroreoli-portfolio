const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  darkMode: ['class'],
  content: [
    "./src/_root/pages/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./public/index.html",
    "*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    // Breakpoints mais detalhados para melhor controle responsivo
    screens: {
      'xxs': '280px',     // Telefones muito pequenos
      'xs': '375px',      // iPhone SE, pequenos smartphones
      'sm': '425px',      // Smartphones médios
      'md': '640px',      // Tablets pequenos, smartphones grandes
      'lg': '768px',      // Tablets
      'xl': '1024px',     // Laptops/desktops pequenos
      '2xl': '1280px',    // Desktops
      '3xl': '1440px',    // Desktops grandes
      '4xl': '1536px',    // Telas muito grandes
      '5xl': '1920px',    // Full HD
      'tall': { 'raw': '(min-height: 800px)' }, // Telas altas
      'short': { 'raw': '(max-height: 600px)' }, // Telas curtas
      'portrait': { 'raw': '(orientation: portrait)' }, // Orientação retrato
      'landscape': { 'raw': '(orientation: landscape)' }, // Orientação paisagem
    },
    container: {
      center: true,
      padding: {
        'xxs': '0.75rem',  // 12px
        'xs': '1rem',      // 16px
        'sm': '1.5rem',    // 24px
        'md': '2rem',      // 32px
        'lg': '2.5rem',    // 40px
        'xl': '3rem',      // 48px
        '2xl': '4rem',     // 64px
        '3xl': '5rem',     // 80px
      },
      screens: {
        'xxs': '280px',
        'xs': '375px',
        'sm': '425px',
        'md': '640px',
        'lg': '768px',
        'xl': '1024px',
        '2xl': '1280px',
        '3xl': '1440px',
        '4xl': '1536px',
        '5xl': '1920px',
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
          50: "#EFF6FF",
          100: "#DBEAFE",
          200: "#BFDBFE",
          300: "#93C5FD",
          400: "#60A5FA",
          500: "#3B82F6",
          600: "#2563EB",
          700: "#1D4ED8",
          800: "#1E40AF",
          900: "#1E3A8A",
          950: "#172554",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
          50: "#F5F3FF",
          100: "#EDE9FE",
          200: "#DDD6FE",
          300: "#C4B5FD",
          400: "#A78BFA",
          500: "#8B5CF6",
          600: "#7C3AED",
          700: "#6D28D9",
          800: "#5B21B6",
          900: "#4C1D95",
          950: "#2E1065",
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
      borderRadius: {
        'none': '0',
        'xs': '0.125rem',    // 2px
        'sm': '0.25rem',     // 4px
        'md': '0.375rem',    // 6px
        'lg': '0.5rem',      // 8px
        'xl': '0.75rem',     // 12px
        '2xl': '1rem',       // 16px
        '3xl': '1.5rem',     // 24px
        '4xl': '2rem',       // 32px
        'full': '9999px',
      },
      width: {
        '1/7': '14.2857143%',
        '2/7': '28.5714286%',
        '3/7': '42.8571429%',
        '4/7': '57.1428571%',
        '5/7': '71.4285714%',
        '6/7': '85.7142857%',
        '420': '420px',
        '465': '465px',
        'screen-1/4': '25vw',
        'screen-1/3': '33.333vw',
        'screen-1/2': '50vw',
        'screen-2/3': '66.666vw',
        'screen-3/4': '75vw',
      },
      height: {
        'screen-1/4': '25vh',
        'screen-1/3': '33.333vh',
        'screen-1/2': '50vh',
        'screen-2/3': '66.666vh',
        'screen-3/4': '75vh',
      },
      fontSize: {
        'xxs': '0.625rem',   // 10px
        'xs': '0.75rem',     // 12px
        'sm': '0.875rem',    // 14px
        'base': '1rem',      // 16px
        'lg': '1.125rem',    // 18px
        'xl': '1.25rem',     // 20px
        '2xl': '1.5rem',     // 24px
        '3xl': '1.875rem',   // 30px
        '4xl': '2.25rem',    // 36px
        '5xl': '3rem',       // 48px
        '6xl': '3.75rem',    // 60px
        '7xl': '4.5rem',     // 72px
        '8xl': '6rem',       // 96px
        '9xl': '8rem',       // 128px
      },
      fontFamily: {
        'sans': ['Inter', ...defaultTheme.fontFamily.sans],
        'serif': [...defaultTheme.fontFamily.serif],
        'mono': [...defaultTheme.fontFamily.mono],
        'inter': ['Inter', 'sans-serif'],
        'montserrat': ['Montserrat', 'sans-serif'],
      },
      spacing: {
        '0.5': '0.125rem',   // 2px
        '1': '0.25rem',      // 4px
        '1.5': '0.375rem',   // 6px
        '2': '0.5rem',       // 8px
        '2.5': '0.625rem',   // 10px
        '3': '0.75rem',      // 12px
        '3.5': '0.875rem',   // 14px
        '4': '1rem',         // 16px
        '5': '1.25rem',      // 20px
        '6': '1.5rem',       // 24px
        '7': '1.75rem',      // 28px
        '8': '2rem',         // 32px
        '9': '2.25rem',      // 36px
        '10': '2.5rem',      // 40px
        '11': '2.75rem',     // 44px
        '12': '3rem',        // 48px
        '14': '3.5rem',      // 56px
        '16': '4rem',        // 64px
        '20': '5rem',        // 80px
        '24': '6rem',        // 96px
        '28': '7rem',        // 112px
        '32': '8rem',        // 128px
        '36': '9rem',        // 144px
        '40': '10rem',       // 160px
        '44': '11rem',       // 176px
        '48': '12rem',       // 192px
        '52': '13rem',       // 208px
        '56': '14rem',       // 224px
        '60': '15rem',       // 240px
        '64': '16rem',       // 256px
        '72': '18rem',       // 288px
        '80': '20rem',       // 320px
        '96': '24rem',       // 384px
        'card-xxs': '0.75rem',  // 12px
        'card-xs': '1rem',      // 16px
        'card-sm': '1.25rem',   // 20px
        'card-md': '1.5rem',    // 24px
      },
      minHeight: {
        '0': '0',
        'full': '100%',
        'screen': '100vh',
        'screen-1/4': '25vh',
        'screen-1/3': '33.333vh',
        'screen-1/2': '50vh',
        'screen-2/3': '66.666vh',
        'screen-3/4': '75vh',
        'card-xxs': '200px',
        'card-xs': '250px',
        'card-sm': '300px',
      },
      maxHeight: {
        'screen-1/4': '25vh',
        'screen-1/3': '33.333vh',
        'screen-1/2': '50vh',
        'screen-2/3': '66.666vh',
        'screen-3/4': '75vh',
      },
      minWidth: {
        '0': '0',
        'full': '100%',
        'min': 'min-content',
        'max': 'max-content',
        'screen-1/4': '25vw',
        'screen-1/3': '33.333vw',
        'screen-1/2': '50vw',
        'screen-2/3': '66.666vw',
        'screen-3/4': '75vw',
      },
      maxWidth: {
        'screen-1/4': '25vw',
        'screen-1/3': '33.333vw',
        'screen-1/2': '50vw',
        'screen-2/3': '66.666vw',
        'screen-3/4': '75vw',
      },
      lineHeight: {
        'tighter': '1.1',
        'tight': '1.25',
        'snug': '1.375',
        'normal': '1.5',
        'relaxed': '1.625',
        'loose': '2',
      },
      zIndex: {
        '0': '0',
        '10': '10',
        '20': '20',
        '30': '30',
        '40': '40',
        '50': '50',
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
        'auto': 'auto',
      },
      gap: {
        'xxs': '0.25rem',    // 4px
        'xs': '0.5rem',      // 8px
        'sm': '0.75rem',     // 12px
        'md': '1rem',        // 16px
        'lg': '1.5rem',      // 24px
        'xl': '2rem',        // 32px
        '2xl': '2.5rem',     // 40px
        '3xl': '3rem',       // 48px
      },
      gridTemplateColumns: {
        'auto-fill-xs': 'repeat(auto-fill, minmax(8rem, 1fr))',
        'auto-fill-sm': 'repeat(auto-fill, minmax(12rem, 1fr))',
        'auto-fill-md': 'repeat(auto-fill, minmax(16rem, 1fr))',
        'auto-fill-lg': 'repeat(auto-fill, minmax(20rem, 1fr))',
        'auto-fit-xs': 'repeat(auto-fit, minmax(8rem, 1fr))',
        'auto-fit-sm': 'repeat(auto-fit, minmax(12rem, 1fr))',
        'auto-fit-md': 'repeat(auto-fit, minmax(16rem, 1fr))',
        'auto-fit-lg': 'repeat(auto-fit, minmax(20rem, 1fr))',
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
        'spin-slow': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'bounce-subtle': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
        'fade-in': {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        'fade-out': {
          '0%': { opacity: 1 },
          '100%': { opacity: 0 },
        },
        'slide-in-right': {
          '0%': { transform: 'translateX(100%)', opacity: 0 },
          '100%': { transform: 'translateX(0)', opacity: 1 },
        },
        'slide-out-right': {
          '0%': { transform: 'translateX(0)', opacity: 1 },
          '100%': { transform: 'translateX(100%)', opacity: 0 },
        },
        'slide-in-left': {
          '0%': { transform: 'translateX(-100%)', opacity: 0 },
          '100%': { transform: 'translateX(0)', opacity: 1 },
        },
        'slide-out-left': {
          '0%': { transform: 'translateX(0)', opacity: 1 },
          '100%': { transform: 'translateX(-100%)', opacity: 0 },
        },
        'slide-in-up': {
          '0%': { transform: 'translateY(100%)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
        'slide-out-up': {
          '0%': { transform: 'translateY(0)', opacity: 1 },
          '100%': { transform: 'translateY(-100%)', opacity: 0 },
        },
        'slide-in-down': {
          '0%': { transform: 'translateY(-100%)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
        'slide-out-down': {
          '0%': { transform: 'translateY(0)', opacity: 1 },
          '100%': { transform: 'translateY(100%)', opacity: 0 },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 4s ease-in-out infinite',
        'shimmer': 'shimmer 8s ease-in-out infinite',
        'spin-slow': 'spin-slow 8s linear infinite',
        'bounce-subtle': 'bounce-subtle 2s ease-in-out infinite',
        'fade-in': 'fade-in 0.5s ease-out',
        'fade-out': 'fade-out 0.5s ease-out',
        'slide-in-right': 'slide-in-right 0.5s ease-out',
        'slide-out-right': 'slide-out-right 0.5s ease-out',
        'slide-in-left': 'slide-in-left 0.5s ease-out',
        'slide-out-left': 'slide-out-left 0.5s ease-out',
        'slide-in-up': 'slide-in-up 0.5s ease-out',
        'slide-out-up': 'slide-out-up 0.5s ease-out',
        'slide-in-down': 'slide-in-down 0.5s ease-out',
        'slide-out-down': 'slide-out-down 0.5s ease-out',
      },
      backgroundImage: {
        'background-wallpaper': "url('/assets/wallpaper.svg')",
        'cosmic-gradient': 'linear-gradient(to bottom right, #040D21, #0A1A35, #061529)',
        'cosmic-glow-gradient': 'radial-gradient(circle, rgba(96, 165, 250, 0.3) 0%, rgba(96, 165, 250, 0.1) 40%, transparent 70%)',
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding',
        'width': 'width',
        'size': 'width, height',
        'position': 'top, right, bottom, left',
        'border': 'border-width, border-color',
      },
      transitionDuration: {
        '0': '0ms',
        '2000': '2000ms',
        '3000': '3000ms',
        '4000': '4000ms',
        '5000': '5000ms',
      },
      transitionTimingFunction: {
        'bounce': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'precise': 'cubic-bezier(0.05, 0.7, 0.1, 1.0)',
      },
      backdropBlur: {
        'xs': '2px',
        'sm': '4px',
        'md': '8px',
        'lg': '12px',
        'xl': '16px',
        '2xl': '24px',
        '3xl': '32px',
      },
      aspectRatio: {
        'auto': 'auto',
        'square': '1 / 1',
        'video': '16 / 9',
        'portrait': '3 / 4',
        'landscape': '4 / 3',
        'ultrawide': '21 / 9',
        'golden': '1.618 / 1',
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
    function({ addVariant }) {
      addVariant('xs-only', '@media (min-width: 375px) and (max-width: 424px)');
      addVariant('sm-only', '@media (min-width: 425px) and (max-width: 639px)');
      addVariant('md-only', '@media (min-width: 640px) and (max-width: 767px)');
      addVariant('lg-only', '@media (min-width: 768px) and (max-width: 1023px)');
      addVariant('xl-only', '@media (min-width: 1024px) and (max-width: 1279px)');
      addVariant('2xl-only', '@media (min-width: 1280px) and (max-width: 1439px)');
      addVariant('3xl-only', '@media (min-width: 1440px) and (max-width: 1535px)');
      addVariant('4xl-only', '@media (min-width: 1536px) and (max-width: 1919px)');
      addVariant('5xl-only', '@media (min-width: 1920px)');
      
      // Variantes para orientação
      addVariant('portrait', '@media (orientation: portrait)');
      addVariant('landscape', '@media (orientation: landscape)');
      
      // Variantes para altura da tela
      addVariant('tall', '@media (min-height: 800px)');
      addVariant('short', '@media (max-height: 600px)');
      
      // Variantes para dispositivos específicos
      addVariant('mobile', '@media (max-width: 639px)');
      addVariant('tablet', '@media (min-width: 640px) and (max-width: 1023px)');
      addVariant('desktop', '@media (min-width: 1024px)');
      
      // Variantes para preferências do usuário
      addVariant('dark-mode', '@media (prefers-color-scheme: dark)');
      addVariant('light-mode', '@media (prefers-color-scheme: light)');
      addVariant('reduced-motion', '@media (prefers-reduced-motion: reduce)');
      
      // Variantes para dispositivos com toque
      addVariant('touch', '@media (hover: none) and (pointer: coarse)');
      addVariant('stylus', '@media (hover: none) and (pointer: fine)');
      addVariant('mouse', '@media (hover: hover) and (pointer: fine)');
    },
    // Plugin para adicionar utilitários de container responsivos
    function({ addComponents, theme }) {
      const screens = theme('screens', {});
      
      addComponents({
        '.container-fluid': {
          width: '100%',
          marginLeft: 'auto',
          marginRight: 'auto',
          paddingLeft: theme('spacing.4', '1rem'),
          paddingRight: theme('spacing.4', '1rem'),
        },
      });
      
      Object.entries(screens).forEach(([breakpoint, width]) => {
        addComponents({
          [`.container-${breakpoint}`]: {
            maxWidth: width,
            width: '100%',
            marginLeft: 'auto',
            marginRight: 'auto',
            paddingLeft: theme('spacing.4', '1rem'),
            paddingRight: theme('spacing.4', '1rem'),
          },
        });
      });
    },
  ],
};