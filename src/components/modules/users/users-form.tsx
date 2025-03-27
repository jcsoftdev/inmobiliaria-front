import { addToast } from '@heroui/react'
import { useCallback, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router'

import { USER_REGISTERED_REFETCH_KEY } from '@components/modules/users/constants'
import { FormUserFields } from '@components/modules/users/form/form-fields'
import { FormUsersFooter } from '@components/modules/users/form/form-footer'
import { FormType, Inputs } from '@components/modules/users/types'
import { FormModal } from '@components/ui/form-modal'

import { editUser, saveUser } from '@services/users'

import { formatDateToISOString } from '@utils/date'
import { eventBus } from '@utils/publisher'

import { useUsersStore } from '@store/users.store'

import { routes } from '@router/routes'

const UsersForm = () => {
  const {
    data: users,
    formFields,

    setFormFields,
    emptyFormFields,
  } = useUsersStore()
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
      const formattedExpiresAt = formatDateToISOString(props.expiresAt)
      if (formType === FormType.ADD) {
        saveUser({
          dni: props.dni ?? '',
          name: props.name ?? '',
          lastName: props.lastName ?? '',
          username: props.username ?? '',
          email: props.email ?? '',
          phone: props.phone ?? '',
          role: props.role ?? '',
          status: 'active',
          password: props.password ?? '',
          expiresAt: formattedExpiresAt,
        })
          .then(() => {
            reset()
            emptyFormFields()
            addToast({
              color: 'success',
              title: 'Usuario guardado',
            })
            eventBus.emit(USER_REGISTERED_REFETCH_KEY)
          })
          .catch((error) => {
            addToast({
              color: 'danger',
              title: 'No se pudo guardar el cliente',
              description:
                error.message ?? 'Hubo un error al guardar el usuario',
            })
            console.error(error)
          })
        return
      }

      editUser(id, {
        dni: props.dni ?? '',
        name: props.name ?? '',
        lastName: props.lastName ?? '',
        username: props.username ?? '',
        email: props.email ?? '',
        phone: props.phone ?? '',
        role: props.role ?? '',
        status: props.status ?? '',
        password: props.password ?? '',
        expiresAt: formattedExpiresAt,
      })
        .then(() => {
          reset()
          emptyFormFields()
          addToast({
            color: 'success',
            title: 'Usuario editado',
          })
          eventBus.emit(USER_REGISTERED_REFETCH_KEY)
        })
        .catch((error) => {
          console.log(error)
          addToast({
            color: 'danger',
            title: 'No se pudo editar el usuario',
            description: error.message ?? 'Hubo un error al editar el usuario',
          })
          console.error(error)
        })
    },
    [emptyFormFields, formType, id, reset],
  )

  const handleChange = useCallback(
    (key: keyof Inputs, value: string) => {
      setFormFields((prev) => ({ ...prev, [key]: value }))
      setValue(key, value, { shouldValidate: true })
    },
    [setFormFields, setValue],
  )

  useEffect(() => {
    if (!id) return

    const data = users?.find((user) => user.id === id)
    if (data) {
      setFormFields({
        ...data,
        expiresAt: formatDateToISOString(data.expiresAt),
      })

      reset({
        ...data,
        expiresAt: formatDateToISOString(data.expiresAt),
      })
    }
  }, [users, id, reset, setFormFields])

  return (
    <FormModal
      form={form}
      onSubmit={onSubmit}
      redirectTo={routes.users.home}
      onClose={emptyFormFields}
    >
      <FormModal.Header>Agregar Usuario</FormModal.Header>
      <FormModal.Body>
        <FormUserFields
          register={register}
          errors={errors}
          handleChange={handleChange}
          fields={formFields}
          formType={formType}
        />
      </FormModal.Body>
      <FormModal.Footer>
        {({ onClose }) => <FormUsersFooter onClose={onClose} type={formType} />}
      </FormModal.Footer>
    </FormModal>
  )
}

export default UsersForm
