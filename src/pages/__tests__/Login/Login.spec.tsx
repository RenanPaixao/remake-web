import { customRender } from '../../../../tests/test-utils.tsx'
import { Login } from '../../Login.tsx'
import { fireEvent } from '@testing-library/dom'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from '@remix-run/router'
import { ReactElement } from 'react'
import { act } from '@testing-library/react'
import { expect } from 'vitest'

// This is needed to test components that has Link components from react-router-dom.
const history = createMemoryHistory()
const renderWithRouter = (ui: ReactElement) => {
  return customRender(
    <Router location={history.location} navigator={history}>
      {ui}
    </Router>
  )
}

const mockPushHistory = vi.fn()
history.push = mockPushHistory

describe('Login', () => {
  beforeEach(() => {
    vi.mock('react-router-dom', async importOriginal => {
      const actual: object = await importOriginal()
      return {
        ...actual,
        useNavigate: () => vi.fn()
      }
    })
  })

  it('should render', async () => {
    const { container } = renderWithRouter(<Login/>)

    expect(container).toMatchSnapshot()
  })

  it('should redirect correctly to sign-up and forgot-password', async () => {
    const { getByRole } = renderWithRouter(<Login/>)

    const signUpLink = getByRole('link', { name: /register here!/i })
    const forgotPasswordLink = getByRole('link', { name: /forgot password?/i })

    expect(signUpLink).toHaveAttribute('href', '/sign-up')
    expect(forgotPasswordLink).toHaveAttribute('href', '/forgot-password')

    act(()=> {
      fireEvent.click(signUpLink)
      fireEvent.click(forgotPasswordLink)
    })

    expect(mockPushHistory).toHaveBeenCalledTimes(2)
    expect(mockPushHistory.mock.calls[0]).toEqual(expect.arrayContaining([{
      pathname: '/sign-up',
      search: '',
      hash: ''
    }]))

    expect(mockPushHistory.mock.calls[1]).toEqual(expect.arrayContaining([
      {
        pathname: '/forgot-password',
        search: '',
        hash: ''
      }
    ]))
  })
})
