import { Button } from '@heroui/button'
import { useCallback } from 'react'
import { Outlet, useNavigate } from 'react-router'

import { SearchBar } from '@components/ui/search-bar'

import { useCompaniesStore } from '@store/companies.store'

import { routes } from '@router/routes'

import { usePaginator } from '@hooks/use-paginator'

import CompanyList from './companies-list'

const Companies = () => {
  const navigate = useNavigate()
  const search = useCompaniesStore((state) => state.search)
  const setSearch = useCompaniesStore((state) => state.setSearch)
  const lastSearch = useCompaniesStore((state) => state.lastSearch)
  const { setCurrentPage } = usePaginator()

  const handleAddCompany = () => {
    navigate(routes.companies.register.path)
  }

  const handleSearch = useCallback(
    (value: string) => {
      if (value !== lastSearch) {
        setCurrentPage(1)
      }
      setSearch(value)
    },
    [lastSearch, setCurrentPage, setSearch],
  )

  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between mt-10">
        <div className="flex gap-20">
          <h2 className="text-2xl">Empresas</h2>

          <SearchBar
            placeholder="Buscar empresa"
            value={search ?? ''}
            onChange={handleSearch}
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
