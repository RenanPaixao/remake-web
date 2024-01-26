import { expect } from 'vitest'
import { customRender, testingHistory } from '../../../../tests/test-utils.tsx'
import { QuestionsList } from '../QuestionsList.tsx'

const mockPushHistory = vi.fn()
testingHistory.push = mockPushHistory

const contentList = [
  {
    title: 'How to separate waste for recycling?',
    content: 'Place separate bins for different types of waste in a convenient location in your home and Make sure everyone in your household understands the importance of recycling. '
  },
  {
    title: 'I\'ve became a collector. How to add a place?',
    content: 'Go to account page and click on "Become a collector" button. Then you will be able to add a place.'
  }
]

describe('Questions list', () => {
  it('should render', async () => {
    const { container } = customRender(<QuestionsList contentList={contentList}/>)

    expect(container).toMatchSnapshot()
  })
})
