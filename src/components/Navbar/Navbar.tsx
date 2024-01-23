import { Button, Flex, FlexProps } from '@chakra-ui/react'
import { NavbarLogo } from './NavbarLogo.tsx'
import { LinkList } from './LinkList.tsx'
import logo from '../../assets/logo.webp'
import { TheLink } from '../TheLink/TheLink.tsx'

export const Navbar = (props: FlexProps) => {
  return <Flex w='100%' {...props}>
    <TheLink to={'/'}>
      <NavbarLogo h={'50px'} src={logo} />
    </TheLink>
    <LinkList />
    <Button colorScheme='red' variant='outline' w={'80px'}>Logout</Button>
  </Flex>
}
