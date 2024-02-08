import '@testing-library/jest-dom/vitest'
import i18n from '../locales/index.ts'

// Avoid logging errors and warnings during tests.
global.console = {
  ...global.console,
  error: vi.fn(),
  warn: vi.fn()
}

// Set the default language to English for all tests.
i18n.changeLanguage('en')

