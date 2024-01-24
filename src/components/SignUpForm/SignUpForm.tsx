import { useFormik } from 'formik'
import { Button, ButtonGroup, Checkbox, FormControl, FormLabel, Input } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

export const SignUpForm = () => {
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const formik = useFormik({
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
    }
  })

  /**
   * Go to the login page.
   */
  function goToLogin() {
    setIsLoading(true)
    navigate('/login')
    setIsLoading(false)
  }

  return <form onSubmit={formik.handleSubmit}>
    <FormControl mt={4}>
      <FormLabel htmlFor='name'>Name</FormLabel>
      <Input
        name='name'
        onChange={formik.handleChange}
        value={formik.values.name}
      />
    </FormControl>

    <FormControl mt={4}>
      <FormLabel htmlFor='lastName'>Last Name</FormLabel>
      <Input
        name='lastName'
        onChange={formik.handleChange}
        value={formik.values.lastName}
      />
    </FormControl>

    <FormControl mt={4}>
      <FormLabel htmlFor='email'>Email</FormLabel>
      <Input
        name='email'
        onChange={formik.handleChange}
        value={formik.values.email}
        type={'email'}
      />
    </FormControl>

    <FormControl mt={4}>
      <FormLabel htmlFor='password'>Password</FormLabel>
      <Input
        name='password'
        type={'password'}
        onChange={formik.handleChange}
        value={formik.values.password}
      />
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
