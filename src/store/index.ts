import { PropertiesState } from '@store/types'
import { create, StateCreator } from 'zustand'
import { persist, devtools } from 'zustand/middleware'

type AppState = {
  properties: PropertiesState
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
}

const createSetters = (set: Parameters<StateCreator<AppState>>[0]) => ({
  setProperties: (properties: Partial<PropertiesState>) =>
    set((prev) => {
      return {
        properties: { ...prev.properties, ...properties },
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
