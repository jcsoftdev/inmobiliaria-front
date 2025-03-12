import { AgenciesState } from '@store/types'
import { create, StateCreator } from 'zustand'
import { devtools } from 'zustand/middleware'

type AgencyStateCreator<T> = StateCreator<T, [['zustand/devtools', never]], []>
export const createSetters = (
  set: Parameters<AgencyStateCreator<AgenciesState>>[0]
) => ({
  setAgenciesRegistration: (
    registration: Partial<AgenciesState['registration']>
  ) =>
    set(
      (state) => {
        return {
          ...state,
          registration: {
            ...state.registration,
            ...registration,
          },
        }
      },
      false,
      `agencies/setAgenciesRegistration=>${Object.keys(registration).join(',')}`
    ),
  setAgencies: (agencies: Partial<AgenciesState>) =>
    set(
      (prev) => {
        return {
          ...prev,
          ...agencies,
        }
      },
      false,
      `agencies/setAgencies`
    ),
})

export const initialAgenciesState: AgenciesState = {
  isLoading: false,
  isError: false,
  meta: undefined,
  data: undefined,
  registration: {},
}

type Setters = ReturnType<typeof createSetters>

type AgenciesStore = AgenciesState & Setters

export const createAgencySlice: AgencyStateCreator<AgenciesStore> = (set) => ({
  ...initialAgenciesState,
  ...createSetters(set),
})

export const useAgenciesStore = create<AgenciesStore>()(
  import.meta.env.MODE === 'development'
    ? devtools((set) => ({ ...initialAgenciesState, ...createSetters(set) }), {
        name: 'agencies',
      })
    : (set) => ({ ...initialAgenciesState, ...createSetters(set) })
)
