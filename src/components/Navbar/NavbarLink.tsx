import { TheLink } from '../TheLink/TheLink.tsx'
import { PropsWithChildren } from 'react'
import { Box } from '@chakra-ui/react'
import { LinkProps } from 'react-router-dom'

export const NavbarLink = ({ children, ...rest }: PropsWithChildren<LinkProps>) => {
  return <Box>
    <TheLink {...rest}>{children}</TheLink>
  </Box>
}
