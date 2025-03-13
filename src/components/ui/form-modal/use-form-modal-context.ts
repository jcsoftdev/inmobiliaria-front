import { useContext } from 'react'

import { FormModalContext } from '@components/ui/form-modal/form-modal-context'

export const useFormModalContext = () => {
  const context = useContext(FormModalContext)
  return context
}
