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
    agencyId: '01956c8e-f6a1-77a8-bbe6-884b648ee8f6',
    userId: '01956cf4-1eac-710a-bacd-5e98f90b02c7',
    price: parseInt(property.price),
  })

  return response
}
