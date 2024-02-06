import { e2eSupabase } from '../../helpers/supabase.ts'

const projectId = import.meta.env.VITE_SUPABASE_PROJECT_ID

const userCredentials = {
  email: import.meta.env.VITE_E2E_USER_EMAIL,
  password: import.meta.env.VITE_E2E_USER_PASSWORD
}
describe('Login', () => {
  before(() => {
    cy.then(async () => {
      const { error } = await e2eSupabase.auth.signUp({ email: userCredentials.email, password: userCredentials.password })

      if(error === null || error.message === 'User already registered') {
        return
      }

      throw new Error(error.message)
    })
  })
  after(() => {
    cy.window().then(async win => {
      const userStringfied = win.localStorage.getItem(`sb-${projectId}-auth-token`)
      const { user = null } = JSON.parse(userStringfied ?? '{}')

      if(!user) {
        return
      }

      await e2eSupabase.auth.admin.deleteUser(user.id)
    })
  })

  it('should login an existing user', () => {
    cy.visit('/login')
    cy.findByRole('textbox', { name: /email/i }).type(userCredentials.email)
    cy.findByPlaceholderText(/password/i).type(userCredentials.password)

    cy.findByRole('button', { name: /login/i }).click()

    cy.url().should('not.include', '/login')
    cy.findByRole('button', { name: /logout/i }).should('be.visible')
  })
})
