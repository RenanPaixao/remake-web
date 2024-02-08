import {
  Input,
  InputGroup,
  InputLeftElement,
  InputProps,
  InputGroupProps,
  InputRightAddon,
  Button
} from '@chakra-ui/react'
import { FaSearch } from 'react-icons/fa'
import React, { ChangeEvent, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

interface IProps extends InputProps{
  containerProps?: InputGroupProps,
  onSearch: (value: string) => void
}
export const SearchBar = (props: IProps) => {
  const { t } = useTranslation()

  const { containerProps, onSearch, ...rest } = props
  const [value, setValue] = useState<string>('')
  const [searchParams, setSearchParams] = useSearchParams({ search: '' })

  /**
   * Does the search using the callback function and updates the search params.
   * @param value
   */
  function search(value: string) {
    if(value === searchParams.get('search')) {
      return
    }

    onSearch(value)
    setSearchParams({ search: value }, { replace: true })
  }

  /**
   * Handle the event when the user types in the input.
   * @param e
   */
  function handleChangeEvent(e:ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value)
  }

  /**
   * Handle the event when the input loses focus.
   */
  function handleBlur(e: ChangeEvent<HTMLInputElement>) {
    if(e.target.value === '') {
      search('')
    }
  }

  /**
   * Handle the event when the user presses a key.
   * @param e
   */
  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if(e.key === 'Enter') {
      search(value)
    }
  }

  return <InputGroup {...containerProps}>
    <InputLeftElement pointerEvents={'none'}>
      <FaSearch color={'var(--chakra-colors-gray-400)'}/>
    </InputLeftElement>
    <Input
      {...rest}
      type={'search'}
      value={value}
      onChange={handleChangeEvent}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      aria-label={'search bar'}
      colorScheme={'blue'}
      borderBottomRightRadius={'md'}
      borderTopRightRadius={'md'}
      borderRadius={'md'}
    />
    <InputRightAddon bg={'transparent'} padding={2} border={'none'}>
      <Button onClick={() => search(value)} colorScheme={'blue'}>{t('actions.search')}</Button>
    </InputRightAddon>
  </InputGroup>
}
