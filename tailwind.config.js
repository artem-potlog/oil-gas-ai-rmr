/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Manrope', 'Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        ink: {
          950: '#05070e',
          900: '#0a0e1a',
          800: '#111729',
          700: '#1b2238',
        },
        brand: {
          DEFAULT: '#ff4d2e',
          soft: '#ff7a5c',
        },
        accent: {
          cyan: '#22d3ee',
          violet: '#a78bfa',
          green: '#34d399',
          amber: '#fbbf24',
        },
      },
      boxShadow: {
        glow: '0 0 40px -10px rgba(255,77,46,0.45)',
        card: '0 20px 60px -25px rgba(0,0,0,0.7)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        shimmer: 'shimmer 6s linear infinite',
      },
    },
  },
  plugins: [],
};
