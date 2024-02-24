/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './containers/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        nav: '#18222f',
        page: '#2b3441',
        card: '#47566a',
        'card-hover': '#4f5e74',
        'default-text': '#f1f3f5',
        'blue-accent': '#0084d4',
        'blue-accent-hover': '#009fff',
        'main-bg': '#55CCC9',
        accent: '#F1F1F1',
        low: '#42FB55',
        medium: '#90AD19',
        danger: '#DD0025',
        'green-accent': '#3DC36A',
        'bg-200': '#1F2B3E',
        'bg-300': '#374357',
        'text-100': '#FFFFFF',
        'text-200': '#E0E0E0',
      },
    },
  },
  plugins: [],
};
