import { SignUpForm } from '../components/SignUpForm/SignUpForm.tsx'
import { Center } from '@chakra-ui/react'
import { LanguageButton } from '../components/LanguageButton/LanguageButton.tsx'

export const SignUp = () => {
  return <Center pt={28} flexDirection={'column'}>
    <SignUpForm/>
    <LanguageButton mt={'200px'} variant={'ghost'}/>
  </Center>
}
