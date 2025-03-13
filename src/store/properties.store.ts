import { create, StateCreator } from 'zustand'
import { devtools } from 'zustand/middleware'

import { PropertiesState } from '@store/types'

export const initialPropertiesState: PropertiesState = {
  isLoading: false,
  isError: false,
  meta: undefined,
  data: undefined,
  registration: {
    amenities: '',
    description: '',
    location: '',
    name: '',
    price: '',
    type: '',
  },
}

const createSetters = (
  set: Parameters<
    StateCreator<PropertiesState, [['zustand/devtools', never]], []>
  >[0],
) => ({
  setProperties: (properties: Partial<PropertiesState>) =>
    set(
      (prev) => {
        const newState = { ...prev, ...properties }
        return prev === newState ? prev : newState
      },
      false,
      'properties/setProperties',
    ),

  updateRegistration: (fields: Partial<PropertiesState['registration']>) =>
    set(
      (state) => {
        return {
          ...state,
          registration: {
            ...state.registration,
            ...fields,
          },
        }
      },
      false,
      `properties/updateRegistration=>${Object.keys(fields).join(',')}`,
    ),
})

type Setters = ReturnType<typeof createSetters>

type PropertiesStore = PropertiesState & Setters

export const usePropertiesStore = create<PropertiesStore>()(
  devtools(
    (set) => ({
      ...initialPropertiesState,
      ...createSetters(set),
    }),
    { name: 'properties' },
  ),
)
