import { ReactNode } from 'react'

import { AuthProvider } from './AuthContext'
import { TransactionsProvider } from './TransactionsContext'

interface AppProviderProps {
  children: ReactNode
}

export function AppProvider({ children }: AppProviderProps) {
  return (
    <AuthProvider>
      <TransactionsProvider>{children}</TransactionsProvider>
    </AuthProvider>
  )
}
