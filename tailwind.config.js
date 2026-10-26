/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./script.js", "./data.js"],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#0070F3",  
          dark: "#0040A8",    
          light: "#E5F2FF",  
        },
        accent: "#FF6B00",     
        ink: "#0F172A",       
        muted: "#64748B",     
        ground: "#F8FAFC",    
        line: "#E2E8F0",       
      },
      fontFamily: {
        display: ["Arial", "sans-serif"],
        body: ["Arial", "sans-serif"],
        mono: ["Courier New", "monospace"],
      },
      borderRadius: {
        card: "20px",
      },
    },
  },
  plugins: [],
};