import { useToast, UseToastOptions } from '@chakra-ui/react'

export const useWarningToast = (): (options?: UseToastOptions) => void => {
  const showToast = useToast()

  return (options?: UseToastOptions) => {
    showToast({
      ...options,
      title: options?.title || 'Warning',
      description: options?.description,
      status: 'warning',
      duration: 4000,
      isClosable: true
    })
  }
}
