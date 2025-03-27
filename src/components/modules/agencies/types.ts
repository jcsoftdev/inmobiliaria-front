import { AgenciesState } from '@store/types'

export type Inputs = AgenciesState['formFields']

export enum FormType {
  ADD = 'add',
  EDIT = 'edit',
}

export interface FormFooterProps {
  onClose: () => void
  type: FormType
}
