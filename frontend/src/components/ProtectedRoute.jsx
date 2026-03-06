import { Navigate } from 'react-router'
import { useAuth } from '../contexts/AuthContext'
import { LoadingScreen } from './ui/Spinner'

export function ProtectedRoute({ children }) {
  const { user, isLoading } = useAuth()

  if (isLoading) {
    return <LoadingScreen />
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
}
