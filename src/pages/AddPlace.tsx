import {
  Button,
  Center, Flex,
  FormControl,
  FormErrorMessage, FormHelperText,
  FormLabel, Heading,
  Input,
  SimpleGrid
} from '@chakra-ui/react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { hasFormikError } from '../utils/hasFormikError.ts'
import { useNavigate } from 'react-router-dom'
import { FaArrowLeft } from 'react-icons/fa'
import { FaPlus } from 'react-icons/fa6'
import { title } from 'radash'
import { useContext, useState } from 'react'
import { CompanyService } from '../services/companyService.ts'
import { UserContext } from '../context/UserContext.tsx'
import { useSuccessToast } from '../hooks/toast/useSuccessToast.tsx'

const validationSchema = Yup.object({
  company_name: Yup.string().required('Company name is required'),
  cep: Yup.string().required('CEP is required').matches(/^\d{5}-\d{3}$/, 'CEP must be in the format 00000-000'),
  street: Yup.string().required('Street is required'),
  state: Yup.string().required('State is required'),
  number: Yup.string().required('Number is required'),
  complement: Yup.string(),
  city: Yup.string().required('City is required'),
  district: Yup.string().required('District is required'),
  openning_hour: Yup.string().required('Openning hour is required').matches(/^\d{2}:\d{2}$/, 'The format should be 00:00'),
  closing_hour: Yup.string().required('Closing hour is required').matches(/^\d{2}:\d{2}$/, 'The format should be 00:00'),
  latitude: Yup.string().required('Latitude is required').matches(/^-?([0-8]?[0-9]|90)(\.[0-9]{1,10})$/, 'Incorrect format for latitude'),
  longitude: Yup.string().required('Longitude is required').matches(/^-?([0-9]{1,2}|1[0-7][0-9]|180)(\.[0-9]{1,10})$/, 'Incorrect format for longitude')
})

type FormValues = Yup.InferType<typeof validationSchema>

const initialValues: FormValues = {
  company_name: '',
  cep: '',
  street: '',
  state: '',
  number: '',
  complement: '',
  city: '',
  district: '',
  openning_hour: '',
  closing_hour: '',
  latitude: '',
  longitude: ''
}

export const AddPlace = () => {
  const { userInformation } = useContext(UserContext)
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()
  const successToast = useSuccessToast()
  const formik = useFormik<FormValues>({
    initialValues,
    validationSchema,
    onSubmit: async values => {
      try{
        if(userInformation.id === null) {
          navigate('/login')
          return
        }

        setIsLoading(true)
        await CompanyService.createCompanyWithLocation({
          name: values.company_name,
          owner_id: userInformation.id
        }, {
          cep: values.cep,
          name: values.street,
          state: values.state,
          number: values.number,
          complement: values.complement,
          city: values.city,
          district: values.district,
          openning_hour: values.openning_hour,
          closing_hour: values.closing_hour,
          latitude: parseFloat(values.latitude),
          longitude: parseFloat(values.longitude)
        })

        successToast({ description: 'Place added successfully' })
        navigate('/account')
      }catch(e) {
        console.error(e)
      }finally{
        setIsLoading(false)
      }
    },
    validateOnBlur: true
  })

  // We need to cast to another type because object.keys returns string[]
  const fieldNames = Object.keys(initialValues) as (keyof FormValues)[]
  const requiredFields = fieldNames.filter(key => key !== 'complement')

  return <Center pt={4} flexDirection={'column'}>
    <Heading py={16}>Add Collect Place</Heading>
    <form onSubmit={formik.handleSubmit}>
      <SimpleGrid columns={2} spacing={4}>
        {
          fieldNames.map(key => {
            return <FormControl
              isDisabled={isLoading}
              key={key}
              mt={4}
              isInvalid={hasFormikError(key, formik.touched, formik.errors)}
              isRequired={requiredFields.some(required => key === required)}
            >
              <FormLabel htmlFor={key}>{title(key)}</FormLabel>
              <Input
                isDisabled={isLoading}
                name={key}
                aria-label={title(key)}
                onChange={formik.handleChange}
                value={formik.values[key]}
                onBlur={formik.handleBlur}
              />
              <FormErrorMessage>{formik.errors[key]}</FormErrorMessage>
            </FormControl>
          })
        }
      </SimpleGrid>
      <FormControl>
        <FormHelperText>You can get the latitude and longitude searching for the place address in google maps</FormHelperText>
      </FormControl>
      <SimpleGrid columns={2} py={14} gap={4}>
        <Flex justifyContent={'end'}>
          <Button
            variant={'outline'}
            isLoading={isLoading}
            isDisabled={isLoading}
            colorScheme={'blue'}
            onClick={() => navigate('/account')}
            leftIcon={<FaArrowLeft/>}>
            Account
          </Button>
        </Flex>
        <Flex justifyContent={'start'}>
          <Button colorScheme={'blue'}
            isLoading={isLoading}
            isDisabled={isLoading || !formik.isValid || !formik.dirty}
            rightIcon={<FaPlus/>}
            onClick={() => formik.handleSubmit()}
          >
            Add Place
          </Button>
        </Flex>
      </SimpleGrid>
    </form>
  </Center>
}
