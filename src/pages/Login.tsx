import { Box, Center, Image, Text } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { LoginForm } from '../components/LoginForm/LoginForm.tsx'
import { saveLocationOnSessionStorage } from '../utils/location.ts'
import logo from '../assets/logo.webp'

export const Login = (): React.JSX.Element => {
  useEffect(() => {
    saveLocationOnSessionStorage()
  })
  return <>
    <Center flexDirection='column'>
      <Image src={logo} alt='Remake logo' my={20} />
      <LoginForm />

      <Box>
        <Text mt='2rem' fontSize='0.9rem'>Don't have an account?
          <Link to='/sign-up' role='link'>
            <strong> Register here!</strong>
          </Link>
        </Text>
        <Text fontSize='0.9rem'>
          <Link to='/forgot-password' role='link'>
            <strong>Forgot password?</strong>
          </Link>
        </Text>
      </Box>
    </Center>
  </>
}
