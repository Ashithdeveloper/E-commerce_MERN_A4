/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: {
        sm: "600px",
        md: "768px",
        lg: "1024px",
        xl: "1200px",
        "2xl": "1400px", // optional
      },
    },
  },
  plugins: [],
};
