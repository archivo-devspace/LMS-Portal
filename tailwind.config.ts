import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
    colors: {
      primaryColor: "var(--primary-color)",
      primaryStrongColor: "var(--primary_strong-color)",
      primaryWeakColor: "var(--primary_weak-color)",
      secondaryColor: "var(--secondary-color)",
      secondaryStrongColor: "var(--secondary_strong-color)",
      secondaryWeakColor: "var(--secondary_weak-color)",
      textColor: "var(--text-color)",
      activeColor: "var(--active-color)",
      successColor: "var(--success-color)",
      warnningColor: "var(--warnning-color)",
      dangerColor: "var(--danger-color)",
    },
  },
  plugins: [],
};
export default config;
