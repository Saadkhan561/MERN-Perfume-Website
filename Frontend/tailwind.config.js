/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        full_screen: {min: '900px'},
        mob_display: {max: '900px'},
        mob_display_product: {max: '420px'},
        // slider1: {max: '1300px'},
        // slider1_full: {min: '1300px'},
        // slider2: {max: '1000px'},
        // slider3: {max: '750px'},
        register_small_div: {max: '800px'},
        register_full_div: {min: '800px'},
        register_mini_div: {max: '500px'},
        cart: {max: '1100px'}
      },
      colors: {
        'custom-green': '#253428',
        'custom-light-green':'#7cbf88'
      },
    },
  },
  plugins: [],
};
