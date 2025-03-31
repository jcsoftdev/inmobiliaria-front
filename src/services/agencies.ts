import { envVariables } from '@constants/variables'

import { AgencyDto } from '@contracts/agencies'
import { AgenciesResponse } from '@contracts/agencies.response'

import { httpRequest } from '@http/http-request'

export const getAgencies = async ({
  page,
  perPage,
}: {
  page?: number
  perPage?: number
}) => {
  const response = await httpRequest.get<AgenciesResponse>(
    envVariables.API_URL_AGENCIES + `?page=${page}&perPage=${perPage}`,
  )
  return response
}

export const saveAgency = async (data: AgencyDto) => {
  const response = await httpRequest.post(envVariables.API_URL_AGENCIES, data)
  return response
}

export const editAgency = async (id: string, data: AgencyDto) => {
  const response = await httpRequest.patch(
    envVariables.API_URL_AGENCIES + `/${id}`,
    data,
  )
  return response
}

export const deleteAgency = async (id: string) => {
  const response = await httpRequest.delete(
    envVariables.API_URL_AGENCIES + `/${id}`,
  )
  return response
}
