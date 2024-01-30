import { Box, Center } from '@chakra-ui/react'
import { PlaceCard } from '../components/PlaceCard/PlaceCard.tsx'
import { useEffect, useState } from 'react'
import { CompanyService, CompanyWithLocations } from '../services/companyService.ts'
import haversine from 'haversine'
import { Pagination } from '../components/Pagination/Pagination.tsx'
import ReactLoading from 'react-loading'
import { SearchBar } from '../components/SearchBar/SearchBar.tsx'

export const CollectPlaces = () => {
  const [companies, setCompanies] = useState<CompanyWithLocations[]>([])
  const [currentPosition, setPosition] = useState({ latitude: 0, longitude: 0 })
  const [totalPages, setTotalPages] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    (async() => {
      setIsLoading(true)

      try {
        const data = await CompanyService.getAllWithLocations({ from: 0, to: 9 })
        const total = await CompanyService.countCompanies()

        setCompanies(data)
        setTotalPages(Math.ceil(total / 10))
      }catch(e: any) {
        console.error(e)
      }finally{
        setIsLoading(false)
      }
    })()

    const location = sessionStorage.getItem('location')
    if(!location) {
      console.error('No location found')
      return
    }

    setPosition(JSON.parse(location))
  }, [])

  // Check if it's possible to use Memoization here.
  useEffect(() => {
    (async() => {
      const from = (currentPage - 1) * 10
      const to = from + 10
      setIsLoading(true)
      const data = await CompanyService.getAllWithLocations({ from, to })
      setCompanies(data)
      setIsLoading(false)
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

  /**
   * Show the location on Google Maps.
   */
  function showLocationOnMaps(coords: { latitude: number, longitude: number }) {
    const { latitude, longitude } = coords
    window.open('https://www.google.com/maps/search/?api=1&query=' + latitude + ',' + longitude, '_blank')
  }

  return <Center py={10} px={10} flexDirection={'column'}>
    <Center w={'100%'} py={4}>
      <SearchBar
        placeholder={'Search for a place'}
        isDisabled={isLoading}
        containerProps={{ display: 'flex', justifyContent: 'center', flexBasis:'40rem' }}
      />
    </Center>
    {
      isLoading ?
        <ReactLoading aria-label={'loading'} type={'spin'} color={'#3182ce'} height={100} width={100} /> :
        companies.map(company => {
          return company.locations.map(location => {
            const locationCoords = {
              latitude: location.latitude,
              longitude: location.longitude
            }

            return <Center key={location.id} w={'100%'} my={2}>
              <PlaceCard onClick={() => showLocationOnMaps(locationCoords)} title={company.name} address={location.name} distance={getDistance(locationCoords)}/>
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
