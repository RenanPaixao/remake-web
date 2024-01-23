import { Box, Center, Text } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'
import { LoginForm } from '../components/LoginForm/LoginForm.tsx'

export const Login = (): React.JSX.Element => {
  return <Center height='100vh' flexDirection='column'>
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
}
