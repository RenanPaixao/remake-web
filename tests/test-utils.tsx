import { render, RenderOptions } from '@testing-library/react'
import { ChakraProvider } from '@chakra-ui/react'
import { ReactElement } from 'react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from '@remix-run/router'
import { userEvent } from '@testing-library/user-event'

const testingHistory = createMemoryHistory()
const user = userEvent.setup()

// Disabled due to not needing to export a component.
// eslint-disable-next-line react-refresh/only-export-components
const Wrapper = ({ children }: {children: ReactElement}) => {
  // Creates a fake router for testing.
  return <Router location={testingHistory.location} navigator={testingHistory}>
    <ChakraProvider toastOptions={{
      defaultOptions: {
        duration: 4000,
        position: 'top'
      }
    }}>
      {children}
    </ChakraProvider>
  </Router>
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
  customRender,
  testingHistory,
  user
}
