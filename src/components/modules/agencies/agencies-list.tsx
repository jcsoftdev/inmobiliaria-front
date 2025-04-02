import { Button } from '@heroui/button'
import { addToast, Pagination } from '@heroui/react'
import {
  getKeyValue,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@heroui/table'
import { useEffect, useMemo, memo } from 'react'
import { useLocation, useNavigate } from 'react-router'

import Edit from '@components/icons/edit'
import Trash from '@components/icons/trash'
import { alert } from '@components/ui/alert'
import { SkeletonTable } from '@components/ui/skeletons/skeleton-table'

import { Data } from '@contracts/agencies.response'

import { deleteAgency } from '@services/agencies'

import { useNavigationPath } from '@utils/navigation'
import { eventBus } from '@utils/publisher'

import { useAgenciesStore } from '@store/agencies.store'

import { getDynamicRoute, routes } from '@router/routes'

import { usePaginator } from '@hooks/use-paginator'

import { tableColumns } from '../properties/constants'

import { AGENCY_REGISTERED_REFETCH_KEY, tableAgencyColumns } from './constants'
import { useGetAgencies } from './use-get-agencies'

interface AgencyListProps {
  searchTerm: string
}

const AgencyList: React.FC<AgencyListProps> = memo(({ searchTerm }) => {
  const { page, setCurrentPage } = usePaginator()
  const navigate = useNavigate()
  const location = useLocation()
  const { getPath } = useNavigationPath()
  const setEditingAgency = useAgenciesStore((state) => state.setEditingAgency)

  const memoizedProps = useMemo(
    () => ({
      currentPage: +page,
      enabled: true,
      q: searchTerm,
    }),
    [page, searchTerm],
  )

  const { error, isLoading, agencies, refetch, isFetching } =
    useGetAgencies(memoizedProps)

  const currentPageAgencies = useMemo(
    () => agencies?.data || [],
    [agencies?.data],
  )

  useEffect(() => {
    const handleUpdate = () => refetch()
    eventBus.on(AGENCY_REGISTERED_REFETCH_KEY, handleUpdate)

    return () => eventBus.off(AGENCY_REGISTERED_REFETCH_KEY, handleUpdate)
  }, [refetch])

  const handleDelete = useMemo(
    () => (id: string, extraInfo?: string) => {
      alert.fire({
        title: 'Eliminar Agencia',
        message: (
          <>
            <p className="h-3">¿Estás seguro de eliminar esta agencia?</p>
            <p className="font-semibold">{extraInfo}</p>
          </>
        ),
        showConfirmButton: true,
        showCancelButton: true,
        onConfirm: async () => {
          try {
            await deleteAgency(id)
            addToast({ color: 'warning', title: 'Agencia eliminada' })

            if (page > 1 && currentPageAgencies.length <= 1) {
              const newPage = searchTerm ? page - 1 : 1
              await new Promise<void>((resolve) => {
                setCurrentPage(newPage)
                setTimeout(resolve, 100)
              })
            }

            await refetch()

            if (currentPageAgencies.length === 0 && page > 1) {
              setCurrentPage(page - 1)
              await refetch()
            }
          } catch (error) {
            console.error('Error al eliminar la agencia:', error)
            addToast({
              color: 'danger',
              title: 'Error al eliminar la agencia',
              description: 'Por favor intente nuevamente',
            })
          }
        },
        onCancel: () => {},
      })
    },
    [refetch, page, currentPageAgencies.length, setCurrentPage, searchTerm],
  )

  useEffect(() => {
    if (
      !isLoading &&
      !isFetching &&
      currentPageAgencies.length === 0 &&
      page > 1
    ) {
      setCurrentPage(page - 1)
    }
  }, [currentPageAgencies.length, page, isLoading, isFetching, setCurrentPage])

  const handleEdit = useMemo(
    () => (agency: Data) => {
      setEditingAgency({
        name: agency.name,
        address: agency.address,
        ruc: agency.ruc,
      })

      const { to, state } = getPath(
        getDynamicRoute(routes.agencies.edit.path, { id: agency.id }),
        { page: page.toString() },
        { background: location },
      )

      navigate(to, { state })
    },
    [setEditingAgency, getPath, page, location, navigate],
  )

  const showEmptyMessage = currentPageAgencies.length === 0
  const isFiltering = Boolean(searchTerm)
  const hasAgencies = (agencies?.meta?.total ?? 0) > 0
  const showSkeleton = isLoading && !agencies

  if (showSkeleton) {
    return <SkeletonTable columns={8} tableColumns={tableColumns} hasActions />
  }

  if (error) {
    return <p>Error: {error.message}</p>
  }

  return (
    <div>
      {showEmptyMessage && isFiltering ? (
        <p>No se encontraron agencias para la búsqueda.</p>
      ) : !hasAgencies ? (
        <p className="text-center py-4">No hay agencias registradas.</p>
      ) : (
        <>
          <Table aria-label="Agencias" className="pt-4">
            <TableHeader columns={tableAgencyColumns}>
              {(column) => (
                <TableColumn key={column.key}>{column.title}</TableColumn>
              )}
            </TableHeader>
            <TableBody items={currentPageAgencies}>
              {(agency) => (
                <TableRow key={agency.id}>
                  {(columnKey) => (
                    <TableCell key={columnKey}>
                      {columnKey === 'actions' ? (
                        <div className="flex gap-4">
                          <Button
                            color="warning"
                            isIconOnly
                            className="text-white"
                            onPress={() => handleEdit(agency)}
                          >
                            <Edit />
                          </Button>
                          <Button
                            color="danger"
                            isIconOnly
                            className="text-white"
                            onPress={() => handleDelete(agency.id, agency.name)}
                          >
                            <Trash />
                          </Button>
                        </div>
                      ) : (
                        getKeyValue(agency, columnKey)
                      )}
                    </TableCell>
                  )}
                </TableRow>
              )}
            </TableBody>
          </Table>
        </>
      )}

      {hasAgencies && currentPageAgencies.length > 0 && (
        <div className="py-4">
          <Pagination
            color="primary"
            page={+page}
            total={+(agencies?.meta?.lastPage ?? 0)}
            onChange={setCurrentPage}
          />
        </div>
      )}
    </div>
  )
})

AgencyList.displayName = 'AgencyList'

export default AgencyList
