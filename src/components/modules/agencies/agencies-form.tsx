import { addToast } from '@heroui/react'
import { useCallback, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router'

import { AGENCY_REGISTERED_REFETCH_KEY } from '@components/modules/agencies/constants'
import { FormModal } from '@components/ui/form-modal'

import { editAgency, saveAgency } from '@services/agencies'

import { useNavigationPath } from '@utils/navigation'
import { eventBus } from '@utils/publisher'

import { useAgenciesStore } from '@store/agencies.store'

import { routes } from '@router/routes'

import { FormAgencyFields } from './form/form-fields'
import { FormAgenciesFooter } from './form/form-footer'
import { FormType, Inputs } from './types'

const AgencyForm = () => {
  const {
    data: agencies,
    formFields,
    setFormFields,
    emptyFormFields,
  } = useAgenciesStore()
  const { id = '' } = useParams()
  const { preserveParams } = useNavigationPath()
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
        saveAgency({
          name: props.name ?? '',
          ruc: props.ruc ?? '',
          address: props.address ?? '',
        })
          .then(() => {
            reset()
            emptyFormFields()
            addToast({
              color: 'success',
              title: 'Agencia guardada',
            })
            eventBus.emit(AGENCY_REGISTERED_REFETCH_KEY)
          })
          .catch((error) => {
            addToast({
              color: 'danger',
              title: 'No se pudo guardar la agencia',
              description:
                error.message ?? 'Hubo un error al guardar la agencia',
            })
            console.error(error)
          })
        return
      }

      editAgency(id, {
        name: props.name ?? '',
        address: props.address ?? '',
        ruc: props.ruc ?? '',
      })
        .then(() => {
          reset()
          emptyFormFields()
          addToast({
            color: 'success',
            title: 'Agencia editada',
          })
          eventBus.emit(AGENCY_REGISTERED_REFETCH_KEY)
        })
        .catch((error) => {
          console.error(error)
          addToast({
            color: 'danger',
            title: 'No se pudo editar la agencia',
            description: error.message ?? 'Hubo un error al editar la agencia',
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

    const data = agencies?.find((agency) => agency.id === id)
    if (data) {
      setFormFields(data)
      reset(data)
    }
  }, [agencies, id, reset, setFormFields])

  return (
    <FormModal
      form={form}
      onSubmit={onSubmit}
      redirectTo={preserveParams(routes.agencies.home.path)}
      onClose={emptyFormFields}
    >
      <FormModal.Header>
        {formType === FormType.ADD ? 'Agregar Agencia' : 'Editar Agencia'}
      </FormModal.Header>
      <FormModal.Body>
        <FormAgencyFields
          register={register}
          errors={errors}
          handleChange={handleChange}
          fields={formFields}
        />
      </FormModal.Body>
      <FormModal.Footer>
        {({ onClose }) => (
          <FormAgenciesFooter onClose={onClose} type={formType} />
        )}
      </FormModal.Footer>
    </FormModal>
  )
}

export default AgencyForm
