const userCredentials = {
  email: import.meta.env.VITE_E2E_USER_EMAIL,
  password: import.meta.env.VITE_E2E_USER_PASSWORD
}
describe('Login', () => {
  before(() => {
    cy.createAccount(userCredentials.email, userCredentials.password)
  })

  after(() => {
    cy.deleteLoggedUser()
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
