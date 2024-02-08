import { Stack, StackItem } from '@chakra-ui/react'
import { NavbarLink } from './NavbarLink.tsx'
import { useTranslation } from 'react-i18next'

export const LinkList = () => {
  const { t } = useTranslation()

  return <Stack as={'ul'} w={'100%'} spacing={'8'} direction={['row']} justify={'center'} alignItems={'center'}>
    <StackItem as={'li'}>
      <NavbarLink to={'/'}>{t('actions.home')}</NavbarLink>
    </StackItem>
    <StackItem as={'li'}>
      <NavbarLink to={'/collect-places'}>{t('actions.collect-places')}</NavbarLink>
    </StackItem>
    <StackItem as={'li'}>
      <NavbarLink to={'/faq'}>{t('actions.faq')}</NavbarLink>
    </StackItem>
    <StackItem as={'li'}>
      <NavbarLink to={'/account'}>{t('actions.account')}</NavbarLink>
    </StackItem>
  </Stack>
}
