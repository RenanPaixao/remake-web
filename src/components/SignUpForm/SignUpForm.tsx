import { useFormik } from 'formik'
import { Button, ButtonGroup, Checkbox, FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import * as Yup from 'yup'
import { supabase } from '../../utils/supabase.ts'
import { useErrorToast } from '../../hooks/toast/useErrorToast.tsx'
import { hasFormikError } from '../../utils/hasFormikError.ts'
import { useTranslation } from 'react-i18next'

const validationSchema = Yup.object({
  firstName: Yup.string().required('validations.required').max(50, 'validations.field-max-length').min(3, 'validations.field-min-length'),
  lastName: Yup.string().required('validations.required').max(50, 'validations.field-max-length').min(3, 'validations.field-min-length'),
  email: Yup.string().email('validations.email').required('validations.required').max(50, 'validations.field-max-length'),
  password: Yup.string().required('validations.required').min(8, 'validations.password'),
  isRecycler: Yup.boolean()
})

type FormValues = Yup.InferType<typeof validationSchema>

export const SignUpForm = () => {
  const { t } = useTranslation()
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
      <FormLabel htmlFor='firstName'>{t('labels.first-name')}</FormLabel>
      <Input
        name='firstName'
        aria-label='First Name'
        onChange={formik.handleChange}
        value={formik.values.firstName}
        onBlur={formik.handleBlur}
      />
      <FormErrorMessage>{formik.errors.firstName ? t(formik.errors.firstName) : null}</FormErrorMessage>
    </FormControl>

    <FormControl mt={4} isInvalid={hasFormikError('lastName', formik.touched, formik.errors)} isRequired>
      <FormLabel htmlFor='lastName'>{t('labels.last-name')}</FormLabel>
      <Input
        name='lastName'
        aria-label={'Last Name'}
        onChange={formik.handleChange}
        value={formik.values.lastName}
        onBlur={formik.handleBlur}
      />
      <FormErrorMessage>{formik.errors.lastName ? t(formik.errors.lastName) : null}</FormErrorMessage>
    </FormControl>

    <FormControl mt={4} isInvalid={hasFormikError('email', formik.touched, formik.errors)} isRequired>
      <FormLabel htmlFor='email'>{t('labels.email')}</FormLabel>
      <Input
        name='email'
        aria-label={'email'}
        onChange={formik.handleChange}
        value={formik.values.email}
        onBlur={formik.handleBlur}
        type={'email'}
      />
      <FormErrorMessage>{formik.errors.email ? t(formik.errors.email) : null}</FormErrorMessage>
    </FormControl>

    <FormControl mt={4} isInvalid={hasFormikError('password', formik.touched, formik.errors)} isRequired>
      <FormLabel htmlFor='password'>{t('labels.password')}</FormLabel>
      <Input
        data-testid={'password-input'}
        name='password'
        aria-label={'password'}
        type={'password'}
        onChange={formik.handleChange}
        value={formik.values.password}
        onBlur={formik.handleBlur}
      />
      <FormErrorMessage>{formik.errors.password ? t(formik.errors.password) : null}</FormErrorMessage>
    </FormControl>

    <FormControl display={'flex'} mt={4} >
      <Checkbox
        name='isRecycler'
        onChange={formik.handleChange}
        isChecked={formik.values.isRecycler}
      >
        {t('labels.is-recycler')}
      </Checkbox>
    </FormControl>

    <ButtonGroup mt={8} spacing={10} isDisabled={isLoading}>
      <Button variant={'outline'} isLoading={isLoading} onClick={goToLogin}>{t('labels.login')}</Button>
      <Button
        colorScheme={'blue'}
        isLoading={isLoading}
        type={'submit'}
        isDisabled={formik.isSubmitting || Object.keys(formik.errors).length > 0}
      >
        {t('actions.create-account')}
      </Button>
    </ButtonGroup>
  </form>
}
