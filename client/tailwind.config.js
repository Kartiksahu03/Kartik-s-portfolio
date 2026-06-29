/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Our dark background + aurora accent palette
        bg: {
          DEFAULT: '#0f1117', // main dark background
          card: '#171a23', // slightly lighter card background
          light: '#1e2230', // hover/lighter surfaces
        },
        cyan: {
          glow: '#22d3ee',
        },
        violet: {
          glow: '#8b5cf6',
        },
      },
      fontFamily: {
        sans: ['Poppins', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      backgroundImage: {
        'aurora-gradient': 'linear-gradient(90deg, #22d3ee 0%, #8b5cf6 100%)',
        'aurora-radial': 'radial-gradient(circle at 50% 0%, rgba(139,92,246,0.25), transparent 60%)',
      },
      boxShadow: {
        'glow-cyan': '0 0 25px rgba(34, 211, 238, 0.45)',
        'glow-violet': '0 0 25px rgba(139, 92, 246, 0.45)',
        'glow-soft': '0 0 40px rgba(34, 211, 238, 0.15)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        float: 'float 6s ease-in-out infinite',
        'aurora-drift-1': 'auroraDrift1 22s ease-in-out infinite',
        'aurora-drift-2': 'auroraDrift2 26s ease-in-out infinite',
        'aurora-drift-3': 'auroraDrift3 30s ease-in-out infinite',
        'logo-scroll': 'logoScroll 25s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-15px)' },
        },
        auroraDrift1: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '50%': { transform: 'translate(80px, 60px) scale(1.15)' },
        },
        auroraDrift2: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '50%': { transform: 'translate(-70px, 50px) scale(1.1)' },
        },
        auroraDrift3: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '50%': { transform: 'translate(50px, -40px) scale(1.2)' },
        },
        logoScroll: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
};
