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
  get queryBuilder() {
    return supabase.from('companies')
  }
  async getAllWithLocations(options?: {from:number, to:number}): Promise<{ count: number, companies: CompanyWithLocations[] }> {
    const { data: companies, count } = options ?
      await this.queryBuilder.select('*, locations(*)', { count: 'exact' }).range(options.from, options.to).throwOnError() :
      await this.queryBuilder.select('*, locations(*)', { count: 'exact' }).throwOnError()

    if (companies === null) {
      return {
        companies: [],
        count: 0
      }
    }

    return {
      companies: companies.filter(company => company.locations.length),
      count: count ?? 0
    }
  }

  async searchCompanies(query: string): Promise<{ count: number, companies: CompanyWithLocations[] }> {
    const { data: companies, count } = await this.queryBuilder
      .select('*, locations(*)', { count: 'exact' })
      .textSearch('name', `${query}`, {
        type: 'websearch'
      })
      .throwOnError()

    if (companies === null) {
      return {
        companies: [],
        count: 0
      }
    }

    return {
      companies: companies.filter(company => company.locations.length),
      count: count ?? 0
    }
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

  async getUserPlaces(userId: string): Promise<CompanyWithLocations[]> {
    const { data: companies } = await this.queryBuilder
      .select('*, locations(*)')
      .eq('owner_id', userId)
      .throwOnError()

    if (companies === null) {
      return []
    }

    return companies.filter(company => company.locations.length)
  }
}

export const CompanyService = new PlacesServiceImp()
