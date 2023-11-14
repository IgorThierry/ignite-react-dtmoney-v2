import { extendTheme } from '@chakra-ui/react'

export const chakraTheme = extendTheme({
  fonts: {
    heading: 'Roboto',
    body: 'Roboto',
  },
  styles: {
    global: (props: any) => ({
      'body, input, textarea, button': {
        font: "400 1rem 'Roboto', sans-serif",
      },
      body: {
        '-webkit-font-smoothing': 'antialiased',
        bg: 'gray.50',
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
