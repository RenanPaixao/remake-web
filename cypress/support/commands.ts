import '@testing-library/cypress/add-commands'
import { e2eSupabase } from '../helpers/supabase.ts'
import { User } from '@supabase/supabase-js'
import { mailslurp } from '../helpers/mailslurp.ts'

const projectId = import.meta.env.VITE_SUPABASE_PROJECT_ID

Cypress.Commands.add('mailslurp', (): Cypress.Chainable<typeof mailslurp> => {
  return mailslurp
})

Cypress.Commands.add('createAccount', (email: string, password: string) => {
  cy.then(async () => {
    const { error } = await e2eSupabase.auth.signUp({ email, password })

    if(error === null || error.message === 'User already registered') {
      return
    }

    throw new Error(error.message)
  })
})

Cypress.Commands.add('deleteLoggedUser', () => {
  cy.window().then(async win => {
    const userStringfied = win.localStorage.getItem(`sb-${projectId}-auth-token`)
    const { user = null } = JSON.parse(userStringfied ?? '{}')

    if(!user) {
      return
    }

    await e2eSupabase.auth.admin.deleteUser(user.id)
  })
})

Cypress.Commands.add('deleteUserByEmail', async (email: string) => {
  const { data, error } = await e2eSupabase.auth.admin.listUsers()

  if(error) {
    throw new Error(error.message)
  }

  const user = data.users.find((user: User) => user.email === email)

  if(!user) {
    return
  }

  await e2eSupabase.auth.admin.deleteUser(user.id)
})

