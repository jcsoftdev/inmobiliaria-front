import { envVariables } from '@constants/variables'

import { ClientDto } from '@contracts/clients'
import { ClientsResponse } from '@contracts/clients.response'

import { httpRequest } from '@http/http-request'

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

export const saveClient = async (data: ClientDto) => {
  const response = await httpRequest.post(envVariables.API_URL_CLIENTS, data)
  return response
}

export const editClient = async (id: string, data: ClientDto) => {
  const response = await httpRequest.patch(
    envVariables.API_URL_CLIENTS + `/${id}`,
    data
  )
  return response
}

export const deleteClient = async (id: string) => {
  const response = await httpRequest.delete(
    envVariables.API_URL_CLIENTS + `/${id}`
  )
  return response
}
