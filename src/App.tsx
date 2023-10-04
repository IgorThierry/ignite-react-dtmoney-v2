import { ThemeProvider } from 'styled-components'

import { GlobalStyle } from './styles/global'
import { defaultTheme } from './styles/themes/default'

import { AppRoutes } from './routes'
import { AppProvider } from './contexts'

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />

      <AppProvider>
        <AppRoutes />
      </AppProvider>
    </ThemeProvider>
  )
}
