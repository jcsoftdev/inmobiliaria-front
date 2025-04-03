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
import { alert } from '@components/ui/alert'
import EmptyState from '@components/ui/empty-state'
import { SkeletonPagination } from '@components/ui/skeletons/skeleton-pagination'
import { SkeletonTable } from '@components/ui/skeletons/skeleton-table'

import { deleteCompany } from '@services/companies'

import { eventBus } from '@utils/publisher'

import { useCompaniesStore } from '@store/companies.store'

import { getDynamicRoute, routes } from '@router/routes'

import { usePaginator } from '@hooks/use-paginator'

import { tableColumns } from '../properties/constants'

import {
  COMPANY_REGISTERED_REFETCH_KEY,
  tableCompanyColumns,
} from './constants'
import { useGetCompanies } from './use-get-companies'

const CompanyList = () => {
  const { page, setCurrentPage } = usePaginator()
  const navigate = useNavigate()
  const location = useLocation()
  const search = useCompaniesStore((state) => state.search)
  const deleteFromCompanies = useCompaniesStore(
    (state) => state.deleteFromCompanies,
  )
  const { error, isLoading, meta, refetch, isFetching, companies } =
    useGetCompanies({
      currentPage: +page,
      enabled: true,
    })

  useEffect(() => {
    const handleUpdate = () => {
      refetch({ witLoader: true })
    }
    eventBus.on(COMPANY_REGISTERED_REFETCH_KEY, handleUpdate)

    return () => eventBus.off(COMPANY_REGISTERED_REFETCH_KEY, handleUpdate)
  }, [refetch])

  const handleDelete = (id: string, extraInfo?: string) => {
    alert.fire({
      title: 'Eliminar Empresa',
      message: (
        <>
          <p className="h-3">¿Estás seguro de eliminar esta empresa?</p>
          <p className="font-semibold">{extraInfo}</p>
        </>
      ),

      showConfirmButton: true,
      showCancelButton: true,
      onConfirm: () => {
        const actual = deleteFromCompanies(id)

        deleteCompany(id)
          .then(() => {
            addToast({
              color: 'success',
              title: 'Empresa eliminada',
            })
            if (!actual?.length && +page > 1) {
              setCurrentPage(Math.max(1, +page - 1))
              return
            }
            refetch()
          })
          .catch((error) => {
            addToast({
              color: 'danger',
              title: 'No se pudo eliminar la empresa',
              description:
                error.message ?? 'Hubo un error al eliminar la empresa',
            })
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

  if (
    (!companies?.length &&
      !isLoading &&
      !error &&
      +page > +(meta?.lastPage ?? 0)) ??
    0
  ) {
    setCurrentPage(meta?.lastPage ?? 1)
    return <SkeletonTable columns={8} tableColumns={tableColumns} hasActions />
  }

  if (!companies?.length && !isLoading && !error && +page === 1) {
    return (
      <EmptyState
        title={
          search?.length
            ? 'No se encontraron resultados'
            : 'No hay empresas registradas'
        }
        description={
          search?.length
            ? 'Intenta con otra búsqueda'
            : 'Agrega una empresa para comenzar a gestionar tus datos'
        }
        action={
          !search?.length
            ? {
                label: 'Crear Empresa',
                onClick: () => {
                  navigate(getDynamicRoute(routes.companies.register.path, {}))
                },
              }
            : undefined
        }
      />
    )
  }

  return (
    <div className="">
      <Table aria-label="Empresas" className="pt-4">
        <TableHeader columns={tableCompanyColumns}>
          {(column) => {
            return <TableColumn key={column.key}>{column.title}</TableColumn>
          }}
        </TableHeader>
        <TableBody items={companies}>
          {(company) => {
            return (
              <TableRow key={company.id}>
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
                                getDynamicRoute(routes.companies.edit.path, {
                                  id: company.id,
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
                              handleDelete(company.id, `${company.name}`)
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
                      {getKeyValue(company, columnKey)}
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
            total={+(meta?.lastPage ?? 0)}
            onChange={setCurrentPage}
          />
        </div>
      ) : (
        <SkeletonPagination total={+(meta?.lastPage ?? 0)} />
      )}
    </div>
  )
}

export default CompanyList
