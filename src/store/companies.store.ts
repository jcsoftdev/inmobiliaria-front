import { create, StateCreator } from 'zustand'
import { devtools } from 'zustand/middleware'

import { CompaniesState } from './types'

type CompanyStateCreator<T> = StateCreator<T, [['zustand/devtools', never]], []>

export const createSetters = (
  set: Parameters<CompanyStateCreator<CompaniesState>>[0],
) => ({
  setCompanies: (data: Partial<CompaniesState>) =>
    set(
      (prev) => {
        return {
          ...prev,
          ...data,
        }
      },
      false,
      'company/setCompanies',
    ),
  setFormFields: (
    data:
      | Partial<CompaniesState['formFields']>
      | ((
          prev: CompaniesState['formFields'],
        ) => Partial<CompaniesState['formFields']>),
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
      `company/setFormFields => ${
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
          services: '',
          email: '',
          phone: '',
        },
      }),
      false,
      'company/emptyFormFields',
    ),
})

export const initialCompaniesState: CompaniesState = {
  isLoading: false,
  isError: false,
  meta: undefined,
  data: [],
  formFields: {
    name: '',
    address: '',
    services: '',
    email: '',
    phone: '',
  },
}

type Setters = ReturnType<typeof createSetters>

type CompaniesStore = CompaniesState & Setters

export const createAgencySlice: CompanyStateCreator<CompaniesStore> = (
  set,
) => ({
  ...initialCompaniesState,
  ...createSetters(set),
})

export const useCompaniesStore = create<CompaniesStore>()(
  import.meta.env.MODE === 'development'
    ? devtools((set) => ({ ...initialCompaniesState, ...createSetters(set) }), {
        name: 'companies',
      })
    : (set) => ({ ...initialCompaniesState, ...createSetters(set) }),
)
