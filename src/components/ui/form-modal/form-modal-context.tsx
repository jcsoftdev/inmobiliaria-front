import { createContext } from 'react'

export const FormModalContext = createContext<{
  isOpen: boolean
  onOpenChange: (isOpen: boolean) => void
  handleClose: () => void
}>({
  isOpen: false,
  onOpenChange: () => {},
  handleClose: () => {},
})
