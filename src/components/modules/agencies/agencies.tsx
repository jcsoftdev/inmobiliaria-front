import { Button } from '@heroui/button'
import { useCallback } from 'react'
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
  const { setCurrentPage } = usePaginator()
  const search = useAgenciesStore((state) => state.search)
  const setSearch = useAgenciesStore((state) => state.setSearch)
  const lastSearch = useAgenciesStore((state) => state.lastSearch)

  const handleSearch = useCallback(
    (value: string) => {
      if (value !== lastSearch) {
        setCurrentPage(1)
      }
      setSearch(value)
    },
    [lastSearch, setCurrentPage, setSearch],
  )

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

          <SearchBar
            placeholder="Buscar agencia"
            value={search ?? ''}
            onChange={handleSearch}
          />
        </div>
        <Button color="primary" onPress={handleAddAgency}>
          Agregar
        </Button>
      </div>

      <AgenciesList />
      <Outlet />
    </div>
  )
}

export default Agencies
