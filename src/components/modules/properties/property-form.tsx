import { Button, Input, Select, SelectItem } from '@heroui/react'
import { useForm, Controller } from 'react-hook-form'

import { PROPERTIES_AMENITIES, PROPERTIES_TYPES } from '@constants/property'

type Inputs = {
  title: string
  description: string
  price: string
  propertyType: string
  location: string
  amenities: string
}

interface Props {
  onSubmit: (data: Inputs) => void
  onCancel: () => void
}

const PropertyForm = ({ onCancel, onSubmit }: Props) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Inputs>()

  return (
    <form className="flex flex-col items-end" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-4 grid-cols-2 py-4 w-full">
        <Input
          label="Nombre"
          {...register('title', { required: true })}
          errorMessage={errors.title ? 'Campo requerido' : ''}
          isInvalid={!!errors.title}
        />

        <Input
          label="Descripción"
          {...register('description', { required: true })}
          errorMessage={errors.description ? 'Campo requerido' : ''}
          isInvalid={!!errors.description}
        />

        <Input
          label="Precio"
          {...register('price', { required: true })}
          errorMessage={errors.price ? 'Campo requerido' : ''}
          isInvalid={!!errors.price}
        />

        <Controller
          name="propertyType"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <Select
              label="Tipo"
              placeholder="Selecciona un tipo"
              errorMessage={errors.propertyType ? 'Campo requerido' : ''}
              isInvalid={!!errors.propertyType}
              multiple={false}
              {...field}
            >
              {PROPERTIES_TYPES.map((type) => (
                <SelectItem key={type.key}>{type.value}</SelectItem>
              ))}
            </Select>
          )}
        />

        <Input
          label="Ubicación"
          errorMessage={errors.location ? 'Campo requerido' : ''}
          isInvalid={!!errors.location}
          {...register('location', { required: true })}
        />

        <Controller
          name="amenities"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <Select
              label="Amenidades"
              placeholder="Selecciona una o más amenidades"
              selectionMode="multiple"
              errorMessage={errors.amenities ? 'Campo requerido' : ''}
              isInvalid={!!errors.amenities}
              {...field}
            >
              <>
                <SelectItem isReadOnly key="add"></SelectItem>
                {PROPERTIES_AMENITIES.map((animal) => (
                  <SelectItem key={animal.key}>{animal.value}</SelectItem>
                ))}
              </>
            </Select>
          )}
        />
      </div>
      <div className="flex justify-end gap-4">
        <Button
          color="primary"
          variant="bordered"
          className="my-4 mt-10 min-w-48"
          onPress={() => {
            onCancel()
          }}
          type="button"
        >
          Cancelar
        </Button>
        <Button color="primary" className="my-4 mt-10 min-w-48" type="submit">
          Guardar
        </Button>
      </div>
    </form>
  )
}

export default PropertyForm
