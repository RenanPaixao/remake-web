import { Stack, StackItem } from '@chakra-ui/react'
import { NavbarLink } from './NavbarLink.tsx'

export const LinkList = () => {
  return <Stack as={'ul'} w={'100%'} spacing={'8'} direction={['row']} justify={'center'} alignItems={'center'}>
    <StackItem as={'li'}>
      <NavbarLink to={'/'}>Home</NavbarLink>
    </StackItem>
    <StackItem as={'li'}>
      <NavbarLink to={'/collect-places'}>Collect Places</NavbarLink>
    </StackItem>
    <StackItem as={'li'}>
      <NavbarLink to={'/faq'}>FAQ</NavbarLink>
    </StackItem>
    <StackItem as={'li'}>
      <NavbarLink to={'/account'}>Account</NavbarLink>
    </StackItem>
  </Stack>
}
