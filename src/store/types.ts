import { AgenciesResponse } from '@contracts/agencies.response'
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

export type UsersState = {
  data?: UsersResponse['data']
  meta?: UsersResponse['meta']
  isLoading?: boolean
  isError?: boolean
  registration: {
    name?: string
    lastName?: string
    email?: string
    agencyId?: string
    password?: string
    phone?: string
    role?: string
    username?: string
    status?: string
    dni?: string
    experiesAt?: string
  }
}


export type SetProperties = (properties: PropertiesState) => void
export type SetAgencies = (agencies: AgenciesState) => void
export type SetUsers = (users: UsersState) => void