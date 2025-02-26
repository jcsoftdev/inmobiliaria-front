import { Button } from '@heroui/button'
import {
  addToast,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from '@heroui/react'

import PropertiesList from '@components/modules/properties/properties-list'
import PropertyForm from '@components/modules/properties/property-form'

import { PropertyAmenitiesEnum } from '@constants/property'

import { saveProperty } from '@services/properties'

const Properties = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <div>
      <div className="flex justify-between mt-10">
        <h2 className="text-2xl">Propiedades</h2>
        <Button color="primary" onPress={onOpen} className=" mx-16">
          Agregar
        </Button>
      </div>

      <Modal isOpen={isOpen} onClose={onClose} size="4xl" isDismissable={false}>
        <ModalContent>
          <ModalHeader>Agregar Propiedad</ModalHeader>
          <ModalBody>
            <PropertyForm
              onSubmit={(props) => {
                console.log({ props })
                saveProperty({
                  description: props.description,
                  features: props.amenities.split(',').map((amenity) => ({
                    name: amenity,
                    value:
                      PropertyAmenitiesEnum[
                        amenity as keyof typeof PropertyAmenitiesEnum
                      ],
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
              }}
              onCancel={onClose}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
      <PropertiesList />
    </div>
  )
}

export default Properties
