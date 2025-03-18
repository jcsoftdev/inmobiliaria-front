import { Input } from '@heroui/react'
import { useForm } from 'react-hook-form'

import { FormType, Inputs } from '@components/modules/users/types'

import { ExpirationDateField, RoleField, StatusField } from './user-form-fields'

interface FormBodyProps {
  register: ReturnType<typeof useForm>['register']
  errors: ReturnType<typeof useForm>['formState']['errors']
  handleChange: (key: keyof Inputs, value: string) => void
  fields: Inputs
  formType: FormType
}

export const FormUserFields = ({
  errors,
  handleChange,
  register,
  fields,
  formType,
}: FormBodyProps) => {
  return (
    <div className="flex flex-col items-end">
      <div className="grid gap-4 md:grid-cols-2 w-full">
        {(
          [
            {
              key: 'dni',
              title: 'DNI',
            },
            {
              key: 'name',
              title: 'Nombre',
            },
            {
              key: 'lastName',
              title: 'Apellido',
            },
            {
              key: 'username',
              title: 'Usuario',
            },
            {
              key: 'email',
              title: 'Email',
            },
            {
              key: 'password',
              title: 'Contraseña',
            },
          ] as const
        ).map((field) => {
          const registration = register(field.key, {
            required:
              field.key === 'password' ? formType === FormType.ADD : true,
          })
          return (
            <Input
              key={field.key}
              label={field.title}
              errorMessage={errors[field.key] ? 'Campo requerido' : ''}
              isInvalid={!!errors[field.key]}
              value={fields[field.key] ?? ''}
              {...registration}
              onChange={(e) => {
                handleChange(field.key, e.target.value)
                registration.onChange(e)
              }}
            />
          )
        })}

        <ExpirationDateField
          register={register}
          errors={errors}
          handleChange={handleChange}
          fields={fields}
          formType={formType}
        />
        <RoleField
          register={register}
          errors={errors}
          handleChange={handleChange}
          fields={fields}
          formType={formType}
        />
        <StatusField
          errors={errors}
          handleChange={handleChange}
          fields={fields}
          formType={formType}
        />
      </div>
    </div>
  )
}
