export const authStorageKeys = {
  accessToken: 'access_token',
  refreshToken: 'refresh_token',
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
