import { UsersState } from '@store/types'

export type Inputs = UsersState['formFields']

export enum FormType {
  ADD = 'add',
  EDIT = 'edit',
}

export interface FormFooterProps {
  onClose: () => void
  type: FormType
}
