import { envVariables } from '@constants/variables'

import { Property } from '@contracts/properties'

export const getProperties = async () => {
  const response = await fetch(envVariables.API_URL + '?page=3')
    .then((res) => res.json())
    .then((data) => {
      return data
    })
    .catch((error) => {
      console.error('Error:', error)
      throw error
    })
  return response
}

export const saveProperty = async (
  property: Omit<Property, 'id' | 'user_id' | 'created_at' | 'status'>
) => {
  const response = await fetch(envVariables.API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...property,
      status: 'available',
      agencyId: 1,
      userId: 1,
      price: parseInt(property.price),
    }),
  })
    .then((res) => {
      if (res.ok) {
        return res.json()
      }
      throw new Error('Error')
    })
    .then((data) => {
      console.log({ data })
      return data
    })
    .catch((error) => {
      console.error('Error:', error)
      throw error
    })
  return response
}
