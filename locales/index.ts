import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import en from './lang/en.json'
import ptBR from './lang/pt-BR.json'

const resources = {
  en: {
    translation: en
  },
  'pt-BR': {
    translation: ptBR
  }
}

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'pt-BR',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  })

export default i18n
