import { httpRequest } from '@http/http-request'

import { envVariables } from '@constants/variables'

import { Agency } from '@contracts/agencies'
import { AgenciesResponse } from '@contracts/agencies.response'

export const getAgencies = async ({
   page = 1,
   perPage = 10,
}: {
   page?: number
   perPage?: number
}): Promise<AgenciesResponse> => {
    await new Promise ((resolve) => setTimeout(resolve, 2000))

    const response = await httpRequest.get<AgenciesResponse>(
        envVariables.API_URL_AGENCIES + `?page=${page}&perPage=${perPage}`
    )
    return response
}

export const saveAgency = async (
    agency : Omit<Agency, 'id' | 'created_at'>
) => {
    const response = await httpRequest.post(envVariables.API_URL_PROPERTIES, {
        ...agency
    })
    return response
}