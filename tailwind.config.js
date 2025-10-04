const defaultTheme = require("tailwindcss/defaultTheme")

/** @type {import('tailwindcss').Config} */
const config = {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
    "app/**/*.{ts,tsx}",
    "components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        xxs: "280px", // Telefones muito pequenos
        xs: "375px", // iPhone SE, pequenos smartphones
        sm: "425px", // Smartphones médios
        md: "640px", // Tablets pequenos, smartphones grandes
        lg: "768px", // Tablets
        xl: "1024px", // Laptops/desktops pequenos
        "2xl": "1280px", // Desktops
        "3xl": "1440px", // Desktops grandes
        "4xl": "1536px", // Telas muito grandes
        "5xl": "1920px", // Full HD
        tall: { raw: "(min-height: 800px)" }, // Telas altas
        short: { raw: "(max-height: 600px)" }, // Telas curtas
        portrait: { raw: "(orientation: portrait)" }, // Orientação retrato
        landscape: { raw: "(orientation: landscape)" }, // Orientação paisagem
      },
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
        // Cosmic theme colors
        cosmic: {
          bg: "#0F172A",
          card: "#1E293B",
          text: "#94A3B8",
          accent: "#60A5FA",
          border: "#334155",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      backgroundImage: {
        "radial-vignette": "radial-gradient(circle, transparent 50%, rgba(10, 17, 32, 0.4) 100%)",
        "network-gradient": "linear-gradient(to bottom, #0A1120, #0F172A, #0A1120)",
        "network-glow":
          "radial-gradient(circle, rgba(96, 165, 250, 0.15) 0%, rgba(59, 130, 246, 0.05) 50%, transparent 80%)",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        float: "float 6s ease-in-out infinite",
        "spin-slow": "spin 8s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      typography: {
        DEFAULT: {
          css: {
            color: "#94A3B8",
            a: {
              color: "#60A5FA",
              "&:hover": {
                color: "#93C5FD",
              },
            },
            h1: {
              color: "#FFFFFF",
            },
            h2: {
              color: "#FFFFFF",
            },
            h3: {
              color: "#FFFFFF",
            },
            h4: {
              color: "#FFFFFF",
            },
          },
        },
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    ({ addUtilities }) => {
      const newUtilities = {
        ".text-shadow-sm": {
          textShadow: "0 1px 2px rgba(0, 0, 0, 0.2)",
        },
        ".text-shadow": {
          textShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
        },
        ".text-shadow-md": {
          textShadow: "0 4px 8px rgba(0, 0, 0, 0.4)",
        },
        ".text-shadow-lg": {
          textShadow: "0 8px 16px rgba(0, 0, 0, 0.5)",
        },
        ".text-shadow-none": {
          textShadow: "none",
        },
        ".backface-hidden": {
          backfaceVisibility: "hidden",
        },
        ".perspective-1000": {
          perspective: "1000px",
        },
        ".transform-gpu": {
          transform: "translateZ(0)",
        },
      }
      addUtilities(newUtilities)
    },
  ],
}

module.exports = config

