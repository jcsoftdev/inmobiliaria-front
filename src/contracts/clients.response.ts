export interface ClientsResponse {
  data: Data[]
  meta: Meta
}

export interface Data {
  id: string
  name: string
  email: string
  phone: string
  created_at: string
}

export interface Meta {
  total: number
  lastPage: number
  currentPage: number
  perPage: number
  prev: number | null
  next: number | null
}
