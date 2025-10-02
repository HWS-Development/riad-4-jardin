/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html","./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    container: { center: true, padding: "1rem" },
    extend: {
      colors: {
        brand: "#879b61",      // olive
        paper: "#f7f4ea",      // page background tint in sections
        footer: "#6b8049",     // footer green
        title: "#2b2b2b",
        text: "#4b4b4b"
      },
      fontFamily: {
        sans: ["Inter","ui-sans-serif","system-ui"]
      },
      boxShadow: {
        card: "0 6px 18px rgba(0,0,0,.08)"
      }
    }
  },
  plugins: [],
}
