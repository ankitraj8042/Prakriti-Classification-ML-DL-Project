/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sage: {
          50: '#f6f7f4',
          100: '#e8ebe3',
          200: '#d4dac9',
          300: '#b6c2a4',
          400: '#95a77d',
          500: '#7a8e61',
          600: '#5f714b',
          700: '#4b593c',
          800: '#3e4933',
          900: '#353f2d',
        },
        cream: {
          50: '#fdfcf9',
          100: '#faf7f0',
          200: '#f5efe3',
          300: '#ede3cf',
          400: '#e2d2b5',
          500: '#d4bd96',
        },
        terracotta: {
          50: '#fdf6f3',
          100: '#fbeae3',
          200: '#f8d4c7',
          300: '#f2b5a0',
          400: '#e98b6e',
          500: '#de6848',
          600: '#cf5133',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Playfair Display', 'serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
      },
    },
  },
  plugins: [],
}
