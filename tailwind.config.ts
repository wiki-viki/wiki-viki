import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      sm: { max: '480px' },
      md: '481px',
      lg: '769px',
      xl: '1280px',
    },
    extend: {
      borderRadius: {
        10: '10px',
      },
      colors: {
        grayscale: {
          50: '#FFFFFF',
          100: '#F7F7FA',
          200: '#E4E5F0',
          300: '#C6CADA',
          400: '#8F95B2',
          500: '#474D66',
          600: '#3B415B',
        },
        'primary-green': {
          100: '#EEF9F6',
          200: '#4CBFA4',
          300: '#32A68A',
        },
        'secondary-red': {
          100: '#FBEDED',
          200: '#D14343',
        },
        'secondary-purple': {
          100: '#8E66FF',
        },
        'secondary-yellow': {
          100: '#FDD181',
        },
      },
    },
    fontSize: {
      // 5xl
      '5xl': ['48px', { lineHeight: '46px', fontWeight: '600' }],

      // 4xl
      '4xl': ['40px', { lineHeight: '42px', fontWeight: 'bold' }],

      // 3xl
      '3xl-bold': ['32px', { lineHeight: '46px', fontWeight: 'bold' }],

      // 2xl
      '2xl-bold': ['24px', { lineHeight: '32px', fontWeight: 'bold' }],
      '2xl-semibold': ['24px', { lineHeight: '32px', fontWeight: '600' }],
      '2xl-medium': ['24px', { lineHeight: '32px', fontWeight: '500' }],
      '2xl-regular': ['24px', { lineHeight: '32px', fontWeight: '400' }],

      // xl
      'xl-bold': ['20px', { lineHeight: '32px', fontWeight: 'bold' }],
      'xl-semibold': ['20px', { lineHeight: '32px', fontWeight: '600' }],
      'xl-medium': ['20px', { lineHeight: '32px', fontWeight: '500' }],
      'xl-regular': ['20px', { lineHeight: '32px', fontWeight: '400' }],

      // 2lg
      '2lg-bold': ['18px', { lineHeight: '26px', fontWeight: 'bold' }],
      '2lg-semibold': ['18px', { lineHeight: '26px', fontWeight: '600' }],
      '2lg-medium': ['18px', { lineHeight: '26px', fontWeight: '500' }],
      '2lg-regular': ['18px', { lineHeight: '26px', fontWeight: '400' }],

      // lg
      'lg-bold': ['16px', { lineHeight: '26px', fontWeight: 'bold' }],
      'lg-semibold': ['16px', { lineHeight: '26px', fontWeight: '600' }],
      'lg-medium': ['16px', { lineHeight: '26px', fontWeight: '500' }],
      'lg-regular': ['16px', { lineHeight: '26px', fontWeight: '400' }],

      // md
      'md-bold': ['14px', { lineHeight: '24px', fontWeight: 'bold' }],
      'md-semibold': ['14px', { lineHeight: '24px', fontWeight: '600' }],
      'md-medium': ['14px', { lineHeight: '24px', fontWeight: '500' }],
      'md-regular': ['14px', { lineHeight: '24px', fontWeight: '400' }],

      // sm
      'sm-semibold': ['13px', { lineHeight: '22px', fontWeight: '600' }],
      'sm-medium': ['13px', { lineHeight: '22px', fontWeight: '500' }],

      // xs
      'xs-semibold': ['12px', { lineHeight: '20px', fontWeight: '600' }],
      'xs-medium': ['12px', { lineHeight: '18px', fontWeight: '500' }],
      'xs-regular': ['12px', { lineHeight: '18px', fontWeight: '400' }],
    },
    boxShadow: {
      custom: '0px 4px 20px 0px #0000000D',
    },
  },
  future: {
    hoverOnlyWhenSupported: true,
  },
  plugins: [],
};
export default config;
