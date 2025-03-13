import { AgenciesResponse } from '@contracts/agencies.response'
import { ClientsResponse } from '@contracts/clients.response'
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

export type ClientsState = {
  data?: ClientsResponse['data']
  meta?: ClientsResponse['meta']
  isLoading?: boolean
  isError?: boolean
  formFields: {
    dni?: string
    name?: string
    lastName?: string
    email?: string
    address?: string
    phone?: string
  }
}
