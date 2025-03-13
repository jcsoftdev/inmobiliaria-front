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
import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router'

import Edit from '@components/icons/edit'
import Trash from '@components/icons/trash'
import {
  CLIENT_REGISTERED_REFETCH_KEY,
  tableClientColumns,
} from '@components/modules/clients/constants'
import { useGetClients } from '@components/modules/clients/use-get-clients'
import { tableColumns } from '@components/modules/properties/constants'
import { alert } from '@components/ui/alert'
import { SkeletonPagination } from '@components/ui/skeletons/skeleton-pagination'
import { SkeletonTable } from '@components/ui/skeletons/skeleton-table'

import { deleteClient } from '@services/clients'

import { eventBus } from '@utils/publisher'

import { getDynamicRoute, routes } from '@router/routes'

import { usePaginator } from '@hooks/use-paginator'

const ClientsList = () => {
  const { page, setCurrentPage } = usePaginator()
  const navigate = useNavigate()
  const location = useLocation()

  const { error, isLoading, clients, refetch, isFetching } = useGetClients({
    currentPage: +page,
    enabled: true,
  })

  useEffect(() => {
    const handleUpdate = () => {
      refetch()
    }
    eventBus.on(CLIENT_REGISTERED_REFETCH_KEY, handleUpdate)

    return () => eventBus.off(CLIENT_REGISTERED_REFETCH_KEY, handleUpdate)
  }, [refetch])

  const handleDelete = (id: string, extraInfo?: string) => {
    alert.fire({
      title: 'Eliminar Cliente',
      message: (
        <>
          <p className="h-3">¿Estás seguro de eliminar este cliente?</p>
          <p className="font-semibold">{extraInfo}</p>
        </>
      ),

      showConfirmButton: true,
      showCancelButton: true,
      onConfirm: () => {
        deleteClient(id).then(() => {
          addToast({
            color: 'warning',
            title: 'Cliente eliminado',
          })
          refetch()
        })
      },
      onCancel: () => {},
    })
  }

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
      <Table aria-label="Clientes" className="pt-4">
        <TableHeader columns={tableClientColumns}>
          {(column) => {
            return <TableColumn key={column.key}>{column.title}</TableColumn>
          }}
        </TableHeader>
        <TableBody items={clients?.data}>
          {(client) => {
            return (
              <TableRow key={client.id}>
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
                                getDynamicRoute(routes.clients.edit, {
                                  id: client.id,
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
                              handleDelete(
                                client.id,
                                `${client.name} ${client.lastName}`,
                              )
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
                      {getKeyValue(client, columnKey)}
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
            total={+(clients?.meta?.lastPage ?? 0)}
            onChange={setCurrentPage}
          />
        </div>
      ) : (
        <SkeletonPagination total={+(clients?.meta?.lastPage ?? 0)} />
      )}
    </div>
  )
}

export default ClientsList
