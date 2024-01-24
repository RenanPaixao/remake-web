import { FormikErrors, FormikTouched, useFormik } from 'formik'
import { Button, ButtonGroup, Checkbox, FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import * as Yup from 'yup'

const validationSchema = Yup.object({
  name: Yup.string().required('Required').max(50, 'Name must be at most 50 characters'),
  lastName: Yup.string().required('Required').max(50, 'Last name must be at most 50 characters'),
  email: Yup.string().email('Invalid email address').required('Required').max(50, 'Email must be at most 50 characters'),
  password: Yup.string().required('Required').min(8, 'Password must be at least 8 characters'),
  isRecycler: Yup.boolean()
})

type FormValues = Yup.InferType<typeof validationSchema>

export const SignUpForm = () => {
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const formik = useFormik<FormValues>({
    initialValues: {
      name: '',
      lastName: '',
      email: '',
      password: '',
      isRecycler: false
    },
    onSubmit: values => {
      setIsLoading(true)
      console.warn(values)
      setIsLoading(false)
    },
    validationSchema,
    validateOnBlur: true
  })

  /**
   * Go to the login page.
   */
  function goToLogin() {
    setIsLoading(true)
    navigate('/login')
    setIsLoading(false)
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

  return <form onSubmit={formik.handleSubmit}>
    <FormControl mt={4} isInvalid={hasError('name', formik.touched, formik.errors)} isRequired>
      <FormLabel htmlFor='name'>Name</FormLabel>
      <Input
        name='name'
        onChange={formik.handleChange}
        value={formik.values.name}
        onBlur={formik.handleBlur}
      />
      <FormErrorMessage>{formik.errors.name}</FormErrorMessage>
    </FormControl>

    <FormControl mt={4} isInvalid={hasError('lastName', formik.touched, formik.errors)} isRequired>
      <FormLabel htmlFor='lastName'>Last Name</FormLabel>
      <Input
        name='lastName'
        onChange={formik.handleChange}
        value={formik.values.lastName}
        onBlur={formik.handleBlur}
      />
      <FormErrorMessage>{formik.errors.lastName}</FormErrorMessage>
    </FormControl>

    <FormControl mt={4} isInvalid={hasError('email', formik.touched, formik.errors)} isRequired>
      <FormLabel htmlFor='email'>Email</FormLabel>
      <Input
        name='email'
        onChange={formik.handleChange}
        value={formik.values.email}
        onBlur={formik.handleBlur}
        type={'email'}
      />
      <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
    </FormControl>

    <FormControl mt={4} isInvalid={hasError('password', formik.touched, formik.errors)} isRequired>
      <FormLabel htmlFor='password'>Password</FormLabel>
      <Input
        name='password'
        type={'password'}
        onChange={formik.handleChange}
        value={formik.values.password}
        onBlur={formik.handleBlur}
      />
      <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
    </FormControl>

    <FormControl display={'flex'} mt={4}>
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
      <Button colorScheme={'blue'} isLoading={isLoading} type={'submit'}>Create Account</Button>
    </ButtonGroup>
  </form>
}
