export interface CompaniesResponse {
  data: Data[]
  meta: Meta
}

export interface Data {
  id: string
  name: string
  address: string
  services: string
  email: string
  phone: string
}

export interface Meta {
  total: number
  lastPage: number
  currentPage: number
  perPage: number
  prev: number | null
  next: number | null
}
