import { useFormik } from 'formik'
import {
  Button,
  ButtonGroup,
  Center,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import { hasFormikError } from '../utils/hasFormikError.ts'
import { supabase } from '../utils/supabase.ts'
import { useErrorToast } from '../hooks/toast/useErrorToast.tsx'
import { useState } from 'react'
import { LanguageButton } from '../components/LanguageButton/LanguageButton.tsx'

const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email address').required('Required').max(50, 'Email must be at most 50 characters')
})

type FormValues = Yup.InferType<typeof validationSchema>

export const ForgotPassword = () => {
  const navigate = useNavigate()
  const toastError = useErrorToast()
  const [isOpen, setIsOpen] = useState(false)

  const formik = useFormik<FormValues>({
    initialValues:{
      email: ''
    },
    onSubmit: async values => {
      const { error } = await supabase.auth.resetPasswordForEmail(values.email)

      if(error) {
        toastError({ description: error.message })
        console.error(error)
        return
      }

      setIsOpen(true)
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

  /**
   * Close the modal.
   */
  function closeModal() {
    setIsOpen(false)
  }

  return <>
    <Center pt={28} flexDirection={'column'}>
      <Heading size={'sm'} mb={8}>
      Enter your email address that we will send you a recovery email.
      </Heading>
      <form onSubmit={formik.handleSubmit}>
        <FormControl
          mt={4}
          isRequired
          isInvalid={hasFormikError<FormValues>('email', formik.touched, formik.errors)}
        >
          <FormLabel htmlFor="email">Email</FormLabel>
          <Input
            aria-label={'Email'}
            name={'email'}
            type={'email'}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
        </FormControl>

        <ButtonGroup mt={8} spacing={10} isDisabled={formik.isSubmitting}>
          <Button variant={'outline'} isLoading={formik.isSubmitting} onClick={goToLogin}>Login</Button>
          <Button
            colorScheme={'blue'}
            type={'submit'}
            isLoading={formik.isSubmitting}
            isDisabled={Object.keys(formik.errors).length > 0}
          >
          Send Recovery Email
          </Button>
        </ButtonGroup>
      </form>
      <LanguageButton mt={'200px'} variant={'ghost'}/>
    </Center>

    <Modal
      isOpen={isOpen}
      onClose={closeModal}
      closeOnOverlayClick={false}
      closeOnEsc={false}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Recovery Email Sent</ModalHeader>
        <ModalBody>
          <Text>We have sent you an email to reset your password. Check your inbox!</Text>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme={'blue'} onClick={goToLogin}>Login</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  </>
}
