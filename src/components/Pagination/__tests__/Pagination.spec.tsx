import { expect } from 'vitest'
import { customRender } from '../../../../tests/test-utils.tsx'
import { Pagination } from '../Pagination.tsx'
import { fireEvent } from '@testing-library/dom'
import { act } from '@testing-library/react'

const pages = 5
const onNext = vi.fn()
const onPrevious = vi.fn()
const onNumberClick = vi.fn()
describe('Questions list', () => {
  it('should render', async () => {
    const { container } = customRender(<Pagination
      size={pages}
      onNext={onNext}
      onPrevious={onPrevious}
      onNumberClick={onNumberClick}
      activeNumber={3}
    />)

    expect(container).toMatchSnapshot()
  })

  it('should render with disabled previous and next buttons case is on first or last pages', async () => {
    const { getByRole, rerender } = customRender(<Pagination
      size={pages}
      onNext={onNext}
      onPrevious={onPrevious}
      onNumberClick={onNumberClick}
      activeNumber={1}
    />)

    const nextButton = getByRole('button', { name: 'next button' })
    const previousButton = getByRole('button', { name: 'previous button' })

    expect(nextButton).toBeEnabled()
    expect(previousButton).toBeDisabled()

    rerender(<Pagination
      size={pages}
      onNext={onNext}
      onPrevious={onPrevious}
      onNumberClick={onNumberClick}
      activeNumber={pages}
    />)

    expect(nextButton).toBeDisabled()
    expect(previousButton).toBeEnabled()
  })
  it('should trigger actions', async () => {
    const { getByRole } = customRender(<Pagination
      size={pages}
      onNext={onNext}
      onPrevious={onPrevious}
      onNumberClick={onNumberClick}
      activeNumber={3}
    />)

    const nextButton = getByRole('button', { name: 'next button' })
    const previousButton = getByRole('button', { name: 'previous button' })
    const numberButton = (number: number) => {
      return getByRole('button', { name: `button page ${number}` })
    }

    await act(async () => {
      fireEvent.click(numberButton(4))
      fireEvent.click(nextButton)
      fireEvent.click(previousButton)
    })

    expect(onNext).toHaveBeenCalled()
    expect(onPrevious).toHaveBeenCalledOnce()
    expect(onNumberClick).toHaveBeenCalledOnce()
    expect(onNumberClick).toHaveBeenCalledWith(4)
  })
})
