import { ReactNode } from 'react'

import { AuthProvider } from './AuthContext'
import { TransactionsProvider } from './TransactionsContext'
import { GlobalLoadingProvider } from './GlobalLoading'

interface AppProviderProps {
  children: ReactNode
}

export function AppProvider({ children }: AppProviderProps) {
  return (
    <GlobalLoadingProvider>
      <AuthProvider>
        <TransactionsProvider>{children}</TransactionsProvider>
      </AuthProvider>
    </GlobalLoadingProvider>
  )
}
