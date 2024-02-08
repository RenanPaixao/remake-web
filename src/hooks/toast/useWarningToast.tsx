import { useToast, UseToastOptions } from '@chakra-ui/react'
import i18n from '../../../locales'

export const useWarningToast = (): (options?: UseToastOptions) => void => {
  const showToast = useToast()

  return (options?: UseToastOptions) => {
    showToast({
      ...options,
      title: options?.title || i18n.t('labels.error'),
      description: options?.description,
      status: 'warning',
      duration: 4000,
      isClosable: true
    })
  }
}
