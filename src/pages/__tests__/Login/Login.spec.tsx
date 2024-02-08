import { Login } from '../../Login.tsx'
import { fireEvent } from '@testing-library/dom'
import { act } from '@testing-library/react'
import { expect } from 'vitest'
import { customRender, testingHistory } from '../../../../tests/test-utils.tsx'

type Navigator = {
  geolocation: {
    getCurrentPosition: (success: () => void) => void
  }
}

(navigator as Navigator).geolocation  = {
  getCurrentPosition: vi.fn().mockImplementation(success =>
    Promise.resolve(
      success({
        coords: {
          latitude: 0,
          longitude: 0
        }
      })
    )
  )
}

const mockPushHistory = vi.fn()
testingHistory.push = mockPushHistory

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
    const { container } = customRender(<Login/>)

    expect(container).toMatchSnapshot()
  })

  it('should redirect correctly to sign-up and forgot-password', async () => {
    const { getByRole } = customRender(<Login/>)

    const signUpLink = getByRole('link', { name: /register here!/i })
    const forgotPasswordLink = getByRole('link', { name: /forgot your password?/i })

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

  it('should assert that location is being saved on sessionStorage', async () => {
    customRender(<Login/>)

    expect(sessionStorage.getItem('location')).toEqual(JSON.stringify({ latitude:0,longitude:0 }))
  })
})
