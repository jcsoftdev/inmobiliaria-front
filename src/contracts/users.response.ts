export interface UsersResponse {
  data: Data[]
  meta: Meta
}

export interface Data {
  id: string
  name: string
  lastName: string
  email: string
  password: string
  phone: string
  role: string
  username: string
  status: string
  dni: string
  expiresAt: string
  createdAt: string
}

export interface Meta {
  total: number
  lastPage: number
  currentPage: number
  perPage: number
  prev: number | null
  next: number | null
}
