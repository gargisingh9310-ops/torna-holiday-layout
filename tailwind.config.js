/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: {
          DEFAULT: '#F3EDE3',
          warm: '#F3EDE3',
          light: '#FAF8F3',
          dark: '#E7DDCE',
        },
        cream: {
          DEFAULT: '#FAF8F3',
          soft: '#FAF8F3',
        },
        sand: {
          DEFAULT: '#E7DDCE',
          light: '#EFE7DC',
          dark: '#D9CDBD',
        },
        earth: {
          DEFAULT: '#49392D',
          deep: '#49392D',
          darker: '#34271D',
          muted: '#5C4A3C',
          light: '#725E50',
        },
        sage: {
          DEFAULT: '#69764C',
          muted: '#69764C',
          light: '#829161',
          dark: '#515B3A',
        },
        olive: {
          DEFAULT: '#78815C',
          dark: '#5D6546',
        },
        taupe: {
          DEFAULT: '#D9CDBD',
          light: '#E4DDD2',
          dark: '#BDB1A0',
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', '"DM Sans"', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        editorial: '0.06em',
        luxury: '0.12em',
        widest: '0.22em',
      }
    },
  },
  plugins: [],
}

