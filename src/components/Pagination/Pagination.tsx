import { Button, Flex } from '@chakra-ui/react'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'

interface IProps{
  size: number
  onPrevious: () => void
  onNext: () => void
  onNumberClick: (number: number) => void
  activeNumber?: number
  gap?: number
}

export const Pagination = (props: IProps) => {
  const { size, gap,  activeNumber, onNumberClick, onPrevious, onNext } = props
  const buttonProps = {
    colorScheme: 'blue',
    variant: 'ghost'
  }
  return <Flex gap={gap}>
    {size <= 1 ? null : <Button {...buttonProps} onClick={onPrevious} isDisabled={activeNumber === 1}><FaArrowLeft /></Button>}
    {
      Array(size).fill(0).map((_, index) => {
        const current = index + 1
        return <Button
          {...buttonProps}
          isActive={current === activeNumber}
          onClick={() => onNumberClick(current)}
          key={index}>{current}
        </Button>
      })
    }
    {size <= 1 ? null : <Button {...buttonProps} onClick={onNext} isDisabled={activeNumber === size}><FaArrowRight /></Button>}
  </Flex>
}
