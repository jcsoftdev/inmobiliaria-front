import { AgenciesResponse } from '@contracts/agencies.response'
import { PropertiesResponse } from '@contracts/properties.response'

export type PropertiesState = {
  data?: PropertiesResponse['data']
  meta?: PropertiesResponse['meta']
  isLoading?: boolean
  isError?: boolean
  registration: {
    name?: string
    description?: string
    price?: string
    type?: string
    location?: string
    amenities?: string // 'algo,otro,algomas'
  }
}

export type AgenciesState = {
  data?: AgenciesResponse['data']
  meta?: AgenciesResponse['meta']
  isLoading?: boolean
  isError?: boolean
  registration: {
    name?: string
    address?: string
    phone?: string
    email?: string
  }
}

export type SetProperties = (properties: PropertiesState) => void
export type SetAgencies = (agencies: AgenciesState) => void
