module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    primary: "indigo-500",
    extend: {},
  },
  plugins: [require("daisyui"), require("@tailwindcss/line-clamp")],
};
