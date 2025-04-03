import { Button } from '@heroui/button'
import { Outlet, useNavigate } from 'react-router'

import { SearchBar } from '@components/ui/search-bar'

import { routes } from '@router/routes'

import CompanyList from './companies-list'

const Companies = () => {
  const navigate = useNavigate()

  const handleAddCompany = () => {
    navigate(routes.companies.register.path)
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between mt-10">
        <div className="flex gap-20">
          <h2 className="text-2xl">Empresas</h2>

          <SearchBar
            placeholder="Buscar empresa"
            value=""
            onChange={() => {}}
          />
        </div>
        <Button color="primary" onPress={handleAddCompany}>
          Agregar
        </Button>
      </div>
      <CompanyList />

      <Outlet />
    </div>
  )
}

export default Companies
