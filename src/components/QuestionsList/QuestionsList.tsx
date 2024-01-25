import { Accordion, AccordionButton, AccordionItem, AccordionPanel, Card, Heading, Text } from '@chakra-ui/react'
import { FaMinus, FaPlus } from 'react-icons/fa6'
import { useCallback, useState } from 'react'

interface IProps {
  contentList: {
    title: string
    content: string
  }[],
  minCardWidth?: string
  cardMargin?: string
}

export const QuestionsList = ({ contentList, minCardWidth, cardMargin }: IProps) => {
  const [width, setWidth] = useState('inherit')

  const titleRef = useCallback((node: HTMLSpanElement) => {
    if (node !== null) {
      setWidth(node.offsetWidth + 'px')
    }
  }, [])
  return <Accordion allowMultiple>
    {
      contentList.map(({ title, content }) => {
        return <AccordionItem
          as={Card}
          key={title}
          variant={'elevated'}
          minW={minCardWidth}
          m={cardMargin}
          maxW={width}>
          {({ isExpanded }) => {
            return <>
              <Heading>
                <AccordionButton p={'1.2rem 1.5rem'} >
                  <Text as="span" flex='1' textAlign='left' ref={titleRef}>
                    {title}
                  </Text>
                  {isExpanded ? <FaMinus /> : <FaPlus />}
                </AccordionButton>
              </Heading>
              <AccordionPanel mt={4} >
                {content}
              </AccordionPanel>
            </>
          }}
        </AccordionItem>
      })
    }
  </Accordion>
}
