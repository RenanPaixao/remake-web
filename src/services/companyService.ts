import { supabase } from '../utils/supabase.ts'
import { Location, LocationsService } from './locationService.ts'

export interface Company {
  id: string
  name: string
  created_at?: string
  owner_id: string
}

export interface CompanyWithLocations extends Company {
  locations: Location[]
}

class PlacesServiceImp {
  queryBuilder = supabase.from('companies')
  async getAllWithLocations(options?: {from:number, to:number}): Promise<CompanyWithLocations[]> {
    const { data: companies } = options ?
      await this.queryBuilder.select('*, locations(*)').range(options.from, options.to).throwOnError() :
      await this.queryBuilder.select('*, locations(*)').throwOnError()

    if (companies === null) {
      return []
    }

    return companies.filter(company => company.locations.length)
  }

  async deleteCompany(id: string): Promise<void> {
    await this.queryBuilder.delete().eq('id', id).throwOnError()
  }

  async createCompanyWithLocation(
    company: Omit<Company, 'id'>,
    location: Omit<Location, 'company_id'>): Promise<void> {
    const { data, error } = await this.queryBuilder.insert(company).select().maybeSingle()

    if(error) {
      throw new Error(error.message)
    }

    try {
      await LocationsService.create({
        ...location,
        company_id: data.id
      })
    }catch(e: any) {
      await this.deleteCompany(data.id)

      if(e.message) {
        throw new Error(e.message)
      }
      throw new Error('Error creating company')
    }
  }

  async countCompanies(): Promise<number> {
    const { count } = await this.queryBuilder.select('*', { count: 'exact' }).throwOnError()

    return count ?? 0
  }
}

export const CompanyService = new PlacesServiceImp()
