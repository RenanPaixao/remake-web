import { useToast, UseToastOptions } from '@chakra-ui/react'

export const useErrorToast = (): (options?: UseToastOptions) => void => {
  const showToast = useToast()

  return (options?: UseToastOptions) => {
    showToast({
      ...options,
      title: options?.title || 'Error',
      description: options?.description,
      status: 'error',
      duration: 4000,
      isClosable: true
    })
  }
}
