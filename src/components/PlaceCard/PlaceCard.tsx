import { Button, Card, CardFooter, CardHeader, CardProps, Heading, Text } from '@chakra-ui/react'

interface IProps extends CardProps{
  title: string
  distance: string
  address: string
  onClick: () => void
}

export const PlaceCard = (props: IProps) => {
  const { flexBasis = '40rem', onClick, title, distance, address, ...rest } = props
  return <Card {...rest} variant={'elevated'} size={'md'} px={2} flexBasis={flexBasis} boxShadow={'rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px, rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px, rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px'}>
    <CardHeader display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
      <Heading as={'h3'} size={'md'} textAlign={'left'}>
        {title}
      </Heading>

      <Text ml={2} as={'h5'} size={'sm'} textAlign={'left'}>
        {distance}
      </Text>
    </CardHeader>

    <CardFooter alignItems={'center'}>
      <Text display={'box'} pr={'1rem'} textAlign={'left'}>{address}</Text>
      <Button onClick={onClick} colorScheme={'blue'} ml={'auto'}>Go!</Button>
    </CardFooter>
  </Card>
}
