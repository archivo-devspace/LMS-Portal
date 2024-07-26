import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        primary: "#151523",
        secondary: "#23243a",
        light:"#FFFFFF",
        default: "fff",
        success: "#00a854",
        danger: "#ff4d4f",
        warnning: "#ffbf00",
        darkGrey:"#222",
      }
      
    },
  },
  plugins: [],
}
export default config
