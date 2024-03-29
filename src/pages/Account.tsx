import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Center, Flex,
  Heading,
  Spinner,
  Text
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { CompanyService, CompanyWithLocations } from '../services/companyService.ts'
import { PlaceCard } from '../components/PlaceCard/PlaceCard.tsx'
import { showLocationOnMaps } from '../utils/location.ts'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { RootState } from '../store'

export const Account = () => {
  const { t } = useTranslation()
  const { userInformation } = useSelector((state: RootState) => state.user)
  const [isLoading, setIsLoading] = useState(true)
  const [companies, setCompanies] = useState<CompanyWithLocations[]>([])
  const navigate = useNavigate()

  const { id: userId, email, fullName, isRecycler } = userInformation

  useEffect(() => {
    (async() => {
      setIsLoading(true)

      if(userId) {
        const companies = await CompanyService.getUserPlaces(userId)
        setCompanies(companies)
      }
      setIsLoading(false)
    })()
  }, [userId, userInformation])

  /**
   * Render the owned places by the user.
   */
  function renderPlaces() {
    if(companies.length === 0) {
      return <Center>
        <Text>
          {t('account.you-have-no-places')}
        </Text>
      </Center>
    }

    return companies.map(company => {
      return company.locations.map(location => {
        return <PlaceCard
          key={location.id}
          flexBasis={'15rem'}
          title={company.name}
          distance={''}
          address={`${location.name}, ${location.city}, ${location.state}`}
          onClick={() => showLocationOnMaps({ latitude: location.latitude, longitude: location.longitude })}
        />
      })
    })
  }

  /**
   * Navigate to the add place page.
   */
  function goToAddPlace() {
    navigate('/add-place')
  }

  return <Center py={10} w={'100%'} >
    <Card
      flexBasis={'41rem'}
      boxShadow='rgba(0, 0, 0, 0.56) 0px 22px 70px 4px'
      p={10}
    >
      <CardHeader>
        <Avatar size="2xl" name={fullName}  />
      </CardHeader>
      <CardBody>
        <Heading as="h1" size="xl">
          {fullName}
        </Heading>
        <Text>
          {email}
        </Text>

        <Heading as="h2" size="md" mt={20} mb={10}>
          {t('account.your-places')}
        </Heading>

        {isLoading ? <Center>
          <Spinner
            aria-label={'loading'}
            thickness='8px'
            emptyColor={'gray.200'}
            color={'blue.500'}
            speed='0.65s'
            height={50}
            width={50}
          />
        </Center> :
          <Flex
            flexWrap={'wrap'}
            gap={4}
            justifyContent={'center'}
          >
            {renderPlaces()}
          </Flex>
        }
      </CardBody>
      <CardFooter justifyContent={'center'}>
        {isRecycler  ?
          <Button colorScheme={'blue'} onClick={goToAddPlace}>{t('actions.add-new-place')}</Button> :
          <Button colorScheme={'blue'}>{t('actions.become-a-recycler')}</Button>
        }
      </CardFooter>
    </Card>
  </Center>
}
