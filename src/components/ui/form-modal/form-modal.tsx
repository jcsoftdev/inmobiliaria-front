import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from '@heroui/react'
import {
  cloneElement,
  createContext,
  useCallback,
  useContext,
  useMemo,
} from 'react'
import { useNavigate } from 'react-router'

interface FormModalProps {
  children: React.ReactNode
  handleSubmit: React.FormEventHandler<HTMLDivElement>
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

const useFormModalContext = () => {
  const context = useContext(FormModalContext)

  return context
}

const Header = ({ children }: { children: React.ReactNode }) => (
  <ModalHeader>{children}</ModalHeader>
)

const Body = ({ children }: { children: React.ReactNode }) => (
  <ModalBody>{children}</ModalBody>
)

const Footer = ({
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

const FormModal = ({ children, handleSubmit }: FormModalProps) => {
  const { isOpen, onOpenChange, onClose } = useDisclosure({ defaultOpen: true })
  const navigate = useNavigate()

  const handleClose = useCallback(() => {
    onClose()
    navigate(-1)
  }, [navigate, onClose])

  const onSubmit = (e: React.FormEvent<HTMLDivElement>) => {
    e.preventDefault()
    handleClose()
    handleSubmit(e)
  }

  const memoizedProps = useMemo(
    () => ({ isOpen, onOpenChange, handleClose }),
    [handleClose, isOpen, onOpenChange]
  )

  return (
    <FormModalContext.Provider value={memoizedProps}>
      <Modal
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onClose={handleClose}
        className="p-2"
        size="3xl"
      >
        <ModalContent as={'form'} onSubmit={onSubmit}>
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
