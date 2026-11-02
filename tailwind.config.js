/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: {
          DEFAULT: '#F4F0E7',
          light: '#FBF9F4',
          muted: '#EDE8DC',
          dim: '#E4DDD0',
        },
        ink: {
          DEFAULT: '#182033',
          soft: '#3D465B',
          muted: '#687188',
          faint: '#9BA3B5',
        },
        line: {
          DEFAULT: '#D7D0C2',
          subtle: '#E6E0D5',
          strong: '#B8AF9E',
        },
        signal: {
          DEFAULT: '#FF5A36',
          hover: '#E84521',
          light: '#FFEBE6',
          subtle: '#FFF3F0',
        },
        cobalt: {
          DEFAULT: '#315EFB',
          hover: '#1B47DC',
          light: '#EEF2FF',
        },
        mint: {
          DEFAULT: '#B9E8D0',
          dark: '#246549',
          light: '#F0F9F5',
        },
        sun: {
          DEFAULT: '#FFD166',
          dark: '#A67C00',
          light: '#FFF9EB',
        },
      },
      fontFamily: {
        display: ['"Instrument Serif"', 'Georgia', 'serif'],
        sans: ['"Manrope"', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'Menlo', 'Consolas', 'monospace'],
      },
      maxWidth: {
        container: '1380px',
      },
      screens: {
        'xs': '375px',
      },
    },
  },
  plugins: [],
}
