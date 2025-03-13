import {
  addToast,
  Button,
  Input,
  Modal,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from '@heroui/react'
import { useCallback, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'

import { saveAgency } from '@services/agencies'

import { useAgenciesStore } from '@store/agencies.store'

import { routes } from '@router/routes'

type Inputs = {
  name: string
  address: string
  phone: string
  email: string
}

const AgencyForm = () => {
  // const {
  //   setAgenciesRegistration,
  //   agencies: { registration },
  // } = useAppStore()
  const registration = useAgenciesStore().registration
  const { setAgenciesRegistration } = useAgenciesStore()
  const {
    isOpen,
    onOpen,
    onOpenChange,
    onClose: onCloseModal,
  } = useDisclosure()

  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    setValue,

    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: registration,
  })

  const handleChange = (key: keyof Inputs, value: string) => {
    setValue(key, value)
    setAgenciesRegistration({ [key]: value })
  }

  const onClose = () => {
    navigate(routes.agencies.home)
    onCloseModal()
  }

  const onSubmit = (props: Inputs) => {
    setAgenciesRegistration(props)
    saveAgency({
      name: props.name,
      address: props.address,
      phone: props.phone,
      email: props.email,
    })
      .then(() => {
        addToast({
          color: 'success',
          variant: 'solid',
          title: 'Agencia registrada',
          description: 'La agencia ha sido registrada con éxito',
          hideCloseButton: true,
        })
        onClose()
      })
      .catch(() => {
        addToast({
          color: 'danger',
          variant: 'solid',
          title: 'Error',
          description: 'Hubo un error al registrar la agencia',
          hideCloseButton: true,
        })
      })
  }

  const onCancel = useCallback(() => {
    setAgenciesRegistration({
      name: '',
      address: '',
      phone: '',
      email: '',
    })
  }, [setAgenciesRegistration])

  useEffect(() => {
    onOpen()
    return () => {
      onCancel()
    }
  }, [onCancel, onOpen])

  return (
    <Modal
      isDismissable={false}
      isKeyboardDismissDisabled={true}
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      onClose={onClose}
      className="p-4"
    >
      <ModalContent>
        <ModalHeader>Agregar Agencia</ModalHeader>
        <form
          className="flex flex-col items-end"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="grid gap-4 grid-cols-2 py-4 w-full">
            <Input
              label="Nombre"
              {...register('name', { required: true })}
              errorMessage={errors.name ? 'Campo requerido' : ''}
              isInvalid={!!errors.name}
              onChange={(e) => handleChange('name', e.target.value)}
            />
            <Input
              label="Dirreción"
              {...register('address', { required: true })}
              errorMessage={errors.address ? 'Campo requerido' : ''}
              isInvalid={!!errors.address}
              onChange={(e) => handleChange('address', e.target.value)}
            />
            <Input
              label="Teléfono"
              {...register('phone', { required: true })}
              errorMessage={errors.phone ? 'Campo requerido' : ''}
              isInvalid={!!errors.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
            />
            <Input
              label="Email"
              {...register('email', { required: true })}
              errorMessage={errors.email ? 'Campo requerido' : ''}
              isInvalid={!!errors.email}
              onChange={(e) => handleChange('email', e.target.value)}
            />
          </div>
          <div className="flex justify-end gap-4">
            <Button
              color="primary"
              variant="bordered"
              className="my-4 mt-10 min-w-48"
              onPress={() => {
                onClose()
              }}
              type="button"
            >
              Cancelar
            </Button>
            <Button
              color="primary"
              className="my-4 mt-10 min-w-48"
              type="submit"
            >
              Guardar
            </Button>
          </div>
        </form>
      </ModalContent>
    </Modal>
  )
}

export default AgencyForm
