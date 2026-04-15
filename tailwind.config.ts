import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        lexis: {
          bg: '#0A0B0D',
          surface: '#111318',
          'surface-elevated': '#1A1D24',
          'text-primary': '#E8E9EB',
          'text-secondary': '#8B8F99',
          'text-tertiary': '#52566B',
          'accent-blue': '#1B4F8A',
          'accent-blue-bright': '#2E6FBE',
          gold: '#C9A84C',
          border: '#1F2330',
          'border-active': '#2E6FBE',
          danger: '#8B2020',
          success: '#1A5C3A',
        },
      },
      fontFamily: {
        sans: [
          '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto',
          'Helvetica Neue', 'Arial', 'sans-serif',
        ],
        mono: [
          'SF Mono', 'Fira Code', 'Fira Mono', 'Roboto Mono',
          'Consolas', 'Courier New', 'monospace',
        ],
      },
    },
  },
  plugins: [],
};

export default config;
