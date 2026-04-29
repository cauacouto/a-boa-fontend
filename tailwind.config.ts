import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        syne: ['Syne', 'sans-serif'],
        dm: ['DM Sans', 'sans-serif'],
      },
      colors: {
        boa: {
          pink: '#E040A0',
          purple: '#7B2FBE',
          orange: '#FF6B35',
          dark: '#0F0A1A',
          card: '#1A1228',
          border: '#2D2040',
        },
      },
    },
  },
  plugins: [],
};

export default config;
