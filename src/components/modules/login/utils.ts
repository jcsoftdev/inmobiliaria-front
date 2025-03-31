export const authStorageKeys = {
  accessToken: 'access_token',
  refreshToken: 'refresh_token',
  user: 'user',
}

export interface UserStore {
  email: string
  name: string
  exp: number
  roles: string[]
  iat: number
  sub: string
  username: string
  // hasAgencies: boolean
  hasCompanies: boolean
}

export const saveInLocalStorage = (key: string, value: string) => {
  dispatchEvent(
    new StorageEvent('storage', {
      key,
      newValue: value,
    }),
  )

  localStorage.setItem(key, value)
}

export const removeLocalStorage = (key: string) => {
  dispatchEvent(
    new StorageEvent('storage', {
      key,
      newValue: null,
    }),
  )

  localStorage.removeItem(key)
}

export const getLocalStorage = <T>(
  key: string,
  callback?: (newValue: string | null) => void,
) => {
  if (callback) {
    window.addEventListener('storage', (event) => {
      if (event.key === key) {
        callback(event.newValue)
      }
    })
  }
  return localStorage.getItem(key) as T | null
}
