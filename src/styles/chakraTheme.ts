import { extendTheme } from '@chakra-ui/react'

export const chakraTheme = extendTheme({
  colors: {
    primary: '#43C7E7',
    primaryDark: '#68d2eb',
    bgColor: '#fff',
    bgColorDark: '#111821',
    textColor: '#111821',
    textColorDark: '#fff',
    error: '#e53e3e',
  },
  fonts: {
    heading: 'Roboto',
    body: 'Roboto',
  },
  fontWeights: {
    hairline: 100,
    thin: 100,
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 500,
    bold: 700,
    extrabold: 700,
    black: 900,
  },
  styles: {
    global: (props: any) => ({
      'body, input, textarea, button': {
        font: "400 1rem 'Roboto', sans-serif",
      },
      body: {
        bg: 'bgColor',
        color: 'textColor',
      },
      '*': {
        '&::-webkit-scrollbar': {
          width: '8px',
          height: '8px',
        },
        '&::-webkit-scrollbar-track': {
          background: 'gray.50',
          borderRadius: '100px',
        },
        '&::-webkit-scrollbar-thumb': {
          background: 'gray.400',
          borderRadius: '100px',
        },
      },
    }),
  },
})
