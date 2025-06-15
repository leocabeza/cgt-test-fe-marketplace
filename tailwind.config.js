/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'neon-cyan': '#00ffff',
        'neon-magenta': '#ff00ff',
        'neon-lime': '#00ff00',
        'neon-yellow': '#ffff00',
        'dark-bg': '#0a0a1a',
        'dark-surface': '#1a1a2e',
        'retro-purple': '#6b46c1',
        'retro-pink': '#ec4899',
        // Softer, more accessible text colors
        'text-primary': '#e8e8f0', // Soft off-white instead of pure white
        'text-secondary': '#a1a1aa',
        'text-soft': '#c9c9d1', // Even softer alternative
        'text-muted': '#8b8b95', // Muted for less important text
        'border-neon': '#00ffff',
        // Accessible neon variants (slightly dimmed)
        'neon-cyan-soft': '#4dffff', // 30% lighter cyan
        'neon-magenta-soft': '#ff4dff', // 30% lighter magenta
        'neon-lime-soft': '#4dff4d', // 30% lighter lime
      },
      fontFamily: {
        retro: ['"Press Start 2P"', 'cursive'],
        orbitron: ['Orbitron', 'Courier New', 'monospace'],
      },
      boxShadow: {
        'neon-cyan': [
          '0 0 10px rgba(0, 255, 255, 0.3)',
          'inset 0 0 10px rgba(0, 255, 255, 0.1)',
        ],
        'neon-cyan-intense': [
          '0 0 20px rgba(0, 255, 255, 0.6)',
          'inset 0 0 20px rgba(0, 255, 255, 0.2)',
        ],
        'neon-magenta': [
          '0 0 30px rgba(255, 0, 255, 0.3)',
          'inset 0 0 30px rgba(255, 0, 255, 0.1)',
        ],
        'neon-lime': [
          '0 0 30px rgba(0, 255, 0, 0.3)',
          'inset 0 0 30px rgba(0, 255, 0, 0.1)',
        ],
        'retro-glow': [
          '0 0 15px rgba(0, 255, 255, 0.2)',
          'inset 0 0 15px rgba(0, 255, 255, 0.05)',
        ],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite alternate',
        'border-glow': 'borderGlow 4s ease infinite',
        'rainbow-slide': 'rainbowSlide 3s linear infinite',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        glowPulse: {
          from: {
            textShadow:
              '2px 2px 0px #ff00ff, 4px 4px 0px #0a0a1a, 0 0 20px #00ffff',
          },
          to: {
            textShadow:
              '2px 2px 0px #ff00ff, 4px 4px 0px #0a0a1a, 0 0 30px #00ffff, 0 0 40px #00ffff',
          },
        },
        borderGlow: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        rainbowSlide: {
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '200% 50%' },
        },
      },
      backgroundImage: {
        'retro-gradient': 'linear-gradient(135deg, #0a0a1a 0%, #1a1a2e 100%)',
        'neon-gradient': 'linear-gradient(45deg, #1a1a2e, #6b46c1)',
        'rainbow-gradient':
          'linear-gradient(45deg, #00ffff, #ff00ff, #00ff00, #00ffff)',
      },
    },
  },
  plugins: [],
};
