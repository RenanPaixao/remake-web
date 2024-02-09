import { Center, Flex, Heading, Text } from '@chakra-ui/react'
import { CategoryList } from '../components/CategoryList/CategoryList.tsx'
import { TheLink } from '../components/TheLink/TheLink.tsx'
import { useTranslation } from 'react-i18next'

export const Home = () => {
  const { t } = useTranslation()
  return (
    <Center>
      <Flex
        my={20}
        boxShadow='rgba(0, 0, 0, 0.56) 0px 22px 70px 4px'
        maxW={'880px'}
        w='60%'
        borderRadius='8px'
        p='4rem 5rem'
        direction='column'
        gap='2rem'
      >
        <Heading w='100%' size='md' colorScheme='red' textAlign='center'>
          {t('home.choose-category')}
        </Heading>
        <Text textDecoration={'underline'} opacity='60%' role={'link'}>
          <TheLink to={'/collect-places'}>
            {t('home.see-closest-places')}
          </TheLink>
        </Text>
        <CategoryList />
        <Text textDecoration={'underline'} opacity='60%' role={'link'}>
          <TheLink to={'/faq'}>
            {t('home.if-you-have-questions')}
          </TheLink>
        </Text>
      </Flex>
    </Center>
  )
}
