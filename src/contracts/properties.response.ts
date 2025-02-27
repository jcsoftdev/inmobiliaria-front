export interface PropertiesResponse {
  data: Data[]
  meta: Meta
}

export interface Data {
  id: number
  title: string
  price: number
  agencyId: number
  userId: number
  createdAt: string
  description: string
  status: string
  type: string
  location: Location
  features: Feature[]
}

export interface Location {
  type: string
  address: string
  coordinates: number[]
}

export interface Feature {
  name: string
  value: string
}

export interface Meta {
  total: number
  lastPage: number
  currentPage: number
  perPage: number
  prev: number
  next: number
}
