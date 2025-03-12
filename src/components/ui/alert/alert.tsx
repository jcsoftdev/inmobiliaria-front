import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@heroui/react'
import { useState } from 'react'

export type AlertComponentProps = {
  title: string
  message: React.ReactNode
  confirmButtonText?: string
  cancelButtonText?: string
  closeButtonText?: string
  showConfirmButton?: boolean
  showCancelButton?: boolean
  showCloseButton?: boolean
  onClose?: () => void
} & (
  | { showConfirmButton: true; onConfirm: () => void }
  | { showConfirmButton?: false; onConfirm?: never }
) &
  (
    | { showCancelButton: true; onCancel: () => void }
    | { showCancelButton?: false; onCancel?: never }
  )

export const AlertComponent = ({
  title,
  message,
  cancelButtonText,
  closeButtonText,
  confirmButtonText,
  onCancel,
  onClose,
  onConfirm,
  showCancelButton,
  showCloseButton = false,
  showConfirmButton,
}: AlertComponentProps) => {
  const [isOpen, setIsOpen] = useState(true)

  const handleClose = () => {
    setIsOpen(false)
    onClose?.()
  }

  const handleCancel = () => {
    setIsOpen(false)
    onCancel?.()
  }

  const handleConfirm = () => {
    setIsOpen(false)
    onConfirm?.()
  }

  return (
    <Modal
      isOpen={isOpen}
      scrollBehavior={'inside'}
      onOpenChange={setIsOpen}
      hideCloseButton={!showCloseButton}
      isDismissable={false}
      isKeyboardDismissDisabled={true}
    >
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
            <ModalBody>
              {typeof message === 'string' ? <p>{message}</p> : message}
            </ModalBody>
            <ModalFooter>
              {showCloseButton && (
                <Button color="secondary" onPress={handleClose}>
                  {closeButtonText ?? 'Cerrar'}
                </Button>
              )}
              {showCancelButton && (
                <Button color="danger" variant="light" onPress={handleCancel}>
                  {cancelButtonText ?? 'Cancelar'}
                </Button>
              )}
              {showConfirmButton && (
                <Button color="primary" onPress={handleConfirm}>
                  {confirmButtonText ?? 'Confirmar'}
                </Button>
              )}
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}

export default AlertComponent
