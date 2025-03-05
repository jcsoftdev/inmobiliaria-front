import { httpRequest } from '@http/http-request'

import { envVariables } from '@constants/variables'

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
  password: string
): Promise<SignInResponse> => {
  const response = await httpRequest.post<SignInResponse, SignInBody>(
    `${envVariables.API_URL_AUTH}/login`,
    {
      username,
      password,
    }
  )

  return response
}
