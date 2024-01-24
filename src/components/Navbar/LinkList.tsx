import { Stack, StackItem } from '@chakra-ui/react'
import { NavbarLink } from './NavbarLink.tsx'

export const LinkList = () => {
  return <Stack w={'100%'} spacing={'8'} direction={['row']} justify={'center'} alignItems={'center'}>
    <StackItem>
      <NavbarLink to={'/'}>Home</NavbarLink>
    </StackItem>
    <StackItem>
      <NavbarLink to={'/collect-places'}>Collect Places</NavbarLink>
    </StackItem>
    <StackItem>
      <NavbarLink to={'/faq'}>FAQ</NavbarLink>
    </StackItem>
    <StackItem>
      <NavbarLink to={'/account'}>Account</NavbarLink>
    </StackItem>
  </Stack>
}
