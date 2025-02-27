import { httpRequest } from '@http/http-request'

import { envVariables } from '@constants/variables'

import { Property } from '@contracts/properties'
import { PropertiesResponse } from '@contracts/properties.response'

export const getProperties = async ({
  page = 1,
  perPage = 10,
}: {
  page?: number
  perPage?: number
}): Promise<PropertiesResponse> => {
  await new Promise((resolve) => setTimeout(resolve, 2000))

  const response = await httpRequest.get<PropertiesResponse>(
    envVariables.API_URL_PROPERTIES + `?page=${page}&perPage=${perPage}`
  )
  return response
}

export const saveProperty = async (
  property: Omit<Property, 'id' | 'user_id' | 'created_at' | 'status'>
) => {
  const response = await httpRequest.post(envVariables.API_URL_PROPERTIES, {
    ...property,
    status: 'available',
    agencyId: 1,
    userId: 1,
    price: parseInt(property.price),
  })

  return response
}
