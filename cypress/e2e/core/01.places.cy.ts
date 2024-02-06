import { CompanyService } from '../../../src/services/companyService.ts'
import { LocationsService } from '../../../src/services/locationService.ts'

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

describe('Places', () => {
  before(() => {
    cy.createAccount(userCredentials.email, userCredentials.password)
    cy.login(userCredentials.email, userCredentials.password)
    cy.getUserByEmail(userCredentials.email).then(async user => {
      await createTestPlace(user.id)
    })
  })

  after(() => {
    cy.deleteLoggedUser()
    deleteLocation()
    deleteCompany()
  })

  it('should login an existing user', () => {
    cy.window().then(win => {
      cy.spy(win, 'open').as('windowOpen')
    })

    cy.findByRole('button', { name: /collect places/i }).click()
    cy.findByRole('searchbox', { name: /search bar/i }).should('not.be.disabled').type('e2e-test')
    cy.findByRole('button', { name: /search/i }).click()

    cy.findByRole('button', { name: /go!/i }).should('have.length', 1).click()

    cy.get('@windowOpen').should('be.calledWith',`https://www.google.com/maps/search/?api=1&query=${location.latitude},${location.longitude}`, '_blank')
  })
})

async function createTestPlace(ownerId: string) {
  await CompanyService.createCompanyWithLocation({
    name: `e2e-test-${Date.now()}`,
    owner_id: ownerId
  },
  location
  )
}

async function deleteCompany() {
  const { companies } = await CompanyService.searchCompanies('e2e-test')

  if(companies.length) {
    for (const company of companies) {
      await CompanyService.deleteCompany(company.id)
    }
  }
}

async function deleteLocation() {
  const { companies } = await CompanyService.searchCompanies('e2e-test')

  if(companies.length) {
    for (const company of companies) {
      for (const location of company.locations) {
        await LocationsService.delete(location.id)
      }
    }
  }
}
