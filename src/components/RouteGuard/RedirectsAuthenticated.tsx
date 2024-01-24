import { Navigate } from 'react-router-dom'
import { PropsWithChildren, useCallback, useContext, useEffect } from 'react'
import { UserContext } from '../../context/UserContext.tsx'
import { useToast } from '@chakra-ui/react'

export const RedirectsAuthenticated = ({ children }: PropsWithChildren) => {
  const { isAuthenticated } = useContext(UserContext)
  const toast = useToast()

  const showToast = useCallback(() => {
    toast({
      title: 'You are already logged in!',
      description: 'You are already logged in!',
      status: 'warning',
      duration: 4000,
      isClosable: true,
      position: 'top'
    })
  }, [toast])

  useEffect(() => {
    if (isAuthenticated()) {
      showToast()
    }
  }, [isAuthenticated, showToast])

  return isAuthenticated() ? <Navigate to={'/'} /> : children
}
