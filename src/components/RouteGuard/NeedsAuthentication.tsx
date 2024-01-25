import { Navigate } from 'react-router-dom'
import { PropsWithChildren, useContext } from 'react'
import { UserContext } from '../../context/UserContext.tsx'

export const NeedsAuthentication = ({ children }: PropsWithChildren) => {
  const { isAuthenticated } = useContext(UserContext)

  return isAuthenticated ? children : <Navigate to={'/login'}/>
}
