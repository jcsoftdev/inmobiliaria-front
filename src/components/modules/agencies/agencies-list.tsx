import { Button } from '@heroui/button'
import { Input } from '@heroui/react'
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
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router'

import Edit from '@components/icons/edit'
import Trash from '@components/icons/trash'
import { alert } from '@components/ui/alert'
import { SkeletonPagination } from '@components/ui/skeletons/skeleton-pagination'
import { SkeletonTable } from '@components/ui/skeletons/skeleton-table'

import { deleteAgency } from '@services/agencies'

import { eventBus } from '@utils/publisher'

import { getDynamicRoute, routes } from '@router/routes'

import { usePaginator } from '@hooks/use-paginator'

import { tableColumns } from '../properties/constants'

import { AGENCY_REGISTERED_REFETCH_KEY, tableAgencyColumns } from './constants'
import { useGetAgencies } from './use-get-agencies'

const AgencyList = () => {
  const { page, setCurrentPage } = usePaginator()
  const navigate = useNavigate()
  const location = useLocation()

  const [searchTerm, setSearchTerm] = useState('')

  const { error, isLoading, agencies, refetch, isFetching } = useGetAgencies({
    currentPage: +page,
    enabled: true,
  })

  useEffect(() => {
    const handleUpdate = () => {
      refetch()
    }
    eventBus.on(AGENCY_REGISTERED_REFETCH_KEY, handleUpdate)

    return () => eventBus.off(AGENCY_REGISTERED_REFETCH_KEY, handleUpdate)
  }, [refetch])

  const handleDelete = (id: string, extraInfo?: string) => {
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
      onConfirm: () => {
        deleteAgency(id).then(() => {
          addToast({
            color: 'warning',
            title: 'Agencia eliminada',
          })
          refetch()
        })
      },
      onCancel: () => {},
    })
  }

  const filteredAgencies = agencies?.data.filter((agency) =>
    agency.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  if (isLoading) {
    return <SkeletonTable columns={8} tableColumns={tableColumns} hasActions />
  }

  if (error) {
    return (
      <p>
        Error:
        {error.message}
      </p>
    )
  }

  return (
    <div className="">
      <div className="mb-4">
        <Input
          type="text"
          placeholder="Buscar Agencia..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full , mt-4"
        />
      </div>
      <Table aria-label="Agencias" className="pt-4">
        <TableHeader columns={tableAgencyColumns}>
          {(column) => {
            return <TableColumn key={column.key}>{column.title}</TableColumn>
          }}
        </TableHeader>
        <TableBody items={filteredAgencies ?? []}>
          {(agency) => {
            return (
              <TableRow key={agency.id}>
                {(columnKey) => {
                  if (columnKey === 'actions') {
                    return (
                      <TableCell key={columnKey}>
                        <div className="flex gap-4">
                          <Button
                            color="warning"
                            isIconOnly
                            className="text-white"
                            onPress={() => {
                              navigate(
                                getDynamicRoute(routes.agencies.edit.path, {
                                  id: agency.id,
                                }),
                                {
                                  state: { background: location },
                                },
                              )
                            }}
                          >
                            <Edit />
                          </Button>
                          <Button
                            color="danger"
                            isIconOnly
                            className="text-white"
                            onPress={() =>
                              handleDelete(agency.id, `${agency.name}`)
                            }
                          >
                            <Trash />
                          </Button>
                        </div>
                      </TableCell>
                    )
                  }
                  return (
                    <TableCell key={columnKey}>
                      {getKeyValue(agency, columnKey)}
                    </TableCell>
                  )
                }}
              </TableRow>
            )
          }}
        </TableBody>
      </Table>
      {!isLoading && !isFetching ? (
        <div className="py-4">
          <Pagination
            color="primary"
            page={+page}
            total={+(agencies?.meta?.lastPage ?? 0)}
            onChange={setCurrentPage}
          />
        </div>
      ) : (
        <SkeletonPagination total={+(agencies?.meta?.lastPage ?? 0)} />
      )}
    </div>
  )
}

export default AgencyList
