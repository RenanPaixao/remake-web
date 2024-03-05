import { screen, waitFor } from '@testing-library/dom'
import { expect } from 'vitest'
import { renderWithStore, user } from '../../../../tests/test-utils.tsx'
import { AddPlace } from '../../AddPlace.tsx'
import { CompanyService } from '../../../services/companyService.ts'

const createCompanyMock = vi.fn()
CompanyService.createCompanyWithLocation = createCompanyMock
const successToastMock = vi.fn()
const useNavigateMock = vi.fn()

describe('AddPlace', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
    vi.mock('react-router-dom', async importOriginal => {
      const actual: object = await importOriginal()
      return {
        ...actual,
        useNavigate: () => useNavigateMock
      }
    })

    vi.mock('../../../hooks/toast/useSuccessToast.tsx',  () => {
      return {
        useSuccessToast: () => successToastMock
      }
    })
  })

  it('should render', async () => {
    const { container } = renderWithStore(<AddPlace/>)

    expect(container).toMatchSnapshot()
  })

  it('should be possible to fill all inputs', async () => {
    const { getByRole } = renderWithStore(<AddPlace/>)
    const addPlaceButton = getByRole('button', { name: /Add collect point/i })

    await fillForm()

    await waitFor(()=> {
      expect(addPlaceButton).toBeEnabled()
    })

    await user.click(addPlaceButton)

    await waitFor(()=> {
      expect(createCompanyMock).toHaveBeenCalledTimes(1)
    })

    expect(successToastMock).toHaveBeenCalledTimes(1)
    expect(useNavigateMock).toHaveBeenCalledTimes(1)
    expect(useNavigateMock).toHaveBeenCalledWith('/account')
  })

  it('should back to account page successfully', async () => {
    const { getByRole } = renderWithStore(<AddPlace/>)

    const accountButton = getByRole('button', { name: /account/i })

    await user.click(accountButton)

    expect(useNavigateMock).toHaveBeenCalledTimes(1)
    expect(useNavigateMock).toHaveBeenCalledWith('/account')
  })

  it('should redirect to login case the user id is not present', async () => {
    const { getByRole } = renderWithStore(<AddPlace/>, {
      user: {
        isAuthenticated: false,
        userInformation: {
          id: null,
          fullName: '',
          email: '',
          isRecycler: false
        }
      }
    })
    const addPlaceButton = getByRole('button', { name: /Add collect point/i })

    await fillForm()

    await waitFor(()=> {
      expect(addPlaceButton).toBeEnabled()
    })

    await user.click(addPlaceButton)

    expect(useNavigateMock).toHaveBeenCalledWith('/login')
    expect(createCompanyMock).not.toHaveBeenCalled()
  })
})

/**
 * Fills place form.
 */
async function fillForm() {
  const { getByRole } = screen

  const companyNameInput = getByRole('textbox', { name: /Company Name/i })
  const cepInput = getByRole('textbox', { name: /Cep/i })
  const streetInput = getByRole('textbox', { name: /Street/i })
  const stateInput = getByRole('textbox', { name: /State/i })
  const numberInput = getByRole('textbox', { name: /Number/i })
  const complementInput = getByRole('textbox', { name: /complement/i })
  const cityInput = getByRole('textbox', { name: /city/i })
  const districtInput = getByRole('textbox', { name: /district/i })
  const openingHourInput = getByRole('textbox', { name: /openning hour/i })
  const closingHourInput = getByRole('textbox', { name: /closing hour/i })
  const latitudeInput = getByRole('textbox', { name: /latitude/i })
  const longitudeInput = getByRole('textbox', { name: /longitude/i })

  await user.type(companyNameInput, 'Company Test')
  await user.type(cepInput, '00000-000')
  await user.type(streetInput, 'street test')
  await user.type(stateInput, 'state test')
  await user.type(numberInput, '18')
  await user.type(complementInput, 'complement test')
  await user.type(cityInput, 'city test')
  await user.type(districtInput, 'district test')
  await user.type(openingHourInput, '08:00')
  await user.type(closingHourInput, '20:00')
  await user.type(latitudeInput, '11.11')
  await user.type(longitudeInput, '11.12')
}
