import { AgenciesResponse } from '@contracts/agencies.response'
import { ClientsResponse } from '@contracts/clients.response'
import { CompaniesResponse } from '@contracts/companies.response'
import { PropertiesResponse } from '@contracts/properties.response'
import { UsersResponse } from '@contracts/users.response'

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
    amenities?: string
  }
}

export type AgenciesState = {
  data?: AgenciesResponse['data']
  meta?: AgenciesResponse['meta']
  isLoading?: boolean
  isError?: boolean
  currentPage?: number
  formFields: {
    name?: string
    address?: string
    ruc?: string
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
export type UsersState = {
  data?: UsersResponse['data']
  meta?: UsersResponse['meta']
  isLoading?: boolean
  isError?: boolean
  formFields: {
    name?: string
    lastName?: string
    email?: string
    password?: string
    phone?: string
    role?: string
    username?: string
    status?: string
    dni?: string
    expiresAt?: string
  }
}

export type CompaniesState = {
  data?: CompaniesResponse['data']
  meta?: CompaniesResponse['meta']
  isLoading?: boolean
  isError?: boolean
  formFields: {
    name?: string
    address?: string
    services?: string
    email?: string
    phone?: string
  }
}
