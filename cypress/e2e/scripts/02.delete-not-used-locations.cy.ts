import { e2eSupabase } from '../../helpers/supabase.js'

describe('Delete locations with any company', () => {
  it('run delete', () => {
    cy.then(async () => {
      const { data } = await e2eSupabase.from('companies').select('*')

      const companiesIds = data.map(company => company.id)

      if(companiesIds.length === 0) {
        return
      }

      const { data: locations } = await e2eSupabase.from('locations').select('*')

      const locationsWithoutCompany = locations.filter(location => !companiesIds.includes(location.company_id))

      if(locationsWithoutCompany.length === 0) {
        return
      }

      for (const location of locationsWithoutCompany) {
        await e2eSupabase.from('locations').delete().eq('id', location.id)
      }
    })
  })
})
