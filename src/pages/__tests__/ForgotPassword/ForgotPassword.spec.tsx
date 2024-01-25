import { fireEvent } from '@testing-library/dom'
import { act } from '@testing-library/react'
import { expect } from 'vitest'
import { customRender } from '../../../../tests/test-utils.tsx'
import { ForgotPassword } from '../../ForgotPassword.tsx'
import { supabase } from '../../../utils/supabase.ts'

const mockResetPasswordForEmail = vi.fn()
const toastMock = vi.fn()

supabase.auth.resetPasswordForEmail = mockResetPasswordForEmail

describe('ForgotPassword', () => {
  beforeEach(() => {
    vi.mock('react-router-dom', async importOriginal => {
      const actual: object = await importOriginal()
      return {
        ...actual,
        useNavigate: () => vi.fn()
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
    const { container } = customRender(<ForgotPassword/>)

    expect(container).toMatchSnapshot()
  })

  it('should send email and show confirmation modal', async () => {
    const { getByRole } = customRender(<ForgotPassword/>)

    const email = 'email@email.com'

    const emailInput = getByRole('textbox', { name: /Email/i })
    const submitButton = getByRole('button', { name: /Send Recovery Email/i })

    await act(async ()=> {
      fireEvent.change(emailInput, { target: { value: email  } })
      fireEvent.click(submitButton)
    })

    expect(mockResetPasswordForEmail).toHaveBeenCalledWith(email)
    expect(toastMock).not.toBeCalled()
  })

  it('should shown an error case something wrong happens when sending the recovery email', async () => {
    const { getByRole } = customRender(<ForgotPassword/>)

    const email = 'email@email.com'
    const error = new Error('Something went wrong')

    mockResetPasswordForEmail.mockReturnValueOnce({ error })

    const emailInput = getByRole('textbox', { name: /Email/i })
    const submitButton = getByRole('button', { name: /Send Recovery Email/i })

    await act(async ()=> {
      fireEvent.change(emailInput, { target: { value: email  } })
      fireEvent.click(submitButton)
    })

    expect(toastMock).toBeCalledTimes(1)
    expect(toastMock).toHaveBeenCalledWith(expect.objectContaining({
      description: error.message,
      status: 'error'
    }))
  })
})
