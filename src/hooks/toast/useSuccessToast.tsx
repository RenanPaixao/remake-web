import { useToast, UseToastOptions } from '@chakra-ui/react'

export const useSuccessToast = (): (options?: UseToastOptions) => void => {
  const showToast = useToast()

  return (options?: UseToastOptions) =>{
    showToast({
      ...options,
      title: options?.title || 'Success',
      description: options?.description,
      status: 'success',
      duration: 4000,
      isClosable: true
    })
  }
}
