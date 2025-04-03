import { decodeToken } from 'react-jwt'

import {
  authStorageKeys,
  saveInLocalStorage,
} from '@components/modules/login/utils'

import { envVariables } from '@constants/variables'

import { saveInIndexedDB } from '@hooks/use-indexeddb-storage'

import { httpRequest } from '@http/http-request'

export interface SignInResponse {
  access_token: string
  refresh_token: string
}

export interface SignInBody {
  username: string
  password: string
}

export const signIn = async (
  username: string,
  password: string,
): Promise<SignInResponse> => {
  const response = await httpRequest.post<SignInResponse, SignInBody>(
    `${envVariables.API_URL_AUTH}/login`,
    {
      username,
      password,
    },
  )

  return response
}

export const refreshToken = async (): Promise<SignInResponse> => {
  const refreshToken = localStorage.getItem(authStorageKeys.refreshToken) ?? ''
  const response = await httpRequest.post<SignInResponse, { token: string }>(
    `${envVariables.API_URL_AUTH}/refresh`,
    {
      token: refreshToken,
    },
  )

  saveInLocalStorage(authStorageKeys.accessToken, response.access_token)
  saveInLocalStorage(authStorageKeys.refreshToken, response.refresh_token)
  const data = decodeToken<{
    username: string
    email: string
    roles: string[]
    name: string
  }>(response.access_token)
  saveInIndexedDB(authStorageKeys.user, data)

  return response
}
