import axios, { AxiosInstance } from 'axios'

import {
  authStorageKeys,
  saveInLocalStorage,
} from '@components/modules/login/utils'

import { envVariables } from '@constants/variables'

import { SignInResponse } from '@services/auth'

export abstract class AbstractHttpRequest {
  abstract get<T>(url: string): Promise<T>
  abstract post<T, B>(url: string, body: B): Promise<T>
  abstract put<T, B>(url: string, body: B): Promise<T>
  abstract delete<T>(url: string): Promise<T>
  abstract patch<T, B>(url: string, body: B): Promise<T>
}

export class HttpRequest implements AbstractHttpRequest {
  constructor(private readonly http: AbstractHttpRequest) {}

  async get<T>(url: string): Promise<T> {
    return this.http.get<T>(url)
  }

  async post<T, B>(url: string, body: B): Promise<T> {
    return this.http.post<T, B>(url, body)
  }

  async put<T, B>(url: string, body: B): Promise<T> {
    return this.http.put<T, B>(url, body)
  }

  async patch<T, B>(url: string, body: B): Promise<T> {
    return this.http.patch<T, B>(url, body)
  }

  async delete<T>(url: string): Promise<T> {
    return this.http.delete<T>(url)
  }
}

export class FetchHttpRequest extends AbstractHttpRequest {
  async get<T>(url: string): Promise<T> {
    const response = await fetch(url)
    return response.json()
  }

  async post<T, B>(url: string, body: B): Promise<T> {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
    return response.json()
  }

  async put<T, B>(url: string, body: B): Promise<T> {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
    return response.json()
  }

  async patch<T, B>(url: string, body: B): Promise<T> {
    const response = await fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
    return response.json()
  }

  async delete<T>(url: string): Promise<T> {
    const response = await fetch(url, {
      method: 'DELETE',
    })
    return response.json()
  }
}

export class AxiosHttpRequest extends AbstractHttpRequest {
  private readonly axios: AxiosInstance

  constructor() {
    super()
    this.axios = axios.create()

    this.axios.interceptors.request.use((config) => {
      const accessToken = localStorage.getItem(authStorageKeys.accessToken)
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`
      }
      return config
    })

    this.axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response?.status === 401) {
          const refreshToken = localStorage.getItem(
            authStorageKeys.refreshToken,
          )
          if (!refreshToken) {
            localStorage.removeItem(authStorageKeys.accessToken)
            localStorage.removeItem(authStorageKeys.refreshToken)
            throw new Error('Refresh token not found')
          }

          const response = await this.post<
            SignInResponse,
            {
              token: string
            }
          >(`${envVariables.API_URL_AUTH}/refresh`, {
            token: refreshToken,
          }).catch((error) => {
            localStorage.removeItem(authStorageKeys.accessToken)
            localStorage.removeItem(authStorageKeys.refreshToken)
            throw error
          })

          saveInLocalStorage(authStorageKeys.accessToken, response.access_token)
          saveInLocalStorage(
            authStorageKeys.refreshToken,
            response.refresh_token,
          )

          return this.axios.request(error.config)
        }

        return Promise.reject(new Error(error.response?.data?.message))
      },
    )
  }

  async get<T>(url: string): Promise<T> {
    return (await this.axios.get<T>(url)).data
  }

  async post<T, B>(url: string, body: B): Promise<T> {
    return (await this.axios.post<T>(url, body)).data
  }

  async put<T, B>(url: string, body: B): Promise<T> {
    return (await this.axios.put<T>(url, body)).data
  }

  async patch<T, B>(url: string, body: B): Promise<T> {
    return (await this.axios.patch<T>(url, body)).data
  }

  async delete<T>(url: string): Promise<T> {
    return (await this.axios.delete<T>(url)).data
  }
}

export const fetchHttpRequest = new FetchHttpRequest()
export const axiosHttpRequest = new AxiosHttpRequest()

export const httpRequest = new HttpRequest(axiosHttpRequest)
