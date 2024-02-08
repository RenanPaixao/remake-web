import { Box, Center, Image, Text } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { LoginForm } from '../components/LoginForm/LoginForm.tsx'
import { saveLocationOnSessionStorage } from '../utils/location.ts'
import logo from '../assets/logo.webp'
import { useTranslation } from 'react-i18next'

export const Login = (): React.JSX.Element => {
  const { t } = useTranslation()
  useEffect(() => {
    saveLocationOnSessionStorage()
  })
  return <>
    <Center flexDirection='column'>
      <Image src={logo} alt='Remake logo' my={20} />
      <LoginForm />

      <Box>
        <Text mt='2rem' fontSize='0.9rem'>{t('login.dont-have-an-account')}
          <Link to='/sign-up' role='link'>
            <strong> {t('login.register-here')}</strong>
          </Link>
        </Text>
        <Text fontSize='0.9rem'>
          <Link to='/forgot-password' role='link'>
            <strong>{t('login.forgot-password')}</strong>
          </Link>
        </Text>
      </Box>
    </Center>
  </>
}
