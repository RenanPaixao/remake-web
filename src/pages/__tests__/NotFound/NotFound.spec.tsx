import { expect } from 'vitest'
import { customRender, user } from '../../../../tests/test-utils.tsx'
import { NotFound } from '../../NotFound.tsx'

const useNavigateMock = vi.fn()
describe('NotFound', () => {
  beforeEach(() => {
    vi.mock('react-router-dom', async importOriginal => {
      const actual: object = await importOriginal()
      return {
        ...actual,
        useNavigate: () => useNavigateMock
      }
    })
  })

  it('should render', async () => {
    const { container } = customRender(<NotFound/>)

    expect(container).toMatchSnapshot()
  })

  it('should go back when click on go back button', async () => {
    const { getByRole } = customRender(<NotFound/>)

    const goBackButton = getByRole('button', { name: /Go back/i })

    await user.click(goBackButton)

    expect(useNavigateMock).toHaveBeenCalledWith(-1)
  })
})
