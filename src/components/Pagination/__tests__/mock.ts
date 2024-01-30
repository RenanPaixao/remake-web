import { CompanyWithLocations } from '../../../services/companyService.ts'

const COMPANIES: CompanyWithLocations[] = [
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
  },
  {
    id: 'a38b5bf0-1675-494a-8151-44e7d2862ac3',
    created_at: '2023-07-21T00:35:45.275132+00:00',
    name: 'Empresa Renan',
    owner_id: '4b6e71c4-84c3-4a58-8b0c-cc4bb94616df',
    locations: [
      {
        id: '939a8fd8-1e22-4a13-82d0-2209e7f49746',
        cep: 'fake cep',
        city: 'nova cidade',
        name: 'fake street',
        state: 'fake state',
        number: 12,
        district: 'fake',
        latitude: 35.5311714160347,
        longitude: -97.5134134077346,
        company_id: 'a38b5bf0-1675-494a-8151-44e7d2862ac3',
        complement: '',
        created_at: '2023-07-21T01:10:24.357428+00:00',
        closing_hour: '18:00',
        openning_hour: '08:00'
      },
      {
        id: '8dd2343c-ad6f-4186-86db-d6a6f0386f7f',
        cep: 'fake',
        city: 'fake',
        name: 'boca do acre',
        state: 'fake',
        number: 1,
        district: 'test',
        latitude: -8.75048489165814,
        longitude: -67.3981637424423,
        company_id: 'a38b5bf0-1675-494a-8151-44e7d2862ac3',
        complement: 'fake',
        created_at: '2023-07-21T01:05:53.235269+00:00',
        closing_hour: '18:00',
        openning_hour: '08:00'
      }
    ]
  },
  {
    id: 'd30d4f12-fbe6-47b7-95dc-21cc7132d84f',
    created_at: '2023-07-21T02:42:49.064514+00:00',
    name: 'nova empresa',
    owner_id: '4b6e71c4-84c3-4a58-8b0c-cc4bb94616df',
    locations: [
      {
        id: 'f2f8a9bb-9a47-4a87-b6de-de7e7903b242',
        cep: '55666777',
        city: 'Paudalho',
        name: 'Rua de Paudalho',
        state: 'Pernambuco',
        number: 123,
        district: 'bairro teste',
        latitude: -7.89761294338374,
        longitude: -35.1766381522974,
        company_id: 'd30d4f12-fbe6-47b7-95dc-21cc7132d84f',
        created_at: '2023-07-24T01:43:35.892392+00:00',
        closing_hour: '23:00',
        openning_hour: '09:00'
      }
    ]
  },
  {
    id: '7f74fc31-a878-4639-bcfc-b2dcb805c41e',
    created_at: '2023-08-16T01:27:52.107553+00:00',
    name: 'Casa amarela',
    owner_id: '4b6e71c4-84c3-4a58-8b0c-cc4bb94616df',
    locations: [
      {
        id: '91c86cdd-627e-41d4-b172-24bd77b3e854',
        cep: '52070583',
        city: 'Recife',
        name: 'Rua Guaimbé',
        state: 'PE',
        number: 2,
        district: 'Casa Amarela',
        latitude: -8.02186,
        longitude: -34.92225,
        company_id: '7f74fc31-a878-4639-bcfc-b2dcb805c41e',
        complement: '',
        created_at: '2023-08-16T01:27:52.287184+00:00',
        closing_hour: '20:00',
        openning_hour: '08:00'
      }
    ]
  },
  {
    id: '390a5ed7-403c-4ebf-944b-34591d66ca02',
    created_at: '2023-08-17T22:52:09.857372+00:00',
    name: 'Absgc',
    owner_id: 'f0e23a24-de0c-4430-b4ca-b42d140ea93a',
    locations: [
      {
        id: '2edd0e7f-bbbe-45d2-818b-e6f9395991e3',
        cep: '52010-040',
        city: 'Recife',
        name: 'Avenida Governador Agamenon Magalhães',
        state: 'PE',
        number: 12,
        district: 'Derby',
        latitude: -8.03188,
        longitude: -34.93789,
        company_id: '390a5ed7-403c-4ebf-944b-34591d66ca02',
        complement: '',
        created_at: '2023-08-17T22:52:10.128567+00:00',
        closing_hour: '10:00',
        openning_hour: '08:00'
      }
    ]
  },
  {
    id: '9d549ce5-5fd9-4aa9-be79-deee81c0bbb8',
    created_at: '2023-08-17T23:09:25.225395+00:00',
    name: 'Ahah',
    owner_id: '4b6e71c4-84c3-4a58-8b0c-cc4bb94616df',
    locations: [
      {
        id: '0b80201f-f8ee-4726-a70f-e26e6ce9da4b',
        cep: '55818025',
        city: 'Carpina',
        name: 'Rua Antônio Carneiro Cézar Menezes',
        state: 'PE',
        number: 17,
        district: 'Senzala',
        latitude: 1,
        longitude: 1,
        company_id: '9d549ce5-5fd9-4aa9-be79-deee81c0bbb8',
        complement: '',
        created_at: '2023-08-17T23:09:25.547825+00:00',
        closing_hour: '10:00',
        openning_hour: '08:00'
      }
    ]
  },
  {
    id: 'b825cf73-cf76-4255-baae-68e7bc4cc88d',
    created_at: '2023-08-19T22:20:27.234852+00:00',
    name: 'teste',
    owner_id: '4b6e71c4-84c3-4a58-8b0c-cc4bb94616df',
    locations: [
      {
        id: '9f334c2b-4fcd-4c78-9818-41fb448211cb',
        cep: '52280480',
        city: 'Recife',
        name: 'Rua Caxambu',
        state: 'PE',
        number: 99,
        district: 'Vasco da Gama',
        latitude: 31,
        longitude: 7,
        company_id: 'b825cf73-cf76-4255-baae-68e7bc4cc88d',
        complement: 'abc\n',
        created_at: '2023-08-19T22:20:27.381984+00:00',
        closing_hour: '22:00',
        openning_hour: '06:00'
      }
    ]
  },
  {
    id: 'b166760b-0f2f-4a20-ab91-0311ed74bb7d',
    created_at: '2023-08-19T22:21:49.329776+00:00',
    name: 'joao',
    owner_id: '4b6e71c4-84c3-4a58-8b0c-cc4bb94616df',
    locations: [
      {
        id: '6fc88c01-d671-42ae-aa49-ef153ad9fa05',
        cep: '52280480',
        city: 'Recife',
        name: 'Rua Caxambu',
        state: 'PE',
        number: 99,
        district: 'Vasco da Gama',
        latitude: 35,
        longitude: 7,
        company_id: 'b166760b-0f2f-4a20-ab91-0311ed74bb7d',
        complement: '',
        created_at: '2023-08-19T22:21:49.987901+00:00',
        closing_hour: '00:00',
        openning_hour: '00:00'
      }
    ]
  },
  {
    id: '91597ad0-9d27-4c8c-ace9-d79d92b54e3b',
    created_at: '2023-08-19T22:26:53.31578+00:00',
    name: 'Lucas',
    owner_id: '4b6e71c4-84c3-4a58-8b0c-cc4bb94616df',
    locations: [
      {
        id: 'a71e00ef-a287-4dc2-a201-6cb0c919c19a',
        cep: '52280510',
        city: 'Recife',
        name: 'Rua Japaratuba',
        state: 'PE',
        number: 157,
        district: 'Vasco da Gama',
        latitude: 37,
        longitude: 9,
        company_id: '91597ad0-9d27-4c8c-ace9-d79d92b54e3b',
        complement: '',
        created_at: '2023-08-19T22:26:53.726992+00:00',
        closing_hour: '09:00',
        openning_hour: '16:00'
      }
    ]
  }
]
const POSITION: GeolocationPosition = {
  coords: {
    latitude: -7.8175,
    longitude: -35.3307,
    accuracy: 1,
    heading: null,
    speed: null,
    altitude: null,
    altitudeAccuracy: null
  },
  timestamp: 1706638127328
}

export { COMPANIES, POSITION }

