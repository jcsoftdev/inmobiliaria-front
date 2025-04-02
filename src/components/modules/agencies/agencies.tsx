import { Button } from '@heroui/button'
import { useState, useRef } from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router'

import { SearchBar } from '@components/ui/search-bar'

import { useNavigationPath } from '@utils/navigation'

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

  const handleSearch = (value: string) => {
    if (!searchTerm && value) {
      lastPage.current = page
      setCurrentPage(1)
    } else if (searchTerm && !value) {
      setCurrentPage(lastPage.current)
    } else if (value !== searchTerm && value) {
      setCurrentPage(1)
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
    <>
      <div className="flex justify-between items-center mt-10">
        <h2 className="text-2xl">Agencias</h2>

        <div className="flex justify-between items-center w-full">
          <SearchBar
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Buscar Agencia..."
          />

          <Button color="primary" onPress={handleAddAgency}>
            Agregar
          </Button>
        </div>
      </div>

      <AgenciesList searchTerm={searchTerm} />
      <Outlet />
    </>
  )
}

export default Agencies
