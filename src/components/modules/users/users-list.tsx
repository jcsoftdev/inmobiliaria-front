import { Button } from '@heroui/button'
import { Chip } from '@heroui/chip'
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
import { useEffect, JSX } from 'react'
import { useLocation, useNavigate } from 'react-router'

import Edit from '@components/icons/edit'
import Trash from '@components/icons/trash'
import { tableColumns } from '@components/modules/properties/constants'
import {
  USER_REGISTERED_REFETCH_KEY,
  tableUserColumns,
} from '@components/modules/users/constants'
import { useGetUsers } from '@components/modules/users/use-get-users'
import { alert } from '@components/ui/alert'
import { SkeletonPagination } from '@components/ui/skeletons/skeleton-pagination'
import { SkeletonTable } from '@components/ui/skeletons/skeleton-table'

import { deleteUser } from '@services/users'

import { formatDate } from '@utils/date'
import { eventBus } from '@utils/publisher'

import { getDynamicRoute, routes } from '@router/routes'

import { usePaginator } from '@hooks/use-paginator'

const statusUser: Record<string, JSX.Element> = {
  active: (
    <Chip color="success" variant="flat">
      Activo
    </Chip>
  ),
  inactive: (
    <Chip color="danger" variant="flat">
      Inactivo
    </Chip>
  ),
} as const

const roleLabels: Record<string, string> = {
  admin: 'Administrador',
  seller: 'Vendedor',
} as const

const UsersList = () => {
  const { page, setCurrentPage } = usePaginator()
  const navigate = useNavigate()
  const location = useLocation()

  const { error, isLoading, users, refetch, isFetching } = useGetUsers({
    currentPage: +page,
    enabled: true,
  })

  useEffect(() => {
    const handleUpdate = () => {
      refetch()
    }
    eventBus.on(USER_REGISTERED_REFETCH_KEY, handleUpdate)

    return () => eventBus.off(USER_REGISTERED_REFETCH_KEY, handleUpdate)
  }, [refetch])

  const handleDelete = (id: string, extraInfo?: string) => {
    alert.fire({
      title: 'Eliminar Usuario',
      message: (
        <>
          <p className="h-3">¿Estás seguro de eliminar este usuario?</p>
          <p className="font-semibold">{extraInfo}</p>
        </>
      ),

      showConfirmButton: true,
      showCancelButton: true,
      onConfirm: () => {
        deleteUser(id).then(() => {
          addToast({
            color: 'warning',
            title: 'Usuario eliminado',
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
      <Table aria-label="Usuarios" className="pt-4">
        <TableHeader columns={tableUserColumns}>
          {(column) => {
            return <TableColumn key={column.key}>{column.title}</TableColumn>
          }}
        </TableHeader>
        <TableBody items={users?.data ?? []}>
          {(user) => {
            return (
              <TableRow key={user.id}>
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
                                getDynamicRoute(routes.users.edit, {
                                  id: user.id,
                                }),
                                { state: { background: location } },
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
                                user.id,
                                `${user.name} ${user.lastName}`,
                              )
                            }
                          >
                            <Trash />
                          </Button>
                        </div>
                      </TableCell>
                    )
                  }
                  if (columnKey === 'status') {
                    return (
                      <TableCell key={columnKey}>
                        {statusUser[user.status] || (
                          <Chip color="default">Desconocido</Chip>
                        )}
                      </TableCell>
                    )
                  }
                  if (columnKey === 'role') {
                    return (
                      <TableCell key={columnKey}>
                        {roleLabels[user.role] || 'Desconocido'}
                      </TableCell>
                    )
                  }
                  if (columnKey === 'createdAt') {
                    return (
                      <TableCell key={columnKey}>
                        <span>{formatDate(user.createdAt)}</span>
                      </TableCell>
                    )
                  }
                  if (columnKey === 'expiresAt') {
                    return (
                      <TableCell key={columnKey}>
                        <span>{formatDate(user.expiresAt)}</span>
                      </TableCell>
                    )
                  }

                  return (
                    <TableCell key={columnKey}>
                      {getKeyValue(user, columnKey)}
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
            total={+(users?.meta?.lastPage ?? '')}
            onChange={setCurrentPage}
          />
        </div>
      ) : (
        <SkeletonPagination total={+(users?.meta?.lastPage ?? 0)} />
      )}
    </div>
  )
}

export default UsersList
