import { customRender, user } from '../../../../tests/test-utils.tsx'
import { act } from '@testing-library/react'
import { SearchBar } from '../SearchBar.tsx'
import { expect } from 'vitest'

const onSearchMock = vi.fn()
const setSearchParamsMock = vi.fn()

const searchBarProps = {
  containerProps: {
    display: 'flex',
    justifyContent: 'center',
    flexBasis:'40rem'
  },
  onSearch: onSearchMock
}

describe('SearchBar', () => {
  beforeEach(() => {
    vi.mock('react-router-dom', async importOriginal => {
      const original: object = await importOriginal()
      return {
        ...original,
        useSearchParams: () => {
          return [new URLSearchParams({ search: '-' }), setSearchParamsMock]
        }
      }
    })
  })

  it('should render', async () => {
    const { container } = customRender(<SearchBar {...searchBarProps} />)

    expect(container).toMatchSnapshot()
  })

  it('should call onSearch callbacks', async () => {
    const { getByRole } = customRender(<SearchBar {...searchBarProps}/>)
    const searchBar = getByRole('searchbox')
    const searchButton = getByRole('button', { name: /search/i })

    await act(async () => {
      await user.type(searchBar, 'test')
      await user.click(searchButton)
    })

    expect(onSearchMock).toHaveBeenCalledWith('test')
    expect(setSearchParamsMock).toHaveBeenCalledWith({ search: 'test' }, { replace: true })

    await act(async () => {
      await user.clear(searchBar)
      await user.tab()
    })

    expect(onSearchMock).toHaveBeenCalledWith('')
    expect(setSearchParamsMock).toHaveBeenCalledWith({ search: '' }, { replace: true })

    await act(async () => {
      await user.type(searchBar, 'enter-test')
      await user.type(searchBar, '{Enter}')
    })

    expect(onSearchMock).toHaveBeenCalledWith('enter-test')
    expect(setSearchParamsMock).toHaveBeenCalledWith({ search: 'enter-test' }, { replace: true })
  })
})
