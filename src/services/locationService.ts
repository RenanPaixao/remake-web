import { supabase } from '../utils/supabase.ts'

export interface LocationCoordinates {
  latitude: number
  longitude: number
}

export interface LocationWithoutCoordinates {
  id?: string
  created_at?: string
  cep: string
  name: string
  state: string
  number: number | string
  complement?: string
  city: string
  district: string
  company_id: string
  openning_hour?: string
  closing_hour?: string
}

export type Location = LocationWithoutCoordinates & LocationCoordinates
export class LocationsServiceImp {
  queryBuilder = supabase.from('locations')

  async create(location: Location): Promise<Location> {
    const { data, error } = await this.queryBuilder.insert(location).select().single()

    if (error) {
      throw error
    }

    return data
  }
  async delete(id: string): Promise<void> {
    await this.queryBuilder.delete().eq('id', id).throwOnError()
  }
}

export const LocationsService = new LocationsServiceImp()
