import { Button } from '@heroui/button'
import { useLocation, useNavigate } from 'react-router'

import PropertiesList from '@components/modules/properties/properties-list'

const Properties = () => {
  // const { isOpen, onOpen } = useDisclosure()
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <div>
      <div className="flex justify-between mt-10">
        <h2 className="text-2xl">Propiedades</h2>
        <Button
          color="primary"
          onPress={() =>
            navigate('/properties/register', {
              state: { background: location },
            })
          }
          className=" mx-16"
        >
          Agregar
        </Button>
      </div>

      <PropertiesList />
    </div>
  )
}

export default Properties
