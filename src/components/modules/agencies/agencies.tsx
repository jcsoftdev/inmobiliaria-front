import { Button } from '@heroui/button'
import { useState, useRef } from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router'

import { SearchBar } from '@components/ui/search-bar'

import { useNavigationPath } from '@utils/navigation'

import { useAgenciesStore } from '@store/agencies.store'

import { routes } from '@router/routes'

import { usePaginator } from '@hooks/use-paginator'

import AgenciesList from './agencies-list'

export const Agencies = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { getPath } = useNavigationPath()
  const { setCurrentPage, page } = usePaginator()
  const [searchTerm, setSearchTerm] = useState('')
  const lastPage = useRef(page)
  const agencies = useAgenciesStore((state) => state.data)
  const hasAgencies = (agencies?.length ?? 0) > 0

  const handleSearch = (value: string) => {
    if (value !== searchTerm) {
      if (!value) {
        setCurrentPage(1)
      } else if (!searchTerm) {
        lastPage.current = page
        setCurrentPage(1)
      } else if (value) {
        setCurrentPage(1)
      }
    }

    setSearchTerm(value)
  }

  const handleAddAgency = () => {
    const { to, state } = getPath(
      routes.agencies.register.path,
      {},
      { background: location, preserveParams: true },
    )
    navigate(to, { state })
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between mt-10">
        <div className="flex gap-20">
          <h2 className="text-2xl">Agencias</h2>

          {hasAgencies && (
            <SearchBar
              placeholder="Buscar agencia"
              value={searchTerm}
              onChange={handleSearch}
            />
          )}
        </div>
        {hasAgencies && (
          <Button color="primary" onPress={handleAddAgency}>
            Agregar
          </Button>
        )}
      </div>

      <AgenciesList searchTerm={searchTerm} />
      <Outlet />
    </div>
  )
}

export default Agencies
