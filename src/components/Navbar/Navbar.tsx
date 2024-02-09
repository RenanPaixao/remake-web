import { Button, Flex, FlexProps } from '@chakra-ui/react'
import { NavbarLogo } from './NavbarLogo.tsx'
import { LinkList } from './LinkList.tsx'
import logo from '../../assets/logo.webp'
import { TheLink } from '../TheLink/TheLink.tsx'
import { supabase } from '../../utils/supabase.ts'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useErrorToast } from '../../hooks/toast/useErrorToast.tsx'
import { useTranslation } from 'react-i18next'
import { LanguageButton } from '../LanguageButton/LanguageButton.tsx'

export const Navbar = (props: FlexProps) => {
  const { t } = useTranslation()
  const errorToast = useErrorToast()
  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState(false)

  /**
   * Logs the user out of the application.
   */
  async function logout() {
    setIsLoading(true)

    const { error } = await supabase.auth.signOut()
    setIsLoading(false)

    if (error) {
      errorToast({ description: error.message })
      console.error(error)
      return
    }

    navigate('/login')
  }

  return <Flex as={'nav'} w='100%' {...props}>
    <TheLink to={'/'} >
      <NavbarLogo alignSelf={'center'} h={'50px'} w={'92px'} src={logo} />
    </TheLink>
    <LinkList />
    <Flex gap={2}>
      <LanguageButton/>
      <Button colorScheme='red' variant='outline' w={'80px'} isLoading={isLoading} onClick={logout}>{t('actions.logout')}</Button>
    </Flex>
  </Flex>
}
