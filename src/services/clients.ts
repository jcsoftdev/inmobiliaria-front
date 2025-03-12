import { httpRequest } from '@http/http-request'

import { envVariables } from '@constants/variables'

import { ClientsResponse } from '@contracts/clients.response'

export const getClients = async ({
  page,
  perPage,
}: {
  page: number
  perPage: number
}) => {
  const response = await httpRequest.get<ClientsResponse>(
    envVariables.API_URL_CLIENTS + `?page=${page}&perPage=${perPage}`
  )
  return response
}
