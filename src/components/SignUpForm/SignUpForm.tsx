import { useFormik } from 'formik'
import { Button, ButtonGroup, Checkbox, FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import * as Yup from 'yup'
import { supabase } from '../../utils/supabase.ts'
import { useErrorToast } from '../../hooks/toast/useErrorToast.tsx'
import { hasFormikError } from '../../utils/hasFormikError.ts'

const validationSchema = Yup.object({
  firstName: Yup.string().required('Required').max(50, 'Name must be at most 50 characters'),
  lastName: Yup.string().required('Required').max(50, 'Last name must be at most 50 characters'),
  email: Yup.string().email('Invalid email address').required('Required').max(50, 'Email must be at most 50 characters'),
  password: Yup.string().required('Required').min(8, 'Password must be at least 8 characters'),
  isRecycler: Yup.boolean()
})

type FormValues = Yup.InferType<typeof validationSchema>

export const SignUpForm = () => {
  const errorToast = useErrorToast()
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()
  const formik = useFormik<FormValues>({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      isRecycler: false
    },
    onSubmit: async values => {
      setIsLoading(true)
      const { error } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
        options: {
          data: {
            first_name: values.firstName,
            last_name: values.lastName,
            is_recycler: values.isRecycler
          }
        }
      })
      setIsLoading(false)

      if(error) {
        errorToast({ description: error.message })
        console.error(error)
        return
      }

      navigate('/')
    },
    validationSchema,
    validateOnBlur: true
  })

  /**
   * Go to the login page.
   */
  function goToLogin() {
    navigate('/login')
  }

  return <form onSubmit={formik.handleSubmit}>
    <FormControl mt={4} isInvalid={hasFormikError('firstName', formik.touched, formik.errors)} isRequired>
      <FormLabel htmlFor='firstName'>First Name</FormLabel>
      <Input
        name='firstName'
        title='First Name'
        onChange={formik.handleChange}
        value={formik.values.firstName}
        onBlur={formik.handleBlur}
      />
      <FormErrorMessage>{formik.errors.firstName}</FormErrorMessage>
    </FormControl>

    <FormControl mt={4} isInvalid={hasFormikError('lastName', formik.touched, formik.errors)} isRequired>
      <FormLabel htmlFor='lastName'>Last Name</FormLabel>
      <Input
        name='lastName'
        title={'Last Name'}
        onChange={formik.handleChange}
        value={formik.values.lastName}
        onBlur={formik.handleBlur}
      />
      <FormErrorMessage>{formik.errors.lastName}</FormErrorMessage>
    </FormControl>

    <FormControl mt={4} isInvalid={hasFormikError('email', formik.touched, formik.errors)} isRequired>
      <FormLabel htmlFor='email'>Email</FormLabel>
      <Input
        name='email'
        title={'email'}
        onChange={formik.handleChange}
        value={formik.values.email}
        onBlur={formik.handleBlur}
        type={'email'}
      />
      <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
    </FormControl>

    <FormControl mt={4} isInvalid={hasFormikError('password', formik.touched, formik.errors)} isRequired>
      <FormLabel htmlFor='password'>Password</FormLabel>
      <Input
        data-testid={'password-input'}
        name='password'
        title={'password'}
        type={'password'}
        onChange={formik.handleChange}
        value={formik.values.password}
        onBlur={formik.handleBlur}
      />
      <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
    </FormControl>

    <FormControl display={'flex'} mt={4} >
      <Checkbox
        name='isRecycler'
        onChange={formik.handleChange}
        isChecked={formik.values.isRecycler}
      >
        Are you a recycler?
      </Checkbox>
    </FormControl>

    <ButtonGroup mt={8} spacing={10} isDisabled={isLoading}>
      <Button variant={'outline'} isLoading={isLoading} onClick={goToLogin}>Login</Button>
      <Button
        colorScheme={'blue'}
        isLoading={isLoading}
        type={'submit'}
        isDisabled={formik.isSubmitting || Object.keys(formik.errors).length > 0}
      >
        Create Account
      </Button>
    </ButtonGroup>
  </form>
}
