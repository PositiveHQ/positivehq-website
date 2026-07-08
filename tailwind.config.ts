import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        accent: '#D9B76B',
        navy: '#020814',
        royal: '#123A6F'
      }
    }
  },
  plugins: []
};

export default config;
