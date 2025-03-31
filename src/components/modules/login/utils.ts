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
