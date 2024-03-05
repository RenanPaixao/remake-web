import { Navigate } from 'react-router-dom'
import { PropsWithChildren, useCallback, useEffect } from 'react'
import { useWarningToast } from '../../hooks/toast/useWarningToast.tsx'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'

export const RedirectsAuthenticated = ({ children }: PropsWithChildren) => {
  const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated)
  const warningToast = useWarningToast()

  const showWarningToast = useCallback(() => {
    warningToast({ description: 'You are already logged in!' })
  }, [warningToast])

  useEffect(() => {
    if (isAuthenticated) {
      showWarningToast()
    }
  }, [])

  return isAuthenticated ? <Navigate to={'/'} /> : children
}
