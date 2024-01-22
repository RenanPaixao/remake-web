import '@testing-library/jest-dom/vitest'

// Avoid logging errors and warnings during tests.
global.console = {
  ...global.console,
  error: vi.fn(),
  warn: vi.fn()
}
