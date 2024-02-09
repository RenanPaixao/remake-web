import { CompanyService } from '../../../src/services/companyService.ts'
import { LocationsService } from '../../../src/services/locationService.ts'
import { title } from 'radash'

const userCredentials = {
  email: import.meta.env.VITE_E2E_USER_EMAIL,
  password: import.meta.env.VITE_E2E_USER_PASSWORD
}

const location = {
  name: 'e2e-street',
  city: 'e2e-city',
  state: 'e2e-state',
  cep: '12345-000',
  closing_hour: '18:00',
  openning_hour: '08:00',
  complement: 'e2e-complement',
  number: '123',
  district: 'e2e-district',
  latitude: 12.1,
  longitude: 11.1
}

const companyName = `e2e-test-${Date.now()}`

describe('Places', () => {
  beforeEach(() => {
    cy.login(userCredentials.email, userCredentials.password)
  })

  before(() => {
    cy.createAccount(userCredentials.email, userCredentials.password)
    cy.getUserByEmail(userCredentials.email).then(async user => {
      await createTestPlace(user.id)
    })
  })

  afterEach(() => {
    deleteCompanyLocations(companyName)
    deleteCompany(companyName)
  })

  after(() => {
    cy.deleteUserByEmail(userCredentials.email)
  })

  it('should search for an place successfully', () => {
    cy.window().then(win => {
      cy.spy(win, 'open').as('windowOpen')
    })

    cy.findByRole('button', { name: /collect places/i }).click()
    cy.findByRole('searchbox', { name: /search bar/i }).should('not.be.disabled').type(companyName)
    cy.findByRole('button', { name: /search/i }).click()

    cy.findByRole('button', { name: /go!/i }).should('have.length', 1).click()

    cy.get('@windowOpen').should('be.calledWith',`https://www.google.com/maps/search/?api=1&query=${location.latitude},${location.longitude}`, '_blank')
  })

  it('should create a new place successfully', () => {
    cy.findByRole('button', { name: /account/i }).click()
    cy.findByRole('heading', { name: new RegExp(companyName, 'i') }).should('have.length', 0)
    cy.findByRole('button', { name: /add new collect point/i }).click()

    cy.findByRole('textbox', { name: /company name/i }).type(companyName)
    cy.wrap(Object.entries(location)).each(([key, value]: [string, string]) => {
      if(key === 'name') {
        cy.findByRole('textbox', { name: /street/i }).type(value)
        return
      }

      cy.findByRole('textbox', { name: new RegExp(title(key), 'i') }).type(value)
    })

    cy.findByRole('button', { name: /add collect point/i }).should('not.be.disabled').click()
    cy.findByRole('heading', { name: new RegExp(companyName, 'i') }).should('have.length', 1)
  })
})

/**
 * Create a new collect place to be used in the tests.
 * @param ownerId
 */
async function createTestPlace(ownerId: string): Promise<void> {
  await CompanyService.createCompanyWithLocation({
    name: companyName,
    owner_id: ownerId
  },
  location
  )
}

/**
 * Delete a company using a provided name.
 * @param name
 */
async function deleteCompany(name: string): Promise<void> {
  const { companies } = await CompanyService.searchCompanies(name)

  if(companies.length) {
    for (const company of companies) {
      await CompanyService.deleteCompany(company.id)
    }
  }
}

/**
 * Delete all locations from a company using a provided company name.
 * @param name
 */
async function deleteCompanyLocations(name: string): Promise<void> {
  const { companies } = await CompanyService.searchCompanies(name)

  if(companies.length) {
    for (const company of companies) {
      for (const location of company.locations) {
        await LocationsService.delete(location.id)
      }
    }
  }
}
