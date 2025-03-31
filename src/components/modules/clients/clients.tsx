import { Button } from '@heroui/button'
import { Outlet, useNavigate } from 'react-router'

import ClientsList from '@components/modules/clients/clients-list'

import { routes } from '@router/routes'

const Clients = () => {
  const navigate = useNavigate()

  const handleAddClient = () => {
    navigate(routes.clients.register.path)
  }

  return (
    <>
      <div className="flex justify-between mt-10">
        <h2 className="text-2xl">Clientes</h2>

        <Button color="primary" onPress={handleAddClient}>
          Agregar
        </Button>
      </div>

      <ClientsList />
      <Outlet />
    </>
  )
}

export default Clients
