import { Navigate } from 'react-router-dom'
import { PropsWithChildren, useCallback, useContext, useEffect } from 'react'
import { UserContext } from '../../context/UserContext.tsx'
import { useWarningToast } from '../../hooks/toast/useWarningToast.tsx'

export const RedirectsAuthenticated = ({ children }: PropsWithChildren) => {
  const { isAuthenticated } = useContext(UserContext)
  const warningToast = useWarningToast()

  const showWarningToast = useCallback(() => {
    warningToast({ description: 'You are already logged in!' })
  }, [warningToast])

  useEffect(() => {
    if (isAuthenticated) {
      showWarningToast()
    }
  }, [isAuthenticated, showWarningToast])

  return isAuthenticated ? <Navigate to={'/'} /> : children
}
