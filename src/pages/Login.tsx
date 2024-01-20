import { Button, Center, FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/react'
import { Field, Form, Formik, FormikTouched, FormikErrors } from 'formik'
import * as Yup from 'yup'
import React from 'react'

interface FormValues {
  email: string
  password: string
}

const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email address').required('Required'),
  password: Yup.string().required('Required').min(8, 'Password must be at least 8 characters')
})

export const Login = (): React.JSX.Element => {
  /**
   * Submit the login form.
   * @param values
   */
  function submitForm(values: FormValues): void {
    console.log(values)
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

  return <Center height='100vh'>
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
                <Input {...field} id="password" placeholder="Password" />
                <FormErrorMessage>{errors.password}</FormErrorMessage>
              </FormControl>
            )}
          </Field >

          <Button
            colorScheme='blue'
            color="white"
            mt={4}
            isLoading={isSubmitting}
            isDisabled={isSubmitting || Object.keys(errors).length > 0 || Object.keys(touched).length === 0}
            type="submit"
          >
            Login
          </Button>
        </Form>
      )}
    </Formik>
  </Center>
}
