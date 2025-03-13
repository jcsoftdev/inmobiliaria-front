import { Input } from '@heroui/react'
import { useForm } from 'react-hook-form'

import { Inputs } from '@components/modules/clients/types'

interface FormBodyProps {
  register: ReturnType<typeof useForm>['register']
  errors: ReturnType<typeof useForm>['formState']['errors']
  handleChange: (key: keyof Inputs, value: string) => void
  fields: Inputs
}

export const FormClientFields = ({
  errors,
  handleChange,
  register,
  fields,
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
              key: 'email',
              title: 'Email',
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
              key: 'address',
              title: 'Dirección',
            },
            {
              key: 'phone',
              title: 'Teléfono',
            },
          ] as const
        ).map((field) => {
          const registration = register(field.key, { required: true })
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
      </div>
    </div>
  )
}
