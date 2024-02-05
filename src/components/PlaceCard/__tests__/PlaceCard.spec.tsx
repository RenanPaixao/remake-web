import { expect } from 'vitest'
import { customRender, user } from '../../../../tests/test-utils.tsx'
import { PlaceCard } from '../PlaceCard.tsx'

describe('PlaceCard', () => {
  it('should render', async () => {
    const { container } = customRender(
      <PlaceCard
        title={'Place Title'}
        address={'Place Address'}
        distance={'60 KM'}
        onClick={() => vi.fn()}
      />)

    expect(container).toMatchSnapshot()
  })

  it('should call action', async () => {
    const onClick = vi.fn()
    const { getByRole } = customRender(
      <PlaceCard
        title={'Place Title'}
        address={'Place Address'}
        distance={'60 KM'}
        onClick={onClick}
      />)

    const button = getByRole('button')
    await user.click(button)

    expect(onClick).toHaveBeenCalledOnce()
  })
})
