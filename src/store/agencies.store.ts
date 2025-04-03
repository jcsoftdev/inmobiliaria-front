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
        if (data.data) {
          return {
            ...prev,
            ...data,
          }
        }
        return {
          ...prev,
          ...data,
        }
      },
      false,
      'agencies/setAgencies',
    ),
  setIsLoading: (isLoading: boolean) =>
    set(
      (prev) => ({
        ...prev,
        isLoading,
      }),
      false,
      'agencies/setIsLoading',
    ),
  setSearch: (search: string) =>
    set(
      (prev) => ({
        ...prev,
        search,
      }),
      false,
      'agencies/setSearch',
    ),
  setLastSearch: (lastSearch: string) =>
    set(
      (prev) => ({
        ...prev,
        lastSearch,
      }),
      false,
      'agencies/setLastSearch',
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
  setEditingAgency: (agency: AgenciesState['formFields']) =>
    set(
      (prev) => ({
        ...prev,
        formFields: agency,
      }),
      false,
      'agencies/setEditingAgency',
    ),
  emptyFormFields: () =>
    set(
      (prev) => ({
        ...prev,
        formFields: {
          name: '',
          address: '',
          ruc: '',
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
  search: undefined,
  lastSearch: undefined,
  formFields: {
    name: '',
    address: '',
    ruc: '',
  },
}

export type AgenciesStore = AgenciesState & ReturnType<typeof createSetters>

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
