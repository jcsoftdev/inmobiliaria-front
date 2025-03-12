import { Button } from '@heroui/button'
import { Pagination } from '@heroui/react'
import {
  getKeyValue,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@heroui/table'
import { usePaginator } from '@hooks/use-paginator'
import { getDynamicRoute, routes } from '@router/routes'
import { eventBus } from '@utils/publisher'
import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router'

import Edit from '@components/icons/edit'
import Eye from '@components/icons/eye'
import Trash from '@components/icons/trash'
import {
  CLIENT_REGISTERED_REFETCH_KEY,
  tableClientColumns,
} from '@components/modules/clients/constants'
import { useGetClients } from '@components/modules/clients/use-get-clients'
import { tableColumns } from '@components/modules/properties/constants'
import { alert } from '@components/ui/alert'
import { SkeletonPagination } from '@components/ui/alert/skeletons/skeleton-pagination'
import { SkeletonTable } from '@components/ui/alert/skeletons/skeleton-table'

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
            console.log({ client })
            return (
              <TableRow key={client.id}>
                {(columnKey) => {
                  console.log({ columnKey })
                  if (columnKey === 'actions') {
                    return (
                      <TableCell key={columnKey}>
                        <div className="flex gap-4">
                          <Button
                            color="primary"
                            className="text-white"
                            isIconOnly
                          >
                            <Eye />
                          </Button>
                          <Button
                            color="warning"
                            isIconOnly
                            className="text-white"
                            onPress={() => {
                              console.log('Navigate to edit', client.id)
                              navigate(
                                getDynamicRoute(routes.clients.edit, {
                                  id: client.id,
                                }),
                                {
                                  state: { background: location },
                                }
                              )
                            }}
                          >
                            <Edit />
                          </Button>
                          <Button
                            color="danger"
                            isIconOnly
                            className="text-white"
                            onPress={() => {
                              alert.fire({
                                title: 'Eliminar Cliente',
                                message:
                                  '¿Estás seguro de eliminar este cliente?',
                                showConfirmButton: true,
                                onConfirm: () => {},
                                showCancelButton: false,
                              })
                            }}
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
