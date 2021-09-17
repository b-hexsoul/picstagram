module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        white: '#ffffff',
        purple: {
          primary: '#6C508B',
          secondary: '#AB7AE2',
          light: '#e8c6ff'
        },
        red: {
          primary: '#ed4956'
        },
        blue: {
          medium: '#005c98'
        },
        gray: {
          base: '#616161',
          primary: '#dbdbdb',
          background: '#fafafa'
        },
        black: {
          light: '#262626',
          faded: '#000059'
        }
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
};
