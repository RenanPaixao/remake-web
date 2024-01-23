import { Button, Flex, FlexProps, useToast } from '@chakra-ui/react'
import { NavbarLogo } from './NavbarLogo.tsx'
import { LinkList } from './LinkList.tsx'
import logo from '../../assets/logo.webp'
import { TheLink } from '../TheLink/TheLink.tsx'
import { supabase } from '../../utils/supabase.ts'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const Navbar = (props: FlexProps) => {
  const toast = useToast()
  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState(false)

  /**
   * Logs the user out of the application.
   */
  async function logout() {
    setIsLoading(true)

    const { error } = await supabase.auth.signOut()
    if (error) {
      toast({
        title: 'Error',
        description: error.message,
        status: 'error',
        duration: 4000,
        isClosable: true
      })
      console.error(error)
      return
    }

    setIsLoading(false)
    navigate('/login')
  }

  return <Flex w='100%' {...props}>
    <TheLink to={'/'}>
      <NavbarLogo h={'50px'} src={logo} />
    </TheLink>
    <LinkList />
    <Button colorScheme='red' variant='outline' w={'80px'} isLoading={isLoading} onClick={logout}>Logout</Button>
  </Flex>
}
