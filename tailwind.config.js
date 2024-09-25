// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        "inter-thin": ["Inter_100Thin", "sans-serif"],
        "inter-extralight": ["Inter_200ExtraLight", "sans-serif"],
        "inter-light": ["Inter_300Light", "sans-serif"],
        "inter-regular": ["Inter_400Regular", "sans-serif"],
        "inter-medium": ["Inter_500Medium", "sans-serif"],
        "inter-semibold": ["Inter_600SemiBold", "sans-serif"],
        "inter-bold": ["Inter_700Bold", "sans-serif"],
        "inter-extrabold": ["Inter_800ExtraBold", "sans-serif"],
        "inter-black": ["Inter_900Black", "sans-serif"],
      },
    },
  },
  plugins: [],
};
