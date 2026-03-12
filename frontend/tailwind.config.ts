import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        govBlue: '#0B3D91',
        govSaffron: '#FF9933',
        govGreen: '#138808'
      }
    }
  },
  plugins: []
} satisfies Config;
