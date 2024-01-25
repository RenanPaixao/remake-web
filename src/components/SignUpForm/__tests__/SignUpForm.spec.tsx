import { fireEvent, screen, waitFor } from '@testing-library/dom'
import { act } from '@testing-library/react'
import { expect } from 'vitest'
import { customRender } from '../../../../tests/test-utils.tsx'
import { SignUpForm } from '../SignUpForm.tsx'
import { supabase } from '../../../utils/supabase.ts'

const supabaseSignUpMock = vi.fn()
supabase.auth.signUp = supabaseSignUpMock

const navigateMock = vi.fn()
const toastMock = vi.fn()

const formValues = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@email.com',
  password: '12345678',
  isRecycler: true
}

describe('SignUpForm', () => {
  beforeEach(() => {
    vi.resetAllMocks()
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
    const { container } = customRender(<SignUpForm />)

    expect(container).toMatchSnapshot()
  })

  it('should create an account successfully', async () => {
    supabaseSignUpMock.mockReturnValueOnce({ error: null })

    const { getByRole } = customRender(<SignUpForm/>)
    const submitButton = getByRole('button', { name: /create account/i })

    await fillForm(formValues)

    await act(async () => {
      fireEvent.click(submitButton)
    })

    await waitFor(() => {
      expect(supabaseSignUpMock).toHaveBeenCalledTimes(1)
      expect(supabaseSignUpMock.mock.calls[0][0]).toEqual({
        email: formValues.email,
        password: formValues.password,
        options: {
          data: {
            first_name: formValues.firstName,
            last_name: formValues.lastName,
            is_recycler: formValues.isRecycler
          }
        }
      })

      expect(navigateMock).toHaveBeenCalledTimes(1)
      expect(navigateMock.mock.calls[0][0]).toEqual('/')
    })
  })
  it('should not create an account successfully', async () => {
    const error = new Error('User already exists')
    supabaseSignUpMock.mockReturnValueOnce({ error  })

    const { getByRole } = customRender(<SignUpForm/>)
    const submitButton = getByRole('button', { name: /create account/i })

    await fillForm(formValues)

    await act(async () => {
      fireEvent.click(submitButton)
    })

    expect(toastMock.mock.calls[0][0]).toEqual(expect.objectContaining({
      description: error.message,
      status: 'error'
    }))
    expect(navigateMock).not.toBeCalled()
  })
})

const fillForm = async (values: Omit<typeof formValues, 'isRecycler'>) => {
  const {
    firstName,
    lastName,
    password,
    email
  } = values
  const { getByRole, getByTestId } = screen
  const firstNameInput = getByRole('textbox', { name: /first name/i })
  const lastNameInput = getByRole('textbox', { name: /last name/i })
  const emailInput = getByRole('textbox', { name: /email/i })
  // Password input has no role, so we need use the data-testid attribute
  const passwordInput = getByTestId('password-input')
  const isRecyclerInput = getByRole('checkbox')

  await act(async() => {
    fireEvent.change(firstNameInput, { target: { value: firstName } })
    fireEvent.change(lastNameInput, { target: { value: lastName } })
    fireEvent.change(emailInput, { target: { value: email } })
    fireEvent.change(passwordInput, { target: { value: password } })
    fireEvent.click(isRecyclerInput)
  })
}
