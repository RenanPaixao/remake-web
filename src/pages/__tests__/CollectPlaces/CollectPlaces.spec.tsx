import { CollectPlaces } from '../../CollectPlaces.tsx'
import { customRender, user } from '../../../../tests/test-utils.tsx'
import { COMPANIES, POSITION } from '../../../components/Pagination/__tests__/mock.ts'
import { CompanyService } from '../../../services/companyService.ts'
import { waitFor } from '@testing-library/dom'
import { expect } from 'vitest'
import { act } from '@testing-library/react'

type Navigator = {
  geolocation: {
    getCurrentPosition: (callback: typeof vi.fn) => void
  }
}

(navigator as Navigator).geolocation = {
  getCurrentPosition: vi.fn()
}

const windowOpenMock = vi.fn()
window.open = windowOpenMock

const getAllWithLocationsMock = vi.fn()
CompanyService.getAllWithLocations = getAllWithLocationsMock.mockImplementation(async () => {
  setTimeout(() => {
    return Promise.resolve({
      companies: COMPANIES,
      count: 100
    })
  }, 2000)
}).mockResolvedValue({
  companies: COMPANIES,
  count: 100
})

const searchCompaniesMock = vi.fn()
CompanyService.searchCompanies = searchCompaniesMock.mockResolvedValue({
  companies: COMPANIES,
  count: 100
})

sessionStorage.getItem = vi.fn().mockReturnValue(JSON.stringify(POSITION))

describe('CollectPlaces', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })
  it('should render', async () => {
    const { container, getByRole } = customRender(<CollectPlaces/>)

    const loading = getByRole('generic', { name: 'loading' })

    await waitFor(() => {
      expect(loading).not.toBeInTheDocument()
    })

    expect(container).toMatchSnapshot()
  })

  it('should open maps when clicking on places', async () => {
    const { getAllByRole, getByRole } = customRender(<CollectPlaces/>)
    const loading = getByRole('generic', { name: 'loading' })

    await waitFor(() => {
      expect(loading).not.toBeInTheDocument()
    })

    const place = getAllByRole('button', { name: /go/i })

    await user.click(place[0])

    await waitFor(() => {
      expect(windowOpenMock.mock.calls[0][0]).toContain('https://www.google.com/maps/')
    })
  })

  it('should request call page handler when clicking on pagination', async () => {
    const { getByRole } = customRender(<CollectPlaces/>)
    const loading = getByRole('generic', { name: 'loading' })

    await waitFor(() => {
      expect(loading).not.toBeInTheDocument()
    })

    const buttonNames = ['button page 2', 'next button', 'previous button']

    const buttons = buttonNames.map(name => getByRole('button', { name }))

    for (const button of buttons) {
      getAllWithLocationsMock.mockClear()
      await user.click(button)
      await waitFor(() => {
        expect(getAllWithLocationsMock).toHaveBeenCalledTimes(1)
      })
    }
  })

  it('should call search when searching', async () => {
    const { getByRole } = customRender(<CollectPlaces/>)
    const loading = getByRole('generic', { name: 'loading' })

    await waitFor(() => {
      expect(loading).not.toBeInTheDocument()
    })

    const search = getByRole('searchbox')

    await user.type(search, 'test')
    await user.type(search, '{enter}')

    await waitFor(() => {
      expect(searchCompaniesMock).toHaveBeenCalledTimes(1)
    })

    await act(async () => {
      await user.clear(search)
      await user.type(search, ' {enter}')
    })

    await waitFor(() => {
      expect(searchCompaniesMock).toHaveBeenCalledTimes(1)
      expect(getAllWithLocationsMock).toHaveBeenCalledTimes(2)
    })
  })
})
