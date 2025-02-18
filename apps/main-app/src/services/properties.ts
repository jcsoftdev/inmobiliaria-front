import { envVariables } from "@constants/variables"
import { Property } from "@contracts/properties"

export const getProperties = async () => {
  const response = await fetch(envVariables.API_URL)
      .then((res) => res.json())
      .then((data) => {
        return data
      })
  return response
}

export const saveProperty = async (property: Property) => {
  const response = await fetch(envVariables.API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(property),
  })
      .then((res) => res.json())
      .then((data) => {
        return data
      })
  return response
}