import { mailslurp } from '../helpers/mailslurp.ts'
import { User } from '@supabase/supabase-js'

export interface NewAccountData {
  firstName: string,
  lastName: string,
  isRecycler: boolean
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      mailslurp: () => Cypress.Chainable<typeof mailslurp>
      createAccount: (email: string, password: string, data?: Partial<NewAccountData>) => void
      deleteLoggedUser: () => void
      deleteUserByEmail: (email: string) => Promise<void>
      getUserByEmail: (email: string) => Promise<User>
      login: (email: string, password: string, options?: {redirectTo: string}) => Cypress.Chainable<AUTWindow>
    }
  }
}
