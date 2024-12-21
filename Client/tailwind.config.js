import daisyui from 'daisyui'
export default  {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        orangeGradient: {
          light: '#ff7e5f',
          dark: '#feb47b',
        },
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: ["light", "dark", "cupcake"],
  },
};
