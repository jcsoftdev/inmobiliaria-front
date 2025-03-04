export interface AgenciesResponse {
    data: Data []
    meta: Meta
  }
  
  export interface Data {
      id: number
      name: string
      address: string
      phone: string
      email: string
      createdAt: string
  }
  
  export interface Meta {
      total: number
      lastPage: number
      currentPage: number
      perPage: number
      prev: number
      next: number
  }