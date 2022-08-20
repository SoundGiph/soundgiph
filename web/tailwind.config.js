module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#7056EC",
      },
    },
  },
  plugins: [require("daisyui"), require("@tailwindcss/line-clamp"), require("tailwind-scrollbar")],
};
