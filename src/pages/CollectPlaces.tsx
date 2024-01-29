import { Center } from '@chakra-ui/react'
import { PlaceCard } from '../components/PlaceCard/PlaceCard.tsx'
import { useEffect, useState } from 'react'
import { CompanyService, CompanyWithLocations } from '../services/companyService.ts'

export const CollectPlaces = () => {
  const [companies, setCompanies] = useState<CompanyWithLocations[]>([])

  useEffect(() => {
    (async () => {
      const data = await CompanyService.getAllWithLocations()
      setCompanies(data)
    })()
  }, [companies])
  return <Center py={20} flexDirection={'column'}>
    {
      companies.map(company => {
        return company.locations.map(location => {
          return <>
            <Center w={'100%'} my={2}>
              <PlaceCard title={company.name} address={location.name} distance={'1'}/>
            </Center>
          </>
        })
      })
    }
  </Center>
}
