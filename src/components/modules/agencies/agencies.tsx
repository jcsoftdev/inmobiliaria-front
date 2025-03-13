import { Button } from '@heroui/button'
import { Outlet, useLocation, useNavigate } from 'react-router'

import { routes } from '@router/routes'

import AgenciesList from './agencies-list'

export const Agencies = () => {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <div>
      <div className="flex justify-between mt-10">
        <h2 className="text-2x1">Agencias</h2>
        <Button
          color="primary"
          onPress={() =>
            navigate(routes.agencies.register, {
              state: { background: location },
            })
          }
          className=" mx-16"
        >
          Agregar
        </Button>
      </div>

      <AgenciesList />
      <Outlet />
    </div>
  )
}

export default Agencies
