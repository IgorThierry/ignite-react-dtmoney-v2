import { ReactNode, useState } from 'react'

import { createContext } from 'use-context-selector'

interface ShowLoadingProps {
  show: boolean
  msg?: string
}

interface GlobalLoadingContextData {
  show: boolean
  count: number
  msg: string
  showLoading(data: ShowLoadingProps): void
}

interface ProviderProps {
  children: ReactNode
}

export const GlobalLoadingContext = createContext(
  {} as GlobalLoadingContextData,
)

export function GlobalLoadingProvider({ children }: ProviderProps) {
  const [{ show, count, msg }, setLoading] = useState({
    show: false,
    count: 0,
    msg: '',
  })

  function showLoading(data: ShowLoadingProps) {
    const { show, msg = '' } = data
    let countAux = show ? count + 1 : count - 1

    if (countAux < 0) {
      countAux = 0
    }

    setLoading({
      show: countAux !== 0,
      count: countAux,
      msg,
    })
  }

  return (
    <GlobalLoadingContext.Provider
      value={{
        show,
        count,
        msg,
        showLoading,
      }}
    >
      {children}
    </GlobalLoadingContext.Provider>
  )
}
