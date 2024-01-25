import { Field, FieldProps, Form, Formik } from 'formik'
import { Button, FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../utils/supabase.ts'
import * as Yup from 'yup'
import { useErrorToast } from '../../hooks/toast/useErrorToast.tsx'
import { useSuccessToast } from '../../hooks/toast/useSuccessToast.tsx'
import { hasFormikError } from '../../utils/hasFormikError.ts'

const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email address').required('Required'),
  password: Yup.string().required('Required').min(8, 'Password must be at least 8 characters')
})

type FormValues = Yup.InferType<typeof validationSchema>

export const LoginForm = () => {
  const errorToast = useErrorToast()
  const successToast = useSuccessToast()
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
      errorToast({ description: error.message })
      console.error(error)
      return
    }

    successToast({ description: 'You have successfully logged in.' })

    navigate('/')
  }

  return <Formik initialValues={{
    email: '',
    password: ''
  }}
  onSubmit={submitForm}
  validationSchema={validationSchema}
  >
    {({ isSubmitting, errors, touched }) => (
      <Form>
        <Field name="email">
          {({ field }: FieldProps) => (
            <FormControl isInvalid={hasFormikError('email', touched, errors)} isRequired>
              <FormLabel htmlFor="email">Email</FormLabel>
              <Input {...field} id="email" placeholder="Email" />
              <FormErrorMessage>{errors.email}</FormErrorMessage>
            </FormControl>
          )}
        </Field>

        <Field name="password">
          {({ field }: FieldProps) => (
            <FormControl mt={4} isInvalid={hasFormikError('password', touched, errors)} isRequired>
              <FormLabel htmlFor="password">Password</FormLabel>
              <Input type='password' {...field} id="password" placeholder="Password"/>
              <FormErrorMessage>{errors.password}</FormErrorMessage>
            </FormControl>
          )}
        </Field >

        <Button
          colorScheme='blue'
          color="white"
          role='button'
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
}
