import { Button } from '@heroui/button'
import { Outlet, useNavigate } from 'react-router'

import { routes } from '@router/routes'

import UsersList from './users-list'

export const Users = () => {
  const navigate = useNavigate()

  const handleAddUser = () => {
    navigate(routes.users.register)
  }

  return (
    <>
      <div className="flex justify-between mt-10">
        <h2 className="text-2xl">Usuarios</h2>

        <Button color="primary" onPress={handleAddUser}>
          Agregar
        </Button>
      </div>

      <UsersList />
      <Outlet />
    </>
  )
}

export default Users
