import { Box, Center, Spinner } from '@chakra-ui/react'
import { PlaceCard } from '../components/PlaceCard/PlaceCard.tsx'
import { useEffect, useState } from 'react'
import { CompanyService, CompanyWithLocations } from '../services/companyService.ts'
import haversine from 'haversine'
import { Pagination } from '../components/Pagination/Pagination.tsx'
import { SearchBar } from '../components/SearchBar/SearchBar.tsx'
import { saveLocationOnSessionStorage, showLocationOnMaps } from '../utils/location.ts'

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
        const { companies, count } = await CompanyService.getAllWithLocations({ from: 0, to: 9 })

        setCompanies(companies)
        setTotalPages(Math.ceil(count / 10))
      }catch(e: any) {
        console.error(e)
      }finally{
        setIsLoading(false)
      }
    })()

    const location = sessionStorage.getItem('location')
    if(!location) {
      navigator.geolocation.getCurrentPosition(async position => {
        const { latitude, longitude } = position.coords
        setPosition({ latitude, longitude })
      })

      saveLocationOnSessionStorage()
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

  /**
   * Handle the page change in pagination.
   * @param page
   */
  async function handlePageChange(page: number): Promise<void> {
    setIsLoading(true)
    setCurrentPage(page)
    const from = (page - 1) * 10
    const to = from + 10
    const { companies } = await CompanyService.getAllWithLocations({ from, to })
    setCompanies(companies)
    setIsLoading(false)
  }

  /**
   * Go to the previous page.
   */
  async function onPrevious(): Promise<void> {
    const previousPage = currentPage - 1
    await handlePageChange(previousPage)
  }

  /**
   * Go to the next page.
   */
  async function onNext(): Promise<void> {
    const nextPage = currentPage + 1
    await handlePageChange(nextPage)
  }

  /**
   * Go to the given page.
   * @param number
   */
  async function onNumberClick(number: number): Promise<void> {
    if(number === currentPage) {
      return
    }
    await handlePageChange(number)
  }

  /**
   * Search for a place.
   * @param value
   */
  async function onSearch(value: string) {
    setIsLoading(true)
    const hasValue = value.trim() !== ''
    const { companies, count } = hasValue ?
      await CompanyService.searchCompanies(value) :
      await CompanyService.getAllWithLocations({ from: 0, to: 9 })

    setCompanies(companies)
    setTotalPages(Math.ceil(count / 10))
    setCurrentPage(1)
    setIsLoading(false)
  }

  return <Center py={10} px={10} flexDirection={'column'}>
    <Center w={'100%'} py={4}>
      <SearchBar
        onSearch={onSearch}
        placeholder={'Search for a place'}
        isDisabled={isLoading}
        containerProps={{ display: 'flex', justifyContent: 'center', flexBasis:'40rem' }}
      />
    </Center>
    {
      isLoading ?
        <Spinner
          aria-label={'loading'}
          thickness='8px'
          emptyColor={'gray.200'}
          color={'blue.500'}
          speed='0.65s'
          height={100}
          width={100}
        /> :
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
