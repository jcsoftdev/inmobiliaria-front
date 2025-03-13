import { ModalFooter } from '@heroui/react'
import { cloneElement } from 'react'

import { useFormModalContext } from '@components/ui/form-modal/use-form-modal-context'

export const Footer = ({
  children,
}: {
  children: (props: { onClose: () => void }) => React.ReactElement
}) => {
  const { handleClose } = useFormModalContext()

  return (
    <ModalFooter>
      {cloneElement(children({ onClose: handleClose }))}
    </ModalFooter>
  )
}
