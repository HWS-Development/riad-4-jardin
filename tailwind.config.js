/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          gold: "#F2C75B",     // Accent principal (boutons, CTA)
          teal: "#244752",     // Menu / titres
          cream: "#F3E7D3",    // Sections claires
          charcoal: "#1E1E1E", // Texte principal
          forest: "#173C2F",   // Texte sur or / hover
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],       // Texte
        serif: ["Fraunces", "serif"],        // Titres (style logo)
      },
    },
  },
  plugins: [],
};
