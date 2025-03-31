import { addToast } from '@heroui/react'
import { useCallback, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router'

import { CLIENT_REGISTERED_REFETCH_KEY } from '@components/modules/clients/constants'
import { FormClientFields } from '@components/modules/clients/form/form-fields'
import { FormClientsFooter } from '@components/modules/clients/form/form-footer'
import { FormType, Inputs } from '@components/modules/clients/types'
import { FormModal } from '@components/ui/form-modal'

import { editClient, saveClient } from '@services/clients'

import { eventBus } from '@utils/publisher'

import { useClientsStore } from '@store/clients.store'

import { routes } from '@router/routes'

const ClientsForm = () => {
  const {
    data: clients,
    formFields,

    setFormFields,
    emptyFormFields,
  } = useClientsStore()
  const { id = '' } = useParams()

  const formType = id ? FormType.EDIT : FormType.ADD

  const form = useForm<Inputs>({
    defaultValues: formFields,
  })
  const {
    register,
    setValue,
    reset,
    formState: { errors },
  } = form

  const onSubmit = useCallback(
    (props: Inputs) => {
      if (formType === FormType.ADD) {
        saveClient({
          address: props.address ?? '',
          dni: props.dni ?? '',
          email: props.email ?? '',
          lastName: props.lastName ?? '',
          name: props.name ?? '',
          phone: props.phone ?? '',
        })
          .then(() => {
            reset()
            emptyFormFields()
            addToast({
              color: 'success',
              title: 'Cliente guardado',
            })
            eventBus.emit(CLIENT_REGISTERED_REFETCH_KEY)
          })
          .catch((error) => {
            addToast({
              color: 'danger',
              title: 'No se pudo guardar el cliente',
              description:
                error.message ?? 'Hubo un error al guardar el cliente',
            })
            console.error(error)
          })
        return
      }

      editClient(id, {
        address: props.address ?? '',
        dni: props.dni ?? '',
        email: props.email ?? '',
        lastName: props.lastName ?? '',
        name: props.name ?? '',
        phone: props.phone ?? '',
      })
        .then(() => {
          reset()
          emptyFormFields()
          addToast({
            color: 'success',
            title: 'Cliente editado',
          })
          eventBus.emit(CLIENT_REGISTERED_REFETCH_KEY)
        })
        .catch((error) => {
          addToast({
            color: 'danger',
            title: 'No se pudo editar el cliente',
            description: error.message ?? 'Hubo un error al editar el cliente',
          })
          console.error(error)
        })
    },
    [emptyFormFields, formType, id, reset],
  )

  const handleChange = useCallback(
    (key: keyof Inputs, value: string) => {
      setFormFields((prev) => ({ ...prev, [key]: value }))
      setValue(key, value)
    },
    [setFormFields, setValue],
  )

  useEffect(() => {
    if (!id) return

    const data = clients?.find((client) => client.id === id)
    if (data) {
      setFormFields(data)
      reset(data)
    }
  }, [clients, id, reset, setFormFields])

  return (
    <FormModal
      form={form}
      onSubmit={onSubmit}
      redirectTo={routes.clients.home.path}
      onClose={emptyFormFields}
    >
      <FormModal.Header>Agregar Cliente</FormModal.Header>
      <FormModal.Body>
        <FormClientFields
          register={register}
          errors={errors}
          handleChange={handleChange}
          fields={formFields}
        />
      </FormModal.Body>
      <FormModal.Footer>
        {({ onClose }) => (
          <FormClientsFooter onClose={onClose} type={formType} />
        )}
      </FormModal.Footer>
    </FormModal>
  )
}

export default ClientsForm
