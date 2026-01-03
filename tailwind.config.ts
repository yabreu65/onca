import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        onca: {
          orange: '#F57C00',
          'orange-dark': '#E65100',
          'orange-light': '#FFB74D',
        },
        dark: {
          DEFAULT: '#1A1A1A',
          lighter: '#2D2D2D',
        },
        service: {
          blue: '#1565C0',
          'blue-light': '#42A5F5',
        },
      },
      fontFamily: {
        montserrat: ['var(--font-montserrat)', 'sans-serif'],
        opensans: ['var(--font-opensans)', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
        'pulse-slow': 'pulse 3s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
