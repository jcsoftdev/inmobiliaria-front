import { httpRequest } from '@http/http-request'

import { envVariables } from '@constants/variables'

import { User } from '@contracts/users'
import { UsersResponse } from '@contracts/users.response'

export const getUsers = async ({
    page = 1,
    perPage = 10,
}: {
    page?: number
    perPage?: number
}): Promise<UsersResponse> => {
    await new Promise ((resolve) => setTimeout(resolve, 2000))

    const response = await httpRequest.get<UsersResponse>(
        envVariables.API_URL_USERS + `?page=${page}&perPage=${perPage}`
    )
    return response
}

export const saveUser = async (
    user : Omit<User, 'id' | 'created_at'>
) => {
    const response = await httpRequest.post(envVariables.API_URL_USERS, {
        ...user,
        expiresAt: new Date(user.expiresAt).toISOString(),
    })
    return response
}