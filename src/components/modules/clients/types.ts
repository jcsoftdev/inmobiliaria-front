import { ClientsState } from '@store/types'

export type Inputs = ClientsState['formFields']

export enum FormType {
  ADD = 'add',
  EDIT = 'edit',
}

export interface FormFooterProps {
  onClose: () => void
  type: FormType
}
