import '@testing-library/cypress/add-commands'
import { e2eSupabase } from '../helpers/supabase.ts'
import { User } from '@supabase/supabase-js'
import { mailslurp } from '../helpers/mailslurp.ts'
import AUTWindow = Cypress.AUTWindow
import { NewAccountData } from './types.js'

const projectId = import.meta.env.VITE_SUPABASE_PROJECT_ID

Cypress.Commands.add('mailslurp', (): Cypress.Chainable<typeof mailslurp> => {
  return mailslurp
})

Cypress.Commands.add('createAccount', (email: string, password: string, data?: Partial<NewAccountData>) => {
  cy.then(async () => {
    const { error } = await e2eSupabase.auth.signUp({ email, password,        options: {
      data: {
        first_name: data?.firstName ?? 'first-e2e',
        last_name: data?.lastName ?? 'last-e2e',
        is_recycler: data?.isRecycler ?? true
      }
    } })

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

    await e2eSupabase.auth.admin.deleteUser(user.id)
  })
})

Cypress.Commands.add('deleteUserByEmail',  (email: string) => {
  cy.getUserByEmail(email).then(async user => {
    await e2eSupabase.auth.admin.deleteUser(user.id)
  })
})

Cypress.Commands.add('getUserByEmail', async (email: string) => {
  const { data, error } = await e2eSupabase.auth.admin.listUsers()

  if(error) {
    throw new Error(error.message)
  }

  const user = data.users.find((user: User) => user.email === email)

  if(!user) {
    throw new Error('User not found!')
  }

  return user
})

Cypress.Commands.add('login', (email: string, password: string, options?: {redirectTo: string}): Cypress.Chainable<AUTWindow> => {
  cy.then(async () => {
    const { data, error } = await e2eSupabase.auth.signInWithPassword({
      email,
      password
    })

    if(error) {
      throw new Error(error.message)
    }

    const { session } = data

    if(session === null) {
      throw new Error('Session not found')
    }

    cy.window().then(win => {
      win.localStorage.setItem(`sb-${projectId}-auth-token`, JSON.stringify(session))
    })
  })

  return cy.visit(options?.redirectTo ?? '/')
})

