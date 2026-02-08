import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        surface: { DEFAULT: '#1a1a2e', light: '#222244', lighter: '#2a2a4a' },
        accent: { DEFAULT: '#7c3aed', light: '#a78bfa' },
        border: '#333366',
      },
    },
  },
  plugins: [],
}
export default config
