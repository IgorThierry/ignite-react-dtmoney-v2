import { ThemeProvider } from 'styled-components'

import { GlobalStyle } from './styles/global'
import { defaultTheme } from './styles/themes/default'

import { AppRoutes } from './routes'
import { AppProvider } from './contexts'
import { GlobalLoading } from './components/GlobalLoading'
import { ToastContainer } from 'react-toastify'
import { ChakraProvider } from '@chakra-ui/react'
import { chakraTheme } from './styles/chakraTheme'

export function App() {
  return (
    <ChakraProvider theme={chakraTheme}>
      <ThemeProvider theme={defaultTheme}>
        <GlobalStyle />
        <ToastContainer />

        <AppProvider>
          <AppRoutes />
          <GlobalLoading />
        </AppProvider>
      </ThemeProvider>
    </ChakraProvider>
  )
}
