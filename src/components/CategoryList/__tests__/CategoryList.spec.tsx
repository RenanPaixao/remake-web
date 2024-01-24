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
})
