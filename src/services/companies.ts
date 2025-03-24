import { envVariables } from '@constants/variables'

import { CompanyDto } from '@contracts/companies'
import { CompaniesResponse } from '@contracts/companies.response'

import { httpRequest } from '@http/http-request'

export const getCompanies = async ({
  page,
  perPage,
}: {
  page: number
  perPage: number
}) => {
  const response = await httpRequest.get<CompaniesResponse>(
    envVariables.API_URL_COMPANIES + `?page=${page}&perPage=${perPage}`,
  )
  return response
}

export const saveCompany = async (data: CompanyDto) => {
  const response = await httpRequest.post(envVariables.API_URL_COMPANIES, data)
  return response
}

export const editCompany = async (id: string, data: CompanyDto) => {
  const response = await httpRequest.patch(
    envVariables.API_URL_COMPANIES + `/${id}`,
    data,
  )
  return response
}

export const deleteCompany = async (id: string) => {
  const response = await httpRequest.delete(
    envVariables.API_URL_COMPANIES + `/${id}`,
  )
  return response
}
