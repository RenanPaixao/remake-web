import { useToast, UseToastOptions } from '@chakra-ui/react'
import i18n from '../../../locales'
export const useSuccessToast = (): (options?: UseToastOptions) => void => {
  const showToast = useToast()

  return (options?: UseToastOptions) =>{
    showToast({
      ...options,
      title: options?.title || i18n.t('labels.success'),
      description: options?.description,
      status: 'success',
      duration: 4000,
      isClosable: true
    })
  }
}
