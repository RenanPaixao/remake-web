import { expect } from 'vitest'
import { customRender, testingHistory } from '../../../../tests/test-utils.tsx'
import { CategoryList } from '../CategoryList.tsx'

const mockPushHistory = vi.fn()
testingHistory.push = mockPushHistory

describe('CategoryList', () => {
  it('should render', async () => {
    const { container } = customRender(<CategoryList/>)

    expect(container).toMatchSnapshot()
  })

  it('should navigate to the collect-places page with the given category', async () => {
    const { getAllByRole } = customRender(<CategoryList/>)
    const buttons = getAllByRole('button')

    buttons.forEach(button => {
      mockPushHistory.mockClear()
      button.click()
      expect(mockPushHistory).toHaveBeenCalledWith({
        'hash': '',
        'pathname': '/collect-places/',
        'search': `?tags=${button.textContent}`
      }, undefined, {})
    })
  })
})
