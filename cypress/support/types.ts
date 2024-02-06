declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      createAccount: (email: string, password: string) => void
      deleteLoggedUser: () => void
      deleteUserByEmail: (email: string) => Promise<void>
    }
  }
}
