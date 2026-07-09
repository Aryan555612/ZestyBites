/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-jakarta)', 'Plus Jakarta Sans', 'Inter', 'sans-serif'],
        heading: ['var(--font-cormorant)', 'Cormorant Garamond', 'Playfair Display', 'serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        primary: {
          DEFAULT: '#B59360', /* Elegant Antique Gold */
          50:  '#FAF8F5',
          100: '#F4EFEA',
          200: '#E9DEC0',
          300: '#D9C8A0',
          400: '#C9B180',
          500: '#B59360',
          600: '#9C784A',
          700: '#835F38',
          800: '#694727',
          900: '#52341A',
        },
        dark: {
          50:  '#0B0907', /* Inverted colors for dark mode text */
          100: '#14120E',
          200: '#201C17',
          300: '#3A3228',
          400: '#574C3D',
          500: '#7A6B56',
          600: '#A0907A',
          700: '#CFBFA8',
          800: '#E8E3D7',
          900: '#FAF9F6',
          950: '#FFFFFF',
        },
        luxury: {
          gold: '#B59360',
          goldLight: '#E8DCC4',
          beige: '#FAF9F6',
          cream: '#F4F1EA',
          bronze: '#835F38',
          emerald: '#0B3B2C', /* Deep Cool Emerald */
          mint: '#E6F4EA', /* Soft Cool Green */
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-glow':  'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(181,147,96,0.15), transparent)',
        'card-shine': 'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, transparent 60%)',
        'aurora':     'linear-gradient(135deg, rgba(181,147,96,0.06) 0%, rgba(130,195,166,0.03) 50%, rgba(181,147,96,0.02) 100%)',
        'mesh':       'radial-gradient(at 40% 20%, rgba(181,147,96,0.06) 0px, transparent 50%), radial-gradient(at 80% 0%, rgba(130,195,166,0.03) 0px, transparent 50%), radial-gradient(at 0% 50%, rgba(181,147,96,0.02) 0px, transparent 50%)',
      },
      boxShadow: {
        'glow':        '0 0 20px rgba(181,147,96,0.15)',
        'glow-lg':     '0 0 40px rgba(181,147,96,0.1)',
        'card':        '0 8px 30px rgba(181,147,96,0.04), inset 0 1px 0 rgba(255,255,255,0.8)',
        'card-hover':  '0 16px 50px rgba(181,147,96,0.08), 0 0 0 1px rgba(181,147,96,0.15), inset 0 1px 0 rgba(255,255,255,0.9)',
        'premium':     '0 30px 80px rgba(181,147,96,0.06), inset 0 1px 0 rgba(255,255,255,0.9)',
        'inner-glow':  'inset 0 0 30px rgba(181,147,96,0.02)',
        'navbar':      '0 1px 0 rgba(181,147,96,0.06), 0 4px 30px rgba(181,147,96,0.02)',
      },
      animation: {
        'float':        'float 6s ease-in-out infinite',
        'float-slow':   'float 10s ease-in-out infinite',
        'pulse-slow':   'pulse 4s ease-in-out infinite',
        'shimmer':      'shimmer 2.5s linear infinite',
        'slide-up':     'slideUp 0.5s ease-out',
        'fade-in':      'fadeIn 0.6s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-14px)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition:  '200% 0' },
        },
        slideUp: {
          '0%':   { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
        '6xl': '3rem',
      },
    },
  },
  plugins: [],
};
