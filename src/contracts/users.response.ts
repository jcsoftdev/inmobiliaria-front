export interface UsersResponse {
    data: Data []
    meta: Meta
  }
  
  export interface Data {
      id: number;
      name: string;
      lastName: string;
      email: string;
      agencyId: string;
      password: string;
      phone: string;
      role: string;
      username: string;
      status: string;
      dni: string;
      experiesAt: string;
  }
  
  export interface Meta {
      total: number
      lastPage: number
      currentPage: number
      perPage: number
      prev: number
      next: number
  }