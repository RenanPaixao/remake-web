import { extractIdFromEmail } from '../../helpers/mailslurp.js'

const userInformation = {
  email: '9e9f4ece-243c-4311-8231-75d1099fce03@mailslurp.com',
  password: import.meta.env.VITE_E2E_USER_PASSWORD
}

const inboxId = extractIdFromEmail(userInformation.email)
describe('SignUp', () => {
  before(() => {
    cy.createAccount(userInformation.email, userInformation.password)
    cy.visit('/forgot-password')
  })

  after(() => {
    cy.deleteUserByEmail(userInformation.email)
  })

  it('should create an user', () => {
    cy.findByRole('textbox', { name: /email/i }).type(userInformation.email)

    cy.findByRole('button', { name: /send recovery email/i }).click()
    cy.findByRole('dialog', { name: /recovery email sent/i }).should('be.visible')

    cy.mailslurp().then({ timeout: 10000 }, async mailslurp => {
      const email = await mailslurp.waitForLatestEmail(inboxId)
      const regex = /<a href="https:\/\/.*\.supabase\.co\/auth\/v1\/verify\?token=.*&amp;type=recovery&amp;redirect_to=http:\/\/.*\/">Reset Password<\/a>/gm
      expect(email.body).to.include('Reset Password')
      expect(email.body).matches(regex)
    })
  })
})
