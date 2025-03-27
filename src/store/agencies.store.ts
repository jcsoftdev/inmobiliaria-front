import { create, StateCreator } from 'zustand'
import { devtools } from 'zustand/middleware'

import { AgenciesState } from '@store/types'

type AgencyStateCreator<T> = StateCreator<T, [['zustand/devtools', never]], []>
export const createSetters = (
  set: Parameters<AgencyStateCreator<AgenciesState>>[0],
) => ({
  setAgencies: (data: Partial<AgenciesState>) =>
    set(
      (prev) => {
        return {
          ...prev,
          ...data,
        }
      },
      false,
      'agencies/setAgencies',
    ),
  setFormFields: (
    data:
      | Partial<AgenciesState['formFields']>
      | ((
          prev: AgenciesState['formFields'],
        ) => Partial<AgenciesState['formFields']>),
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
      `agencies/setFormFields => ${
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
          name: '',
          address: '',
          phone: '',
          email: '',
        },
      }),
      false,
      'agencies/emptyFormFields',
    ),
})

export const initialAgenciesState: AgenciesState = {
  isLoading: false,
  isError: false,
  meta: undefined,
  data: [],
  formFields: {
    name: '',
    address: '',
    phone: '',
    email: '',
  },
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
    : (set) => ({ ...initialAgenciesState, ...createSetters(set) }),
)
