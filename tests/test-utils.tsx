import { render, RenderOptions } from '@testing-library/react'
import { ChakraProvider } from '@chakra-ui/react'
import { ReactElement } from 'react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from '@remix-run/router'
import { userEvent } from '@testing-library/user-event'
import { Provider } from 'react-redux'
import { RootState } from '../src/store'
import { configureStore } from '@reduxjs/toolkit'
import { createUserSlice } from '../src/store/reducers/user/userSlice.ts'

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

/**
 * Custom render function that wraps the component with UserContext and other common contexts.
 * @param ui
 * @param initialState
 */
function renderWithStore(ui: ReactElement, initialState?: Partial<RootState>) {
  const state = {
    user: {
      userInformation: {
        id: '39f35111-a2d7-48c2-8b0a-ed0a70ed79c6',
        email: 'test.email@email.com',
        fullName: 'john doe',
        isRecycler: true,
        ...(initialState?.user?.userInformation ?? {})
      },
      isAuthenticated: initialState?.user?.isAuthenticated || true
    }
  }

  const userSlice = createUserSlice(initialState?.user ?? state.user)

  const store = configureStore({
    reducer: {
      user: userSlice.reducer
    }
  })

  return customRender(
    <Provider store={store}>
      {ui}
    </Provider>
  )
}

export {
  customRender,
  renderWithStore,
  testingHistory,
  user
}
