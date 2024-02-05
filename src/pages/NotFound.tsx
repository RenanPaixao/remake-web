import { Button, Center, Heading, Image } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import logo from '../assets/logo.webp'

export const NotFound = () => {
  const navigate = useNavigate()
  return <Center py={20} flexDirection={'column'}>
    <Image src={logo} alt='Remake logo' my={20} />
    <Heading as={'h1'} py={10}>Page Not found! </Heading>
    <Button colorScheme={'blue'} onClick={() => navigate(-1)}>Go back</Button>
  </Center>
}
