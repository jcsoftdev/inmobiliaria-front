import {
  addToast,
  Button,
  Input,
  Modal,
  ModalContent,
  ModalHeader,
  Select,
  SelectItem,
  useDisclosure,
} from '@heroui/react'
import useAppStore from '@store/index'
import { eventBus } from '@utils/publisher'
import { useCallback, useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { useNavigate } from 'react-router'

import { PROPERTY_REGISTERED_REFETCH_KEY } from '@components/modules/properties/constants'

import {
  PROPERTIES_AMENITIES,
  PROPERTIES_TYPES,
  PropertyAmenitiesEnum,
} from '@constants/property'

import { saveProperty } from '@services/properties'

type Inputs = {
  title: string
  description: string
  price: string
  propertyType: string
  location: string
  amenities: string
}

const PropertyForm = () => {
  const {
    setPropertiesRegistration,
    properties: { registration },
  } = useAppStore()
  const {
    isOpen,
    onOpen,
    onOpenChange,
    onClose: onCloseModal,
  } = useDisclosure()

  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    control,
    setValue,

    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: registration,
  })

  const handleChange = (key: keyof Inputs, value: string) => {
    setValue(key, value)
    setPropertiesRegistration({ [key]: value })
  }

  const onClose = () => {
    navigate(-1)
    onCloseModal()
    eventBus.emit(PROPERTY_REGISTERED_REFETCH_KEY)
  }

  const onSubmit = (props: Inputs) => {
    setPropertiesRegistration(props)
    saveProperty({
      description: props.description,
      features: props.amenities.split(',').map((amenity) => ({
        name: amenity,
        value:
          PropertyAmenitiesEnum[amenity as keyof typeof PropertyAmenitiesEnum],
      })),
      location: {
        address: props.location,
        coordinates: [0, 0],
        type: 'Point',
      },
      price: props.price,
      title: props.title,
      type: props.propertyType,
    })
      .then(() => {
        addToast({
          color: 'success',
          variant: 'solid',
          title: 'Propiedad registrada',
          description: 'La propiedad ha sido registrada con éxito',
          hideCloseButton: true,
        })
        onClose()
      })
      .catch(() => {
        addToast({
          color: 'danger',
          variant: 'solid',
          title: 'Error',
          description: 'Hubo un error al registrar la propiedad',
          hideCloseButton: true,
        })
      })
  }

  const onCancel = useCallback(() => {
    setPropertiesRegistration({
      name: '',
      description: '',
      price: '',
      amenities: '',
      location: '',
      type: '',
    })
  }, [setPropertiesRegistration])

  useEffect(() => {
    onOpen()
    return () => {
      onCancel()
    }
  }, [onCancel, onOpen])

  return (
    <Modal
      isDismissable={false}
      isKeyboardDismissDisabled={true}
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      onClose={onClose}
      className="p-4"
    >
      <ModalContent>
        <ModalHeader>Agregar Propiedad</ModalHeader>
        <form
          className="flex flex-col items-end"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="grid gap-4 grid-cols-2 py-4 w-full">
            <Input
              label="Nombre"
              {...register('title', { required: true })}
              errorMessage={errors.title ? 'Campo requerido' : ''}
              isInvalid={!!errors.title}
              onChange={(e) => handleChange('title', e.target.value)}
            />

            <Input
              label="Descripción"
              {...register('description', { required: true })}
              errorMessage={errors.description ? 'Campo requerido' : ''}
              isInvalid={!!errors.description}
              onChange={(e) => handleChange('description', e.target.value)}
            />

            <Input
              label="Precio"
              {...register('price', { required: true })}
              errorMessage={errors.price ? 'Campo requerido' : ''}
              isInvalid={!!errors.price}
              onChange={(e) => handleChange('price', e.target.value)}
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
                  onSelectionChange={(e) =>
                    handleChange('propertyType', [...e].join(','))
                  }
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
              onChange={(e) => handleChange('location', e.target.value)}
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
                  onSelectionChange={(e) =>
                    handleChange('amenities', [...e].join(','))
                  }
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
                onClose()
              }}
              type="button"
            >
              Cancelar
            </Button>
            <Button
              color="primary"
              className="my-4 mt-10 min-w-48"
              type="submit"
            >
              Guardar
            </Button>
          </div>
        </form>
      </ModalContent>
    </Modal>
  )
}

export default PropertyForm
