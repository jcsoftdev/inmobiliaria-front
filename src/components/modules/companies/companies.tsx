import { Button } from '@heroui/button'
import { Outlet, useNavigate } from 'react-router'

import { routes } from '@router/routes'

import CompanyList from './companies-list'

const Companies = () => {
  const navigate = useNavigate()

  const handleAddCompany = () => {
    navigate(routes.companies.register)
  }

  return (
    <>
      <div className="flex justify-between mt-10">
        <h2 className="text-2xl">Empresas</h2>

        <Button color="primary" onPress={handleAddCompany}>
          Agregar
        </Button>
      </div>

      <CompanyList />
      <Outlet />
    </>
  )
}

export default Companies
