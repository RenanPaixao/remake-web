import { Button, ButtonProps, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { FaChevronDown } from 'react-icons/fa6'
import { useState } from 'react'

const legibleLanguage: Record<string, string> = {
  en: '🇺🇸 English',
  'pt-BR': '🇧🇷 Português'
}

export const LanguageButton = (props: ButtonProps) => {
  const { i18n } = useTranslation()
  const { colorScheme, ...rest } = props

  const [currentLanguage, setCurrentLanguage] = useState(legibleLanguage[i18n.language])

  const changeLanguage = async (language: string) => {
    await i18n.changeLanguage(language)
    setCurrentLanguage(legibleLanguage[language])
  }

  return (
    <Menu>
      <MenuButton as={Button} colorScheme={colorScheme ?? 'blue'} {...rest} rightIcon={<FaChevronDown />}>
        {currentLanguage}
      </MenuButton>
      <MenuList>
        <MenuItem onClick={() => changeLanguage('en')}> {legibleLanguage.en}</MenuItem>
        <MenuItem onClick={() => changeLanguage('pt-BR')}>{legibleLanguage['pt-BR']}</MenuItem>
      </MenuList>
    </Menu>
  )
}
