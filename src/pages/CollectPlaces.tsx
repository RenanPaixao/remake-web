import { Center } from '@chakra-ui/react'
import { PlaceCard } from '../components/PlaceCard/PlaceCard.tsx'
import { useEffect, useState } from 'react'
import { CompanyService, CompanyWithLocations } from '../services/companyService.ts'
import haversine from 'haversine'

export const CollectPlaces = () => {
  const [companies, setCompanies] = useState<CompanyWithLocations[]>([])
  const [currentPosition, setPosition] = useState({ latitude: 0, longitude: 0 })

  useEffect(() => {
    (async () => {
      const data = await CompanyService.getAllWithLocations()
      setCompanies(data)
    })()

    const location = sessionStorage.getItem('location')
    if (!location) {
      console.error('No location found')
      return
    }

    setPosition(JSON.parse(location))
  }, [])

  /**
   * Get the distance between the current position and the given position.
   * @param position
   */
  function getDistance(position: { latitude: number, longitude: number}) {
    const distance = haversine(
      currentPosition,
      position
    )

    return `${distance.toFixed(2)} km`
  }

  return <Center py={20} flexDirection={'column'}>
    {
      companies.map(company => {
        return company.locations.map(location => {
          const locationCoords = {
            latitude: location.latitude,
            longitude: location.longitude
          }

          return <Center key={location.id} w={'100%'} my={2}>
            <PlaceCard title={company.name} address={location.name} distance={getDistance(locationCoords)}/>
          </Center>
        })
      })
    }
  </Center>
}
