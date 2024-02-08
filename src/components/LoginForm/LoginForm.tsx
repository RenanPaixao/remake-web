import { Field, FieldProps, Form, Formik } from 'formik'
import { Button, FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../utils/supabase.ts'
import * as Yup from 'yup'
import { useErrorToast } from '../../hooks/toast/useErrorToast.tsx'
import { useSuccessToast } from '../../hooks/toast/useSuccessToast.tsx'
import { hasFormikError } from '../../utils/hasFormikError.ts'
import { useTranslation } from 'react-i18next'

const validationSchema = Yup.object({
  email: Yup.string().email('validations.email').required('validations.required'),
  password: Yup.string().required('validations.required').min(8, 'validations.password')
})

type FormValues = Yup.InferType<typeof validationSchema>

export const LoginForm = () => {
  const { t } = useTranslation()
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

    successToast({ description: t('messages.you-have-login') })

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
              <FormLabel htmlFor="email">{t('labels.email')}</FormLabel>
              <Input {...field} id="email" placeholder="Email" />
              <FormErrorMessage>{errors.email ? t(errors.email) : null}</FormErrorMessage>
            </FormControl>
          )}
        </Field>

        <Field name="password">
          {({ field }: FieldProps) => (
            <FormControl mt={4} isInvalid={hasFormikError('password', touched, errors)} isRequired>
              <FormLabel htmlFor="password">{t('labels.password')}</FormLabel>
              <Input type='password' {...field} id="password" placeholder={t('labels.password')}/>
              <FormErrorMessage>{errors.password ? t(errors.password) : null}</FormErrorMessage>
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
          {t('actions.login')}
        </Button>
      </Form>
    )}
  </Formik>
}
