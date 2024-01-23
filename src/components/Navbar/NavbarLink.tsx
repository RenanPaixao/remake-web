import { TheLink } from '../TheLink/TheLink.tsx'
import { PropsWithChildren } from 'react'
import { Button } from '@chakra-ui/react'
import { LinkProps } from 'react-router-dom'

export const NavbarLink = ({ children, ...rest }: PropsWithChildren<LinkProps>) => {
  return <TheLink {...rest}>
    <Button variant='ghost'>
      {children}
    </Button>
  </TheLink>
}
