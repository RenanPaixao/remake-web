import { Box, Image, ImageProps } from '@chakra-ui/react'

export const NavbarLogo = (props: ImageProps) => {
  return <Box>
    <Image {...props} fallbackSrc='https://via.placeholder.com/50' />
  </Box>
}
