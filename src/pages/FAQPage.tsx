import { Center, Heading } from '@chakra-ui/react'
import { QuestionsList } from '../components/QuestionsList/QuestionsList.tsx'

export const FAQPage = () => {
  const contentList = [
    {
      title: 'How to separate waste for recycling?',
      content: 'Place separate bins for different types of waste in a convenient location in your home and Make sure everyone in your household understands the importance of recycling. '
    },
    {
      title: 'I\'ve became a collector. How to add a place?',
      content: 'Go to account page and click on "Become a collector" button. Then you will be able to add a place.'
    },
    {
      title: 'How many places can I add?',
      content: 'You can add as many places as you want.'
    },
    {
      title: 'Where is the comments section about places present in the mobile application?',
      content: 'The comments about places is not present in the desktop application.'
    }
  ]
  return <Center gap={8} pt={10} flexDirection={'column'}>
    <Heading as={'h1'}>FAQ</Heading>
    <QuestionsList minCardWidth={'22rem'} contentList={contentList} cardMargin={'2rem 0 0 0'}/>
  </Center>
}
