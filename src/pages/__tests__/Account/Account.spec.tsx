import { customRender, user } from '../../../../tests/test-utils.tsx'
import { CompanyService } from '../../../services/companyService.ts'
import { waitFor } from '@testing-library/dom'
import { expect } from 'vitest'
import { ReactElement } from 'react'
import { UserContext } from '../../../context/UserContext.tsx'
import { Account } from '../../Account.tsx'
import { ACCOUNT_COMPANIES } from './mock.ts'

const windowOpenMock = vi.fn()
window.open = windowOpenMock

const getUserPlacesMock = vi.fn()
const useNavigateMock = vi.fn()

const mockCompanies = (companies: typeof ACCOUNT_COMPANIES) => {
  CompanyService.getUserPlaces = getUserPlacesMock.mockImplementation(async () => {
    setTimeout(() => {
      return Promise.resolve(companies)
    }, 2000)
  }).mockResolvedValue(companies)
}

const renderWithUserContext = (ui: ReactElement) => {
  return customRender(
    <UserContext.Provider value={{
      userInformation: {
        id: '39f35111-a2d7-48c2-8b0a-ed0a70ed79c6',
        email: 'test.email@email.com',
        fullName: 'john doe',
        isRecycler: true
      },
      isAuthenticated: true
    }}>
      {ui}
    </UserContext.Provider>
  )
}

describe('Account', () => {
  beforeEach(() => {
    vi.clearAllMocks()

    vi.mock('react-router-dom', async importOriginal => {
      const actual: object = await importOriginal()
      return {
        ...actual,
        useNavigate: () => useNavigateMock
      }
    })
  })
  it('should render', async () => {
    mockCompanies(ACCOUNT_COMPANIES)
    const { container, getByRole } = renderWithUserContext(<Account/>)

    const loading = getByRole('generic', { name: 'loading' })

    await waitFor(() => {
      expect(loading).not.toBeInTheDocument()
    })

    expect(container).toMatchSnapshot()
  })

  it('should render when have no companies', async () => {
    mockCompanies([])
    const { container, getByRole } = renderWithUserContext(<Account/>)

    const loading = getByRole('generic', { name: 'loading' })

    await waitFor(() => {
      expect(loading).not.toBeInTheDocument()
    })

    expect(container).toMatchSnapshot()
  })

  it('should call actions from place card and add new place', async () => {
    mockCompanies([ACCOUNT_COMPANIES[0]])

    const { getByRole } = renderWithUserContext(<Account/>)

    const addPlaceButton = getByRole('button', { name: /add new place/i })
    await user.click(addPlaceButton)

    await waitFor(() => {
      expect(useNavigateMock).toHaveBeenCalledWith('/add-place')
      expect(windowOpenMock).not.toHaveBeenCalled()
    })

    const goButton = getByRole('button', { name: 'Go!' })

    await user.click(goButton)

    expect(windowOpenMock.mock.calls[0][0]).contain('https://www.google.com/maps/')
    expect(useNavigateMock).toHaveBeenCalledTimes(1)
  })
})
