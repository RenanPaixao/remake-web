import { Center, Heading } from '@chakra-ui/react'
import { QuestionsList } from '../components/QuestionsList/QuestionsList.tsx'
import { useTranslation } from 'react-i18next'

export const FAQPage = () => {
  const { t } = useTranslation()
  const contentList = [
    {
      title: t('faq.questions.how-to-separate'),
      content: t('faq.answers.how-to-separate')
    },
    {
      title: t('faq.questions.i-have-became-a-collector'),
      content: t('faq.answers.i-have-became-a-collector')
    },
    {
      title: t('faq.questions.how-many-places'),
      content: t('faq.answers.how-many-places')
    },
    {
      title: t('faq.questions.where-is-the-comment-section'),
      content: t('faq.answers.where-is-the-comment-section')
    }
  ]
  return <Center gap={8} pt={10} flexDirection={'column'}>
    <Heading as={'h1'}>FAQ</Heading>
    <QuestionsList minCardWidth={'22rem'} contentList={contentList} cardMargin={'2rem 0 0 0'}/>
  </Center>
}
