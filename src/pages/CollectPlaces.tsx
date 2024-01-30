import { Box, Center } from '@chakra-ui/react'
import { PlaceCard } from '../components/PlaceCard/PlaceCard.tsx'
import { useEffect, useState } from 'react'
import { CompanyService, CompanyWithLocations } from '../services/companyService.ts'
import haversine from 'haversine'
import { Pagination } from '../components/Pagination/Pagination.tsx'

export const CollectPlaces = () => {
  const [companies, setCompanies] = useState<CompanyWithLocations[]>([])
  const [currentPosition, setPosition] = useState({ latitude: 0, longitude: 0 })
  const [totalPages, setTotalPages] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    (async() => {
      const data = await CompanyService.getAllWithLocations({ from: 0, to: 9 })
      setCompanies(data)

      try {
        const total = await CompanyService.countCompanies()
        setTotalPages(Math.ceil(total / 10))
      }catch(e: any) {
        console.error(e)
      }
    })()

    const location = sessionStorage.getItem('location')
    if(!location) {
      console.error('No location found')
      return
    }

    setPosition(JSON.parse(location))
  }, [])

  useEffect(() => {
    (async() => {
      const from = (currentPage - 1) * 10
      const to = from + 10
      const data = await CompanyService.getAllWithLocations({ from, to })
      setCompanies(data)
    })()
  }, [currentPage])

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

  /**
   * Go to the previous page.
   */
  async function onPrevious(): Promise<void> {
    setCurrentPage(prevState => prevState - 1)
  }

  /**
   * Go to the next page.
   */
  async function onNext(): Promise<void> {
    setCurrentPage(prevState => prevState + 1)
  }

  /**
   * Go to the given page.
   * @param number
   */
  async function onNumberClick(number: number): Promise<void> {
    if(number === currentPage) {
      return
    }

    setCurrentPage(number)
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

    <Box mt={'2rem'}>
      <Pagination
        size={totalPages}
        activeNumber={currentPage}
        onPrevious={onPrevious}
        onNext={onNext}
        onNumberClick={onNumberClick}
        gap={3}
      />
    </Box>
  </Center>
}
