import { create, StateCreator } from 'zustand'
import { devtools } from 'zustand/middleware'

import { UsersState } from '@store/types'

type UserStateCreator<T> = StateCreator<T, [['zustand/devtools', never]], []>

export const createSetters = (
  set: Parameters<UserStateCreator<UsersState>>[0],
) => ({
  setUsers: (data: Partial<UsersState>) =>
    set(
      (prev) => {
        return {
          ...prev,
          ...data,
        }
      },
      false,
      `user/setUsers`,
    ),
  setFormFields: (
    data:
      | Partial<UsersState['formFields']>
      | ((prev: UsersState['formFields']) => Partial<UsersState['formFields']>),
  ) => {
    set(
      (prev) => ({
        ...prev,
        formFields: {
          ...prev.formFields,
          ...(typeof data === 'function' ? data(prev.formFields) : data),
        },
      }),
      false,
      `user/setFormFields => ${
        typeof data === 'function'
          ? 'function update'
          : Object.keys(data).join(', ')
      }`,
    )
  },
  emptyFormFields: () =>
    set(
      (prev) => ({
        ...prev,
        formFields: {
          address: '',
          email: '',
          name: '',
          lastName: '',
          phone: '',
        },
      }),
      false,
      `user/emptyFormFields`,
    ),
})

export const initialUsersState: UsersState = {
  isLoading: false,
  isError: false,
  meta: undefined,
  data: [],
  formFields: {
    email: '',
    name: '',
    lastName: '',
    phone: '',
  },
}

type Setters = ReturnType<typeof createSetters>

type UsersStore = UsersState & Setters

export const createAgencySlice: UserStateCreator<UsersStore> = (set) => ({
  ...initialUsersState,
  ...createSetters(set),
})

export const useUsersStore = create<UsersStore>()(
  import.meta.env.MODE === 'development'
    ? devtools((set) => ({ ...initialUsersState, ...createSetters(set) }), {
        name: 'users',
      })
    : (set) => ({ ...initialUsersState, ...createSetters(set) }),
)
