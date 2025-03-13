import { create, StateCreator } from 'zustand'
import { devtools } from 'zustand/middleware'

import { ClientsState } from '@store/types'

type ClientStateCreator<T> = StateCreator<T, [['zustand/devtools', never]], []>

export const createSetters = (
  set: Parameters<ClientStateCreator<ClientsState>>[0]
) => ({
  setClients: (data: Partial<ClientsState>) =>
    set(
      (prev) => {
        return {
          ...prev,
          ...data,
        }
      },
      false,
      `client/setClients`
    ),
  setFormFields: (
    data:
      | Partial<ClientsState['formFields']>
      | ((
          prev: ClientsState['formFields']
        ) => Partial<ClientsState['formFields']>)
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
      `client/setFormFields => ${
        typeof data === 'function'
          ? 'function update'
          : Object.keys(data).join(', ')
      }`
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
      `client/emptyFormFields`
    ),
})

export const initialClientsState: ClientsState = {
  isLoading: false,
  isError: false,
  meta: undefined,
  data: [],
  formFields: {
    address: '',
    email: '',
    name: '',
    lastName: '',
    phone: '',
  },
}

type Setters = ReturnType<typeof createSetters>

type ClientsStore = ClientsState & Setters

export const createAgencySlice: ClientStateCreator<ClientsStore> = (set) => ({
  ...initialClientsState,
  ...createSetters(set),
})

export const useClientsStore = create<ClientsStore>()(
  import.meta.env.MODE === 'development'
    ? devtools((set) => ({ ...initialClientsState, ...createSetters(set) }), {
        name: 'clients',
      })
    : (set) => ({ ...initialClientsState, ...createSetters(set) })
)
