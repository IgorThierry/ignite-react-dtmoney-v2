import { AppRoutes } from './routes'
import { AppProvider } from './contexts'
import { GlobalLoading } from './components/GlobalLoading'
import { ToastContainer } from 'react-toastify'
import { ChakraProvider } from '@chakra-ui/react'
import { chakraTheme } from './styles/chakraTheme'

export function App() {
  return (
    <ChakraProvider theme={chakraTheme}>
      <ToastContainer />

      <AppProvider>
        <AppRoutes />
        <GlobalLoading />
      </AppProvider>
    </ChakraProvider>
  )
}
