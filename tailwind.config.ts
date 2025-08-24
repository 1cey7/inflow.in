import type { Config } from 'tailwindcss'
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      borderRadius: { '2xl': '1.25rem' },
      colors: { brand: { DEFAULT: '#0f172a' } }
    },
    fontFamily: { sans: ['Inter', 'ui-sans-serif', 'system-ui', 'Arial'] }
  },
  plugins: []
}
export default config
