import { customRender } from '../../../../tests/test-utils.tsx'
import { fireEvent } from '@testing-library/dom'
import { act } from '@testing-library/react'
import { supabase } from '../../../utils/supabase.ts'
import { Navbar } from '../Navbar.tsx'

const navigateMock = vi.fn()
const supabaseSignOutMock = vi.fn()
const toastMock = vi.fn()

supabase.auth.signOut = supabaseSignOutMock
describe('Navbar', () => {
  beforeEach(() => {
    vi.resetAllMocks()

    vi.mock('react-router-dom', async () => {
      const actual: object = await vi.importActual('react-router-dom')
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
    const { container } = customRender(<Navbar/>)

    expect(container).toMatchSnapshot()
  })

  it('should logout successful', async () => {
    supabaseSignOutMock.mockReturnValue(Promise.resolve({
      error: null
    }))

    const { getByRole } = customRender(<Navbar/>)
    const logoutButton = getByRole('button', { name: /logout/i })

    await act(async () => {
      fireEvent.click(logoutButton)
    })

    expect(logoutButton).not.toHaveAttribute('isLoading')
    expect(navigateMock).toHaveBeenCalledWith('/login')
  })

  it('should not logout successful', async () => {
    supabaseSignOutMock.mockReturnValue(Promise.resolve({
      error: new Error('error')
    }))

    const { getByText } = customRender(<Navbar/>)
    const logoutButton = getByText(/logout/i)

    await act(async () => {
      fireEvent.click(logoutButton)
    })

    expect(logoutButton).not.toHaveAttribute('isLoading')
    expect(toastMock.mock.calls[0][0]).toEqual({
      title: 'Error',
      description: 'error',
      status: 'error',
      duration: 4000,
      isClosable: true
    })

    expect(navigateMock).not.toHaveBeenCalled()
  })
})
