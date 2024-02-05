import { CompanyWithLocations } from '../../../services/companyService.ts'

const ACCOUNT_COMPANIES: CompanyWithLocations[] = [
  {
    id: '22f101be-9499-45a9-9a99-eb892cd84f84',
    created_at: '2023-08-07T00:33:22.515328+00:00',
    name: 'testedoteste',
    owner_id: '4b6e71c4-84c3-4a58-8b0c-cc4bb94616df',
    locations: [
      {
        id: '862f70e3-3497-40b5-831c-27638d4cc804',
        cep: '55818025',
        city: 'Carpina',
        name: 'rua',
        state: 'pe',
        number: 2,
        district: 'senzala',
        latitude: -7.8527252,
        longitude: -35.2521788,
        company_id: '22f101be-9499-45a9-9a99-eb892cd84f84',
        complement: '',
        created_at: '2023-08-07T00:33:22.766212+00:00',
        closing_hour: '18:00',
        openning_hour: '08:00'
      }
    ]
  },
  {
    id: '3e0d441e-8d50-4c7e-95e1-7a00c53b3718',
    created_at: '2023-08-08T01:00:29.077631+00:00',
    name: 'Last test',
    owner_id: '4b6e71c4-84c3-4a58-8b0c-cc4bb94616df',
    locations: []
  },
  {
    id: '76b2768f-10c4-4b6b-b38f-857ea86b5df4',
    created_at: '2023-07-21T02:42:41.631943+00:00',
    name: 'Empresa - Derby',
    owner_id: '4b6e71c4-84c3-4a58-8b0c-cc4bb94616df',
    locations: [
      {
        id: '0ba23883-5bd5-43b6-b6d6-41e274a93397',
        cep: '00111222',
        city: 'recife',
        name: 'principal teste',
        state: 'pernambuco',
        number: 67,
        district: 'derby',
        latitude: -8.05675577435866,
        longitude: -34.8984669313262,
        company_id: '76b2768f-10c4-4b6b-b38f-857ea86b5df4',
        created_at: '2023-07-25T23:04:11.171528+00:00',
        closing_hour: '18:00',
        openning_hour: '08:00'
      }
    ]
  }
]
export { ACCOUNT_COMPANIES }

