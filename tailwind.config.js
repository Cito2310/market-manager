export default {
    content: [
      "./public/index.html",
      "./src/**/*.{js,ts,jsx,tsx}",   
    ],
    theme: {
      extend: {
        colors: {
            "card_bg"       : "#ffffff",
            "card_btn"      : "#e0e0e0",
            "card_btnText"  : "#b2b2b2",
            "danger"        : "#ff0000",
            "done"          : "#00ff00",
        },
        fontFamily: {
            sans: ["Mulish", "Montserrat", "Arial", "Helvetica", "sans-serif"],
            Montserrat: ["Montserrat"]
        }
      },
    },
    plugins: [],
  }