import { authStorageKeys, UserStore } from '@components/modules/login/utils'

import { getFromIndexedDB } from '@hooks/use-indexeddb-storage'

export type ValidationFunction = () => Promise<boolean> | boolean

export const validations = {
  hasCompanies: async () => {
    const user = await getFromIndexedDB<UserStore>(authStorageKeys.user)
    return user?.hasCompanies
  },
  isAdmin: () => {
    const user = JSON.parse(
      localStorage.getItem(authStorageKeys.user) ?? '{}',
    ) as UserStore
    return user.roles.includes('admin')
  },
} as const

export type ValidationsKeys = keyof typeof validations
