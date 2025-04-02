import { envVariables } from '@constants/variables'

import { AgencyDto } from '@contracts/agencies'
import { AgenciesResponse } from '@contracts/agencies.response'

import { httpRequest } from '@http/http-request'

export const getAgencies = async ({
  page,
  perPage,
  q,
}: {
  page?: number
  perPage?: number
  q?: string
}) => {
  let url = `${envVariables.API_URL_AGENCIES}?page=${page}&perPage=${perPage}`

  if (q) {
    url += `&search=${encodeURIComponent(q)}`
  }

  const response = await httpRequest.get<AgenciesResponse>(url)
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
