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

interface IProps extends InputProps{
  containerProps?: InputGroupProps
}
export const SearchBar = (props: IProps) => {
  const { containerProps } = props

  const inputProps = {
    ...props,
    containerProps: undefined
  }

  return <InputGroup {...containerProps}>
    <InputLeftElement pointerEvents={'none'}>
      <FaSearch color={'var(--chakra-colors-gray-400)'}/>
    </InputLeftElement>
    <Input
      {...inputProps}
      aria-label={'search bar'}
      colorScheme={'blue'}
      borderBottomRightRadius={'md'}
      borderTopRightRadius={'md'}
      borderRadius={'md'}
    />
    <InputRightAddon bg={'transparent'} padding={2} border={'none'}>
      <Button colorScheme={'blue'}>Search</Button>
    </InputRightAddon>
  </InputGroup>
}
