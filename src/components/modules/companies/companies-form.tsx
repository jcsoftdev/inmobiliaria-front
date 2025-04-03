import { addToast } from '@heroui/react'
import { useCallback, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router'

import { COMPANY_REGISTERED_REFETCH_KEY } from '@components/modules/companies/constants'
import { FormModal } from '@components/ui/form-modal'

import { refreshToken } from '@services/auth'
import { editCompany, saveCompany } from '@services/companies'

import { eventBus } from '@utils/publisher'

import { useCompaniesStore } from '@store/companies.store'

import { routes } from '@router/routes'

import { FormCompanyFields } from './form/form-fields'
import { FormCompaniesFooter } from './form/form-footer'
import { FormType, Inputs } from './types'

const CompaniesForm = () => {
  const {
    data: companies,
    meta,
    formFields,
    setFormFields,
    emptyFormFields,
  } = useCompaniesStore()
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
        saveCompany({
          name: props.name ?? '',
          address: props.address ?? '',
          services: props.services ?? '',
          email: props.email ?? '',
          phone: props.phone ?? '',
        })
          .then(() => {
            reset()
            emptyFormFields()
            addToast({
              color: 'success',
              title: 'Empresa guardada',
            })
            if (companies?.length === 0 && meta?.lastPage === 1) {
              refreshToken()
            }
            eventBus.emit(COMPANY_REGISTERED_REFETCH_KEY, 'hasCompanies')
          })
          .catch((error) => {
            addToast({
              color: 'danger',
              title: 'No se pudo guardar la empresa',
              description:
                error.message ?? 'Hubo un error al guardar la empresa',
            })
            console.error(error)
          })
        return
      }

      editCompany(id, {
        name: props.name ?? '',
        address: props.address ?? '',
        services: props.services ?? '',
        email: props.email ?? '',
        phone: props.phone ?? '',
      })
        .then(() => {
          reset()
          emptyFormFields()
          addToast({
            color: 'success',
            title: 'Empresa editado',
          })
          eventBus.emit(COMPANY_REGISTERED_REFETCH_KEY)
        })
        .catch((error) => {
          addToast({
            color: 'danger',
            title: 'No se pudo editar la empresa',
            description: error.message ?? 'Hubo un error al editar la empresa',
          })
          console.error(error)
        })
    },
    [companies?.length, emptyFormFields, formType, id, meta?.lastPage, reset],
  )

  const handleChange = useCallback(
    (key: keyof Inputs, value: string) => {
      setFormFields((prev) => ({ ...prev, [key]: value }))
      setValue(key, value)
    },
    [setFormFields, setValue],
  )

  const onClose = useCallback(() => {
    emptyFormFields()
  }, [emptyFormFields])

  useEffect(() => {
    if (!id) return

    const data = companies?.find((company) => company.id === id)
    if (data) {
      setFormFields(data)
      reset(data)
    }
  }, [companies, id, reset, setFormFields])

  return (
    <FormModal
      form={form}
      onSubmit={onSubmit}
      redirectTo={routes.companies.home.path}
      onClose={onClose}
    >
      <FormModal.Header>Agregar Empresa</FormModal.Header>
      <FormModal.Body>
        <FormCompanyFields
          register={register}
          errors={errors}
          handleChange={handleChange}
          fields={formFields}
        />
      </FormModal.Body>
      <FormModal.Footer>
        {({ onClose }) => {
          return <FormCompaniesFooter onClose={onClose} type={formType} />
        }}
      </FormModal.Footer>
    </FormModal>
  )
}

export default CompaniesForm
