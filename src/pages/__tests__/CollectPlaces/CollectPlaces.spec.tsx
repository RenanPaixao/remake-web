import { CollectPlaces } from '../../CollectPlaces.tsx'
import { customRender } from '../../../../tests/test-utils.tsx'
import { COMPANIES, POSITION } from '../../../components/Pagination/__tests__/mock.ts'
import { CompanyService } from '../../../services/companyService.ts'
import { waitFor } from '@testing-library/dom'
import { expect } from 'vitest'

CompanyService.getAllWithLocations = vi.fn().mockImplementation(async () => {
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
sessionStorage.getItem = vi.fn().mockReturnValue(JSON.stringify(POSITION))

describe('CollectPlaces', () => {
  it('should render', async () => {
    const { container, getByRole } = customRender(<CollectPlaces/>)

    const loading = getByRole('generic', { name: 'loading' })

    await waitFor(() => {
      expect(loading).not.toBeInTheDocument()
    })

    expect(container).toMatchSnapshot()
  })
})
