import { envVariables } from '@constants/variables'

import { UserDto } from '@contracts/users'
import { UsersResponse } from '@contracts/users.response'

import { httpRequest } from '@http/http-request'

export const getUsers = async ({
  page,
  perPage,
}: {
  page: number
  perPage: number
}) => {
  const response = await httpRequest.get<UsersResponse>(
    envVariables.API_URL_USERS + `?page=${page}&perPage=${perPage}`,
  )
  return response
}

export const saveUser = async (data: UserDto) => {
  const response = await httpRequest.post(envVariables.API_URL_USERS, data)
  return response
}

export const editUser = async (id: string, data: UserDto) => {
  const response = await httpRequest.patch(
    envVariables.API_URL_USERS + `/${id}`,
    data,
  )
  return response
}

export const deleteUser = async (id: string) => {
  const response = await httpRequest.delete(
    envVariables.API_URL_USERS + `/${id}`,
  )
  return response
}
