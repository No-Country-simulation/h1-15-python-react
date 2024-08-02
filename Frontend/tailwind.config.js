/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        josefin: ["Josefin Sans", "sans-serif"],
        spartan: ["League Spartan", "sans-serif"],
        noto: ['Noto Sans Arabic', 'sans-serif'],
      },
      colors: {
        primary: {
          50: "#fff3e7",
          100: "#ffe7cf",
          200: "#ffcfa0",
          300: "#ffb870",
          400: "#ffa041",
          500: "#ff8811",
          600: "#cc6d0e",
          700: "#99520a",
          800: "#663607",
          900: "#331b03",
        },
        secondary: {
          50: "#ffe6f3",
          100: "#ffcce7",
          200: "#ff99cf",
          300: "#ff66b7",
          400: "#ff339f",
          500: "#ff0087",
          600: "#cc006c",
          700: "#990051",
          800: "#660036",
          900: "#33001b",
        },
        complementary: {
          50: "#fefaf1",
          100: "#fdf6e2",
          200: "#fbecc5",
          300: "#f8e3a9",
          400: "#f6d98c",
          500: "#f4d06f",
          600: "#c3a659",
          700: "#927d43",
          800: "#62532c",
          900: "#312a16",
        },
        magentaButton: "#d667cd",
        Justina_1: "#5563C4",
        Justina_2: "#9AC9B9",
        Justina_3: "#EE6092",
        Justina_4: "#4E8661",
        Justina_5: "#958BBF",
        Justina_6: "#DF8936",
        Justina_7: "#E9CD53",
        Justina_8: "#00ADDE",
        Justina_9: "#CAD6FF",

        text_primary: "#6C7278",
        text_secondary: "#5563C4",
      },
      backgroundImage: {
        "gradient-background_1":
          // "linear-gradient(0deg, #FFC791 0%, #FF78A8 100%)",
          "linear-gradient(0deg, #0002 0%, #f4f4f4 100%)",
        "gradient-button":
          "linear-gradient(0deg, #d667cd, #d667cd), linear-gradient(180deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0) 100%)",
        "footer-gradient": 
        `linear-gradient(180deg, #5b5a94 0%, #4a4a7a 50%, #3b3b60 100%)`,
        "gradient-button-2":
        'linear-gradient(0deg, #28ADE4, #28ADE4),linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.189) 50%, rgba(0, 0, 0, 0.2) 100%)',

      },
      boxShadow: {
        "inner-custom": "0px 4px 4px 0px rgba(0, 0, 0, 0.25) inset",
        'card-shadow': 'rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;'},
    },
  },
  plugins: [],
};
