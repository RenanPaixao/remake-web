import { Button, Card, CardFooter, CardHeader, Heading, Text } from '@chakra-ui/react'

interface IProps{
  title: string
  distance: string
  address: string
}
export const PlaceCard = (props: IProps) => {
  return <Card variant={'elevated'} size={'md'} px={2} flexBasis={'40rem'} boxShadow={'rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px, rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px, rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px'}>
    <CardHeader display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
      <Heading as={'h3'} size={'md'} textAlign={'left'}>
        {props.title}
      </Heading>

      <Text ml={2} as={'h5'} size={'sm'} textAlign={'left'}>
        {props.distance}
      </Text>
    </CardHeader>

    <CardFooter alignItems={'center'}>
      <Text display={'box'} pr={'1rem'} textAlign={'left'}>{props.address}</Text>
      <Button colorScheme={'blue'} ml={'auto'}>Go!</Button>
    </CardFooter>
  </Card>
}
