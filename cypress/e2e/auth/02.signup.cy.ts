const userInformation = {
  email: import.meta.env.VITE_E2E_USER_EMAIL,
  password: import.meta.env.VITE_E2E_USER_PASSWORD,
  firstName: 'John',
  lastName: 'Doe',
  isRecycler: true
}
describe('SignUp', () => {
  before(() => {
    cy.visit('/sign-up')
  })

  after(() => {
    cy.deleteUserByEmail(userInformation.email)
  })

  it('should create an user', () => {
    cy.findByRole('textbox', { name: /first name/i }).type(userInformation.firstName)
    cy.findByRole('textbox', { name: /last name/i }).type(userInformation.lastName)
    cy.findByRole('textbox', { name: /email/i }).type(userInformation.email)
    cy.findByTestId('password-input').type(userInformation.password)
    userInformation.isRecycler ? cy.findByRole('checkbox').click({ force: true }) : null

    cy.findByRole('button', { name: /create account/i }).click()
    cy.url().should('not.include', '/sign-up')
    cy.findByRole('button', { name: /logout/i }).should('be.visible')
  })
})
