import { Button } from '@heroui/button'
import { routes } from '@router/routes'
import { useLocation, useNavigate } from 'react-router'

import ClientsList from '@components/modules/clients/clients-list'

const Clients = () => {
  const navigate = useNavigate()

  const location = useLocation()

  return (
    <>
      <div className="flex justify-between mt-10">
        <h2 className="text-2xl">Clientes</h2>

        <Button
          color="default"
          onPress={() =>
            navigate(routes.properties.register, {
              state: { background: location },
            })
          }
          // className="mx-16"
        >
          Agregar
        </Button>
      </div>

      <ClientsList />
    </>
  )
}

export default Clients
