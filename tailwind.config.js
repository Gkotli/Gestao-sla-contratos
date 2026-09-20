/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dor: {
          primary: '#123768',
          hover: '#0B2850',
          dark: '#0B2850',
          50: '#f0f5fa',
          100: '#e1ebf5',
          200: '#c3d7eb',
          500: '#123768',
          600: '#0B2850',
          700: '#081e3d',
          800: '#051429',
          900: '#020b18',
        },
        brand: {
          primary: '#123768',
          hover: '#0B2850',
          bg: '#F1F5F9',
          card: '#FFFFFF',
          text: '#172B4D',
          textSecondary: '#475569',
          border: '#CBD5E1',
        },
        info: {
          bg: '#EFF6FF',
          text: '#1E40AF',
          border: '#BFDBFE',
        },
        warning: {
          bg: '#FFFBEB',
          text: '#92400E',
          border: '#FCD34D',
        },
        success: {
          bg: '#ECFDF5',
          text: '#047857',
          border: '#A7F3D0',
        },
        danger: {
          bg: '#FEF2F2',
          text: '#B91C1C',
          border: '#FECACA',
        },
        hospital: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          500: '#0284c7',
          600: '#123768',
          700: '#0B2850',
          800: '#0c4a6e',
          900: '#0f172a',
        },
        meta: {
          green: '#047857',
          yellow: '#92400E',
          red: '#B91C1C'
        }
      },
      borderRadius: {
        card: '8px',
        control: '6px',
        badge: '4px',
      }
    },
  },
  plugins: [],
}
