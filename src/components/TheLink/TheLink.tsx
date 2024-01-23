import { Link as ReactRouterLink, LinkProps } from 'react-router-dom'
import { Link as ChakraLink } from '@chakra-ui/react'
import { PropsWithChildren } from 'react'

/**
 * A wrapper around Chakra's Link component that uses React Router's Link component.
 * @param children
 * @param rest
 * @constructor
 */
export const TheLink = ({ children, ...rest }: PropsWithChildren<LinkProps>) => {
  return <ChakraLink as={ReactRouterLink} {...rest}>{children}</ChakraLink>
}
