import { expect } from 'vitest'
import { customRender } from '../../../../tests/test-utils.tsx'
import { FAQPage } from '../../FAQPage.tsx'

describe('FAQPage', () => {
  it('should render', async () => {
    const { container } = customRender(<FAQPage/>)

    expect(container).toMatchSnapshot()
  })
})
