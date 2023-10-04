import { ThemeProvider } from 'styled-components'

import { GlobalStyle } from './styles/global'
import { defaultTheme } from './styles/themes/default'

import { AppRoutes } from './routes'
import { AppProvider } from './contexts'
import { GlobalLoading } from './components/GlobalLoading'

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />

      <AppProvider>
        <AppRoutes />
        <GlobalLoading />
      </AppProvider>
    </ThemeProvider>
  )
}
