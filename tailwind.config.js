// tailwind.config.js (merge with yours)
export default {
  content: ["./index.html","./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    container: { center: true, padding: "1rem" },
    extend: {
      colors: {
        brand: {
          teal: "#173B45",      // header (scrolled) bar color, matches screenshot
          gold: "#E9C15F",      // button
          brown: "#6F6257",     // footer main bg
          desert: "#E9D8C0",    // beige band
          cream: "#F6ECD8",     // light separator
          dark: "#1B1B1B",
        },
      },
      fontFamily: {
        serif: ["Fraunces","ui-serif","Georgia","serif"],
        sans: ["Inter","ui-sans-serif","system-ui","Arial"],
      },
      borderRadius: { pill: "999px" },
      boxShadow: {
        dropdown: "0 12px 30px rgba(0,0,0,.22)",
      },
      maxWidth: { content: "1120px" },
    },
  },
  plugins: [],
};
