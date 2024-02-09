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
import { useTranslation } from 'react-i18next'

const validationSchema = Yup.object({
  company_name: Yup.string().required('validations.required'),
  cep: Yup.string().required('validations.required').matches(/^\d{5}-\d{3}$/, 'validations.cep'),
  street: Yup.string().required('validations.required'),
  state: Yup.string().required('validations.required'),
  number: Yup.string().required('validations.required'),
  complement: Yup.string(),
  city: Yup.string().required('validations.required'),
  district: Yup.string().required('validations.required'),
  openning_hour: Yup.string().required('validations.required').matches(/^\d{2}:\d{2}$/, 'validations.hour'),
  closing_hour: Yup.string().required('validations.required').matches(/^\d{2}:\d{2}$/, 'validations.hour'),
  latitude: Yup.string().required('validations.required').matches(/^-?([0-8]?[0-9]\.[0-9]{1,10})|90$/, 'validations.latitude'),
  longitude: Yup.string().required('validations.required').matches(/^-?([0-9]{1,2}|1[0-7][0-9])(\.[0-9]{1,10})|(180)$/, 'validations.longitude')
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

/**
 * Returns the key to translate labels according to json file.
 * @param key
 */
const getKeyToTranslate = (key: keyof FormValues) => {
  const differentKeys: Record<string, string> = {
    company_name: 'labels.company-name',
    openning_hour: 'labels.opening-hours',
    closing_hour: 'labels.closing-hours',
    cep: 'labels.post-code'
  }

  return differentKeys[key] ?? `labels.${key}`
}

export const AddPlace = () => {
  const { t } = useTranslation()
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

        successToast({ description: t('messages.place-added') })
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
    <Heading py={16}>{t('add-place.add-collect-place')}</Heading>
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
              <FormLabel htmlFor={key}>{t(getKeyToTranslate(key))}</FormLabel>
              <Input
                isDisabled={isLoading}
                name={key}
                aria-label={title(key)}
                onChange={formik.handleChange}
                value={formik.values[key]}
                onBlur={formik.handleBlur}
              />
              <FormErrorMessage>{t(formik.errors[key] ?? '')}</FormErrorMessage>
            </FormControl>
          })
        }
      </SimpleGrid>
      <FormControl>
        <FormHelperText>{t('add-place.you-can-search')}</FormHelperText>
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
            {t('actions.account')}
          </Button>
        </Flex>
        <Flex justifyContent={'start'}>
          <Button colorScheme={'blue'}
            isLoading={isLoading}
            isDisabled={isLoading || !formik.isValid || !formik.dirty}
            rightIcon={<FaPlus/>}
            onClick={() => formik.handleSubmit()}
          >
            {t('actions.add-place')}
          </Button>
        </Flex>
      </SimpleGrid>
    </form>
  </Center>
}
