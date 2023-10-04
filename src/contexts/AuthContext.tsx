import {
  useState,
  useContext,
  createContext,
  ReactNode,
  useEffect,
} from 'react'

import localStorageConfig from '../config/localStorage'
import { api } from '../lib/axios'

type SignInCredentials = {
  email: string
  password: string
}

type AuthProviderProps = {
  children: ReactNode
}

interface UserProps {
  id: string
  name: string
  email: string
}

interface AuthContextData {
  signIn(credentials: SignInCredentials): Promise<void>
  user: UserProps
  signOutApp(): void
}

export const AuthContext = createContext({} as AuthContextData)

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserProps>(() => {
    const userObj = localStorage.getItem(localStorageConfig.userDataKey)

    if (userObj) {
      return JSON.parse(userObj)
    }

    return {} as UserProps
  })

  const signOutApp = async () => {
    await api.post('/logout')

    localStorage.removeItem(localStorageConfig.userDataKey)

    setUser({} as UserProps)
  }

  const csrf = () => api.get('/sanctum/csrf-cookie')

  const signIn = async ({ email, password }: SignInCredentials) => {
    await csrf()
    const response = await api.post('/login', {
      email,
      password,
    })

    const { id, name } = response.data

    const userData = {
      id,
      name,
      email,
    }

    localStorage.setItem(
      localStorageConfig.userDataKey,
      JSON.stringify(userData),
    )

    setUser(userData)
  }

  useEffect(() => {
    api
      .get('/api/user')
      .then((response) => {
        const { id, name, email } = response.data

        localStorage.setItem(
          localStorageConfig.userDataKey,
          JSON.stringify({ id, name, email }),
        )

        setUser({ id, name, email })
      })
      .catch(() => {
        signOutApp()
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <AuthContext.Provider
      value={{
        signIn,
        user,
        signOutApp,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = (): AuthContextData => useContext(AuthContext)