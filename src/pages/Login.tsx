import { Button, Center, FormControl, FormErrorMessage, FormLabel, Input, Text } from '@chakra-ui/react'
import { Field, Form, Formik, FormikTouched, FormikErrors } from 'formik'
import * as Yup from 'yup'
import React from 'react'
import { supabase } from '../utils/supabase.ts'
import { Link, useNavigate } from 'react-router-dom'
import { useToast } from '@chakra-ui/react'

interface FormValues {
  email: string
  password: string
}

const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email address').required('Required'),
  password: Yup.string().required('Required').min(8, 'Password must be at least 8 characters')
})

export const Login = (): React.JSX.Element => {
  const toast = useToast()
  const navigate = useNavigate()
  /**
   * Submit the login form.
   * @param values
   */
  async function submitForm(values: FormValues): Promise<void> {
    const { error } = await supabase.auth.signInWithPassword({
      email: values.email,
      password: values.password
    })

    if (error) {
      toast({
        title: 'Error',
        description: error.message,
        status: 'error',
        isClosable: true
      })
      console.error(error)
      return
    }

    toast({
      title: 'Success',
      description: 'You have successfully logged in.',
      status: 'success',
      isClosable: true
    })

    navigate('/')
  }

  /**
   * Check if a field has an error.
   *
   * @param name - The name of the field.
   * @param touched - The object with all touched fields.
   * @param errors - The object with all errors.
   */
  function hasError(name: keyof FormValues, touched: FormikTouched<FormValues>, errors: FormikErrors<FormValues>): boolean {
    return !!touched[name] && !!errors[name]
  }

  return <Center height='100vh' flexDirection='column'>
    <Formik initialValues={{
      email: '',
      password: ''
    }}
    onSubmit={submitForm}
    validationSchema={validationSchema}
    >
      {({ isSubmitting, errors, touched }) => (
        <Form>
          <Field name="email">
            {({ field }: any) => (
              <FormControl isInvalid={hasError('email', touched, errors)} isRequired>
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input {...field} id="email" placeholder="Email" />
                <FormErrorMessage>{errors.email}</FormErrorMessage>
              </FormControl>
            )}
          </Field>

          <Field name="password">
            {({ field }: any) => (
              <FormControl mt={4} isInvalid={hasError('password', touched, errors)} isRequired>
                <FormLabel htmlFor="password">Password</FormLabel>
                <Input type='password' {...field} id="password" placeholder="Password" />
                <FormErrorMessage>{errors.password}</FormErrorMessage>
              </FormControl>
            )}
          </Field >

          <Button
            colorScheme='blue'
            color="white"
            mt={4}
            isLoading={isSubmitting}
            isDisabled={isSubmitting || Object.keys(errors).length > 0 }
            type="submit"
          >
            Login
          </Button>
        </Form>
      )}
    </Formik>
    <Text mt='2rem' fontSize='0.9rem'>Don't have an account?
      <Link to='/sign-up'>
        <strong> Register here!</strong>
      </Link>
    </Text>
    <Text fontSize='0.9rem'>
      <Link to='/forgot-password'>
        <strong>Forgot password?</strong>
      </Link>
    </Text>
  </Center>
}
