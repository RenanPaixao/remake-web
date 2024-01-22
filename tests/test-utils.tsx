import { render, RenderOptions } from '@testing-library/react'
import { ChakraProvider } from '@chakra-ui/react'
import { ReactElement } from 'react'

// Disabled due to not needing to export a component.
// eslint-disable-next-line react-refresh/only-export-components
const Wrapper = ({ children }: {children: ReactElement}) => {
  return <ChakraProvider toastOptions={{
    defaultOptions: {
      duration: 4000,
      position: 'top'
    }
  }}>
    {children}
  </ChakraProvider>
}

/**
 * Custom render function that wraps the component with All Providers.
 * @param ui
 * @param options
 */
function customRender(ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) {
  return render(ui, { wrapper: Wrapper, ...options })
}

export {
  customRender
}
