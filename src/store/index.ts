import { AgenciesState, PropertiesState, UsersState } from '@store/types'
import { create, StateCreator } from 'zustand'
import { persist, devtools } from 'zustand/middleware'

type AppState = {
  properties: PropertiesState
  agencies: AgenciesState
  users: UsersState
}

// type AppSetters = {
//   setProperties: SetProperties
//   setPropertiesRegistration: SetPropertiesRegistration
// }

const initialState: AppState = {
  properties: {
    isLoading: false,
    isError: false,
    meta: undefined,
    data: undefined,
    registration: {
      // name: '',
      // description: '',
      // price: '',
      // type: '',
      // location: '',
      // amenities: '',
    },
  },
  agencies: {
    isLoading: false,
    isError: false,
    meta: undefined,
    data: undefined,
    registration: {
    },
  },
  users: {
    isLoading: false,
    isError: false,
    meta: undefined,
    data: undefined,
    registration: {
    }
  }
}

const createSetters = (set: Parameters<StateCreator<AppState>>[0]) => ({
  setProperties: (properties: Partial<PropertiesState>) =>
    set((prev) => {
      return {
        properties: { ...prev.properties, ...properties },
      }
    }),
  setAgencies: (agencies: Partial<AgenciesState>) =>
    set((prev) =>{
      return {
        agencies: { ...prev.agencies, ...agencies},
      }
    }),
  setUsers: (users: Partial<UsersState>) =>
    set((prev) => {
      return {
        users: { ...prev.users, ...users},
      }
    }),
  setPropertiesRegistration: (
    registration: Partial<PropertiesState['registration']>
  ) =>
    set((state) => {
      return {
        properties: {
          ...state?.properties,
          registration: {
            ...state?.properties?.registration,
            ...registration,
          },
        },
      }
    }),
  setAgenciesRegistration: (
    registration: Partial<AgenciesState['registration']>  
  ) => 
    set((state) => {
      return {
        agencies: {
          ...state?.agencies,
          registration: {
            ...state?.agencies?.registration,
            ...registration,
          }
        }
      }
    }),
  setUsersRegistration: (
    registration: Partial<UsersState['registration']>
  ) =>
    set((state) => {
      return {
        users: {
          ...state?.users,
          registration: {
            ...state?.users?.registration,
            ...registration,
          }
        }
      }
    })
})

export const useAppStore = create<
  AppState & ReturnType<typeof createSetters>
>()(
  devtools(
    persist(
      (set) => ({
        ...initialState,
        ...createSetters(set),
      }),
      { name: 'app-store' } // Nombre del almacenamiento en localStorage
    )
  )
)

export default useAppStore
