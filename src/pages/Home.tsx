import { Center, Flex, Heading, Text } from '@chakra-ui/react'
import { CategoryList } from '../components/CategoryItem/CategoryList.tsx'
import { TheLink } from '../components/TheLink/TheLink.tsx'

export const Home = () => {
  return (
    <Center mt={20}>
      <Flex
        boxShadow='rgba(0, 0, 0, 0.56) 0px 22px 70px 4px'
        maxW={'880px'}
        w='60%'
        borderRadius='8px'
        p='4rem 5rem'
        direction='column'
        gap='2rem'
      >
        <Heading w='100%' size='md' colorScheme='red' textAlign='center'>
          Choose the category you want to discard:
        </Heading>
        <Text textDecoration={'underline'} opacity='60%'>
          <TheLink to={'/collect-places'}>
            See places closest to your location!
          </TheLink>
        </Text>
        <CategoryList />
        <Text textDecoration={'underline'} opacity='60%'>
          <TheLink to={'/faq'}>
            If you have any questions, visit our FAQ!
          </TheLink>
        </Text>
      </Flex>
    </Center>
  )
}
