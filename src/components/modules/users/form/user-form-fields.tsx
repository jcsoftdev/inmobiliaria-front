import { Input, Select, SelectItem } from '@heroui/react'
import { UseFormRegister, FieldErrors, UseFormTrigger } from 'react-hook-form'

import { Inputs, FormType } from '@components/modules/users/types'

interface CustomFieldProps {
  register?: UseFormRegister<Inputs>
  errors: FieldErrors<Inputs>
  handleChange: (key: keyof Inputs, value: string) => void
  fields: Inputs
  formType: FormType
  trigger?: UseFormTrigger<Inputs>
}

export const ExpirationDateField = ({
  register,
  errors,
  handleChange,
  fields,
  trigger,
}: CustomFieldProps) => (
  <Input
    key="expiresAt"
    type="date"
    label="Fecha de expiración"
    errorMessage={errors.expiresAt ? 'Campo requerido' : ''}
    isInvalid={!!errors.expiresAt}
    value={fields.expiresAt ? fields.expiresAt.split('T')[0] : ''}
    {...register?.('expiresAt', {
      required: 'Campo requerido',
    })}
    onChange={(e) => {
      handleChange('expiresAt', e.target.value)
      trigger?.('expiresAt')
    }}
  />
)

export const RoleField = ({
  register,
  handleChange,
  fields,
  errors,
}: CustomFieldProps) => (
  <Select
    key="role"
    label="Rol"
    errorMessage={errors.role ? 'Campo requerido' : ''}
    isInvalid={!!errors.role}
    selectedKeys={fields.role ? new Set([fields.role]) : new Set()}
    {...register?.('role', { required: 'Campo requerido' })}
    onSelectionChange={(value) => {
      const selectedValue = Array.from(value)[0] as string
      handleChange('role', selectedValue)
    }}
  >
    <SelectItem key="admin">Administrador</SelectItem>
    <SelectItem key="seller">Vendedor</SelectItem>
  </Select>
)

export const StatusField = ({
  register,
  handleChange,
  fields,
  errors,
  formType,
}: CustomFieldProps) => {
  if (formType === FormType.ADD) return null

  return (
    <Select
      key="status"
      label="Estado"
      errorMessage={errors.status ? 'Campo requerido' : ''}
      isInvalid={!!errors.status}
      selectedKeys={fields.status ? new Set([fields.status]) : new Set()}
      {...register?.('status', { required: 'Campo requerido' })}
      onSelectionChange={(value) => {
        const selectedValue = Array.from(value)[0] as string
        handleChange('status', selectedValue)
      }}
    >
      <SelectItem key="active">Activo</SelectItem>
      <SelectItem key="inactive">Inactivo</SelectItem>
    </Select>
  )
}
