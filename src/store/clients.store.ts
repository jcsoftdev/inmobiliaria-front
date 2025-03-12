import { ClientsState } from '@store/types'
import { create, StateCreator } from 'zustand'
import { devtools } from 'zustand/middleware'

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
  setRegistration: (data: Partial<ClientsState['registration']>) =>
    set(
      (prev) => {
        return {
          ...prev,
          registration: {
            ...prev.registration,
            ...data,
          },
        }
      },
      false,
      `client/setRegistration => ${Object.keys(data).join(', ')}`
    ),
})

export const initialClientsState: ClientsState = {
  isLoading: false,
  isError: false,
  meta: undefined,
  data: [],
  registration: {
    address: '',
    email: '',
    firstName: '',
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
