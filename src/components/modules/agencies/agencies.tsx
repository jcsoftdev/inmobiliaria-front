import { Button } from '@heroui/button'
import { Outlet, useNavigate } from 'react-router'

import { routes } from '@router/routes'

import AgenciesList from './agencies-list'

export const Agencies = () => {
  const navigate = useNavigate()

  const handleAddAgency = () => {
    navigate(routes.agencies.register.path)
  }

  return (
    <>
      <div className="flex justify-between mt-10">
        <h2 className="text-2xl">Agencias</h2>

        <Button color="primary" onPress={handleAddAgency}>
          Agregar
        </Button>
      </div>

      <AgenciesList />
      <Outlet />
    </>
  )
}

export default Agencies
