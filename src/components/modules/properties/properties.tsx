import { Button } from '@heroui/button'
import { Outlet, useLocation, useNavigate } from 'react-router'

import PropertiesList from '@components/modules/properties/properties-list'

import { routes } from '@router/routes'

const Properties = () => {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <div className="properties">
      <div className="flex justify-between mt-10">
        <h2 className="text-2xl">Propiedades</h2>

        <Button
          color="primary"
          onPress={() =>
            navigate(routes.properties.register, {
              state: { background: location },
            })
          }
          className=" mx-16"
        >
          Agregar
        </Button>
      </div>
      <PropertiesList />
      <Outlet />
    </div>
  )
}

export default Properties
