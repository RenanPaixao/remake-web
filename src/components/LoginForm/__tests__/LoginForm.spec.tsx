import { LoginForm } from '../LoginForm.tsx'
import { customRender } from '../../../../tests/test-utils.tsx'
import { fireEvent, screen, waitFor } from '@testing-library/dom'
import { act } from '@testing-library/react'
import { expect } from 'vitest'
import { supabase } from '../../../utils/supabase.ts'

const navigateMock = vi.fn()
const supabaseLoginMock = vi.fn()
const toastMock = vi.fn()

supabase.auth.signInWithPassword = supabaseLoginMock
describe('LoginForm', () => {
  beforeEach(() => {
    vi.mock('react-router-dom', async importOriginal => {
      const actual: object = await importOriginal()
      return {
        ...actual,
        useNavigate: () => navigateMock
      }
    })

    vi.mock('@chakra-ui/react', async importOriginal => {
      const actual: object = await importOriginal()
      return {
        ...actual,
        useToast: () => toastMock
      }
    })
  })

  it('should render', async () => {
    const { container } = customRender(<LoginForm/>)

    expect(container).toMatchSnapshot()
  })

  it('should show validation errors', async () => {
    const { getByPlaceholderText, container } = customRender(<LoginForm/>)

    await fillForm('email', 'password')

    expect(container).toMatchSnapshot()

    const loginButton = screen.getByText('Login')

    expect(loginButton).toBeDisabled()

    await act(async () => {
      fireEvent.change(getByPlaceholderText('Email'), {
        target: {
          value: 'email@email.com'
        }
      })

      fireEvent.change(getByPlaceholderText('Password'), {
        target: {
          value: '12345678'
        }
      })
    })

    await waitFor(() => {
      expect(loginButton).toBeEnabled()
    }, {
      timeout: 2000
    })

    expect(container).toMatchSnapshot()
  })

  it('should not login successful', async () => {
    const error = new Error('auth error')
    supabaseLoginMock.mockReturnValue(Promise.resolve({
      error
    }))

    const { getByRole } = customRender(<LoginForm/>)

    await fillForm('wrong@email.com', '12345678')
    const loginButton = getByRole('button', { name: 'Login' })

    await waitFor(() => {
      expect(loginButton).toBeEnabled()
    }, {
      timeout: 2000
    })

    await act(async() => {
      fireEvent.click(loginButton)
    })

    await waitFor(() => {
      expect(toastMock).toHaveBeenCalledWith({
        title: 'Error',
        description: error.message,
        status: 'error',
        isClosable: true
      })
    })
  })

  it('should login successful', async () => {
    supabaseLoginMock.mockReturnValue(Promise.resolve({
      error: null
    }))

    const { getByRole } = customRender(<LoginForm/>)

    await fillForm('renan.paixao@email.com', '12345678')
    const loginButton = getByRole('button', { name: 'Login' })

    await waitFor(() => {
      expect(loginButton).toBeEnabled()
    }, {
      timeout: 2000
    })

    await act(async () => {
      fireEvent.click(loginButton)
    })

    await waitFor(() => {
      expect(toastMock).toHaveBeenCalledWith({
        title: 'Success',
        description: 'You have successfully logged in.',
        status: 'success',
        isClosable: true
      })
    },{
      timeout: 2000
    })

    expect(navigateMock).toHaveBeenCalledWith('/')
  })
})

const fillForm = async (email: string, password: string) => {
  const { getByPlaceholderText } = screen
  await act(async () => {
    fireEvent.change(getByPlaceholderText('Email'), {
      target: {
        value: email
      }
    })

    fireEvent.change(getByPlaceholderText('Password'), {
      target: {
        value: password
      }
    })
  })
}
