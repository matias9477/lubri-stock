const config = {
  content: ["./src/app/**/*.{ts,tsx,css}", "./src/components/**/*.{ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

module.exports = config;
