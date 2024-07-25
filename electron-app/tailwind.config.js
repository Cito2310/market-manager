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

            "btn_primary"   : "#4F46E5",
            "btn_danger"    : "#DC3545",
            "btn_secondary" : "#e0e0e0",
            
            "input_border"  : "#e0e0e0",

            "txt-black"     : "#374151",
        },
        fontFamily: {
            // sans: ["Mulish", "Montserrat", "Arial", "Helvetica", "sans-serif"],
            Montserrat: ["Montserrat", "Mulish", "Montserrat", "Arial", "Helvetica", "sans-serif"]
        }
      },
    },
    plugins: [],
  }