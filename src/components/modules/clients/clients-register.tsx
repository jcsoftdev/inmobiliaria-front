import { Button, Input } from '@heroui/react'
import { useClientsStore } from '@store/clients.store'
import { ClientsState } from '@store/types'
import { useForm } from 'react-hook-form'

import { FormModal } from '@components/ui/form-modal'

type Inputs = ClientsState['registration']

interface FormBodyProps {
  register: ReturnType<typeof useForm>['register']
  errors: ReturnType<typeof useForm>['formState']['errors']
  setValue: ReturnType<typeof useForm>['setValue']
  handleChange: (key: keyof Inputs, value: string) => void
}

interface FormFooterProps {
  onClose: () => void
}

const FieldsBody = ({ errors, handleChange, register }: FormBodyProps) => {
  return (
    <div className="flex flex-col items-end">
      <div className="grid gap-4 md:grid-cols-2 w-full">
        <Input
          label="DNI"
          {...register('dni', { required: true })}
          errorMessage={errors.firstName ? 'Campo requerido' : ''}
          isInvalid={!!errors.firstName}
          onChange={(e) => handleChange('dni', e.target.value)}
        />
        <Input
          label="Correo Electrónico"
          {...register('email', { required: true })}
          errorMessage={errors.firstName ? 'Campo requerido' : ''}
          isInvalid={!!errors.firstName}
          onChange={(e) => handleChange('email', e.target.value)}
        />
        <Input
          label="Nombres"
          {...register('firstName', { required: true })}
          errorMessage={errors.firstName ? 'Campo requerido' : ''}
          isInvalid={!!errors.firstName}
          onChange={(e) => handleChange('firstName', e.target.value)}
        />
        <Input
          label="Apellidos"
          {...register('lastName', { required: true })}
          errorMessage={errors.firstName ? 'Campo requerido' : ''}
          isInvalid={!!errors.firstName}
          onChange={(e) => handleChange('lastName', e.target.value)}
        />

        <Input
          label="Dirección"
          {...register('address', { required: true })}
          errorMessage={errors.firstName ? 'Campo requerido' : ''}
          isInvalid={!!errors.firstName}
          onChange={(e) => handleChange('address', e.target.value)}
        />
        <Input
          label="Teléfono"
          {...register('phone', { required: true })}
          errorMessage={errors.firstName ? 'Campo requerido' : ''}
          isInvalid={!!errors.firstName}
          onChange={(e) => handleChange('phone', e.target.value)}
        />
      </div>
    </div>
  )
}

const FormFooter = ({ onClose }: FormFooterProps) => {
  return (
    <div className="flex justify-end gap-4">
      <Button
        color="primary"
        variant="bordered"
        className="px-10"
        onPress={() => {
          onClose()
        }}
        type="button"
      >
        Cancelar
      </Button>
      <Button color="primary" className="px-10" type="submit">
        Guardar
      </Button>
    </div>
  )
}

const ClientsRegister = () => {
  const registration = useClientsStore().registration
  const setClients = useClientsStore().setRegistration

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: registration,
  })

  const onSubmit = (props: Inputs) => {
    console.log({ props })
  }

  const handleChange = (key: keyof Inputs, value: string) => {
    setValue(key, value)
    setClients({ [key]: value })
  }

  return (
    <FormModal handleSubmit={handleSubmit(onSubmit)}>
      <FormModal.Header>Agregar Cliente</FormModal.Header>
      <FormModal.Body>
        <FieldsBody
          register={register}
          errors={errors}
          setValue={setValue}
          handleChange={handleChange}
        />
      </FormModal.Body>
      <FormModal.Footer>
        {({ onClose }) => <FormFooter onClose={onClose} />}
      </FormModal.Footer>
    </FormModal>
  )
}

export default ClientsRegister
