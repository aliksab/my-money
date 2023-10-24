/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
const windmill = require("@windmill/react-ui/config");

module.exports = {
    darkMode: "class",
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        fontFamily: {
            sans: ["Inter", ...defaultTheme.fontFamily.sans]
        },
        boxShadow: {
            bottom: "0 5px 6px -7px rgba(0, 0, 0, 0.6), 0 2px 4px -5px rgba(0, 0, 0, 0.06)"
        },
        screens: {
            xs: "425px",
            ...defaultTheme.screens
        }
    },
    plugins: [
        require("@tailwindcss/line-clamp"),
        require("@tailwindcss/typography")
    ]
};
