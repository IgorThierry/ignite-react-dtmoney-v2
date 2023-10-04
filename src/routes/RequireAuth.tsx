import { useLocation, Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export function RequireAuth({ children }: { children: JSX.Element }) {
  const location = useLocation()
  const { user } = useAuth()

  if (!user.id) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return children
}
