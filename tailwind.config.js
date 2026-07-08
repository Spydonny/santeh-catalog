/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Монохромный акцент: от почти белого до чёрного
        accent: {
          50: '#fafafa',
          100: '#f4f4f5',
          200: '#e4e4e7',
          300: '#d4d4d8',
          400: '#a1a1aa',
          500: '#52525b',
          600: '#18181b',
          700: '#0a0a0a',
          800: '#000000',
          900: '#000000',
        },
      },
      boxShadow: {
        card: '0 0 0 1px rgba(0, 0, 0, 0.04)',
        'card-hover': '0 8px 24px -8px rgba(0, 0, 0, 0.12), 0 2px 6px -2px rgba(0, 0, 0, 0.06)',
      },
      fontFamily: {
        sans: ['"Segoe UI"', 'system-ui', '-apple-system', 'Roboto', 'Arial', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
