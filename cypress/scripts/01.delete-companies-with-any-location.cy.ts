import { e2eSupabase } from '../helpers/supabase.js'

describe('Delete companies without locations', () => {
  it('run delete', () => {
    cy.then(async () => {
      const { data } = await e2eSupabase.from('companies').select('*, locations(*)')

      const companiesWithoutLocation = data.filter(company => company.locations.length === 0)

      if(companiesWithoutLocation.length === 0) {
        return
      }

      for (const company of companiesWithoutLocation) {
        await e2eSupabase.from('companies').delete().eq('id', company.id)
      }
    })
  })
})
