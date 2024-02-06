import { mailslurp } from '../helpers/mailslurp.ts'

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      mailslurp: () => Cypress.Chainable<typeof mailslurp>
      createAccount: (email: string, password: string) => void
      deleteLoggedUser: () => void
      deleteUserByEmail: (email: string) => Promise<void>
    }
  }
}
