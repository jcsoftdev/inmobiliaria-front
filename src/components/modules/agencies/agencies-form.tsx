import { addToast } from '@heroui/react'
import { useCallback, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useParams, useNavigate, useLocation } from 'react-router'

import { AGENCY_REGISTERED_REFETCH_KEY } from '@components/modules/agencies/constants'
import { FormModal } from '@components/ui/form-modal'

import { editAgency, saveAgency } from '@services/agencies'

import { useNavigationPath } from '@utils/navigation'
import { eventBus } from '@utils/publisher'

import { useAgenciesStore } from '@store/agencies.store'

import { routes } from '@router/routes'

import { usePaginator } from '@hooks/use-paginator'

import { FormAgencyFields } from './form/form-fields'
import { FormAgenciesFooter } from './form/form-footer'
import { FormType, Inputs } from './types'

const AgencyForm = () => {
  const {
    data: agencies,
    formFields,
    setFormFields,
    emptyFormFields,
    meta,
  } = useAgenciesStore()
  const { setCurrentPage } = usePaginator()
  const { id = '' } = useParams()
  const navigate = useNavigate()
  const { preserveParams } = useNavigationPath()
  const formType = id ? FormType.EDIT : FormType.ADD
  const location = useLocation()
  const currentPage = new URLSearchParams(location.search).get('page') || '1'

  const form = useForm<Inputs>({
    defaultValues: formFields,
  })
  const {
    register,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = form

  const handleClose = useCallback(() => {
    emptyFormFields()
    reset({
      name: '',
      address: '',
      ruc: '',
    })
    navigate(routes.agencies.home.path + `?page=${currentPage}`, {
      replace: true,
    })
  }, [emptyFormFields, reset, navigate, currentPage])

  useEffect(() => {
    if (!id) {
      emptyFormFields()
      reset({
        name: '',
        address: '',
        ruc: '',
      })
    }
    return () => {
      if (!id) {
        emptyFormFields()
      }
    }
  }, [id, emptyFormFields, reset])

  const onSubmit = useCallback(
    async (props: Inputs) => {
      if (isSubmitting) return

      try {
        if (formType === FormType.ADD) {
          await saveAgency({
            name: props.name ?? '',
            ruc: props.ruc ?? '',
            address: props.address ?? '',
          })

          reset({
            name: '',
            address: '',
            ruc: '',
          })
          emptyFormFields()
          navigate(routes.agencies.home.path)

          addToast({
            color: 'success',
            title: 'Agencia guardada',
          })

          if (meta?.lastPage) {
            setCurrentPage(meta.lastPage)
          }
          eventBus.emit(AGENCY_REGISTERED_REFETCH_KEY)
          return
        }

        await editAgency(id, {
          name: props.name ?? '',
          address: props.address ?? '',
          ruc: props.ruc ?? '',
        })

        reset({
          name: '',
          address: '',
          ruc: '',
        })
        emptyFormFields()
        navigate(routes.agencies.home.path + `?page=${currentPage}`, {
          replace: true,
        })

        addToast({
          color: 'success',
          title: 'Agencia editada',
        })

        setCurrentPage(Number(currentPage))
        eventBus.emit(AGENCY_REGISTERED_REFETCH_KEY)
      } catch (error) {
        console.error(error)
        addToast({
          color: 'danger',
          title:
            formType === FormType.ADD
              ? 'No se pudo guardar la agencia'
              : 'No se pudo editar la agencia',
          description:
            (error as Error).message ??
            `Hubo un error al ${formType === FormType.ADD ? 'guardar' : 'editar'} la agencia`,
        })
      }
    },
    [
      emptyFormFields,
      formType,
      id,
      reset,
      meta,
      setCurrentPage,
      navigate,
      isSubmitting,
      currentPage,
    ],
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
      onClose={handleClose}
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
          <FormAgenciesFooter
            onClose={() => {
              onClose()
              handleClose()
            }}
            type={formType}
          />
        )}
      </FormModal.Footer>
    </FormModal>
  )
}

export default AgencyForm
