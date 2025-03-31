import { Modal, ModalContent, useDisclosure } from '@heroui/react'
import { createContext, useCallback, useMemo } from 'react'
import { FieldValues, UseFormReturn } from 'react-hook-form'

import { Body } from '@components/ui/form-modal/form-modal-body'
import { Footer } from '@components/ui/form-modal/form-modal-footer'
import { Header } from '@components/ui/form-modal/form-modal-header'

import { routes } from '@router/routes'

import { useBackNavigate } from '@hooks/use-navigate'

interface FormModalProps<T extends FieldValues> {
  children: React.ReactNode
  form: UseFormReturn<T>
  onSubmit: (event: T) => void
  redirectTo?: string
  onClose?: () => void
}

const FormModalContext = createContext<{
  isOpen: boolean
  onOpenChange: (isOpen: boolean) => void
  handleClose: () => void
}>({
  isOpen: false,
  onOpenChange: () => {},
  handleClose: () => {},
})

const FormModal = <T extends FieldValues>({
  children,
  onSubmit,
  redirectTo,
  onClose: onCloseProp,
  form,
}: FormModalProps<T>) => {
  const { isOpen, onOpenChange } = useDisclosure({ defaultOpen: true })
  const navigate = useBackNavigate()

  const handleClose = useCallback(() => {
    onOpenChange()
    onCloseProp?.()
    setTimeout(() => {
      navigate(redirectTo ?? routes.dashboard.path)
    }, 300)
  }, [navigate, onCloseProp, onOpenChange, redirectTo])

  const memoizedProps = useMemo(
    () => ({ isOpen, onOpenChange, handleClose }),
    [handleClose, isOpen, onOpenChange],
  )

  return (
    <FormModalContext.Provider value={memoizedProps}>
      <Modal
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        isOpen={isOpen}
        onOpenChange={handleClose}
        className="p-2"
        size="3xl"
        motionProps={{
          initial: { opacity: 0, y: 50 },
          animate: { opacity: 1, y: 0 },
          exit: { opacity: 0, y: 50 },
        }}
      >
        <ModalContent
          as="form"
          onSubmit={(e) => {
            e.preventDefault()
            e.stopPropagation()
            form.handleSubmit((data) => {
              onSubmit(data)
              handleClose()
            })(e)
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault()
              e.stopPropagation()
              form.handleSubmit((data) => {
                onSubmit(data)
                handleClose()
              })(e)
            }
          }}
        >
          {children}
        </ModalContent>
      </Modal>
    </FormModalContext.Provider>
  )
}

FormModal.Body = Body
FormModal.Footer = Footer
FormModal.Header = Header

export {
  FormModal,
  FormModalContext,
  Footer as FormModalFooter,
  Header as FormModalHeader,
  Body as FormModalBody,
}

export default FormModal
