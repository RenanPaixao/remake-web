import { Navigate } from 'react-router-dom'
import { PropsWithChildren } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'

export const NeedsAuthentication = ({ children }: PropsWithChildren) => {
  const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated)

  return isAuthenticated ? children : <Navigate to={'/login'}/>
}
