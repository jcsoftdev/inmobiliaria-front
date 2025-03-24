import { CompaniesState } from '@store/types'

export type Inputs = CompaniesState['formFields']

export enum FormType {
  ADD = 'add',
  EDIT = 'edit',
}

export interface FormFooterProps {
  onClose: () => void
  type: FormType
}
