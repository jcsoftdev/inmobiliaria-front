import { Button } from '@heroui/button'
import { Chip } from '@heroui/chip'
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
import { useEffect } from 'react'

import Edit from '@components/icons/edit'
import Eye from '@components/icons/eye'
import Trash from '@components/icons/trash'
import {
  PROPERTY_REGISTERED_REFETCH_KEY,
  tableColumns,
} from '@components/modules/properties/constants'
import { useGetProperties } from '@components/modules/properties/use-fetch-properties'
import { SkeletonPagination } from '@components/ui/skeletons/skeleton-pagination'
import { SkeletonTable } from '@components/ui/skeletons/skeleton-table'

import { eventBus } from '@utils/publisher'

import { usePaginator } from '@hooks/use-paginator'

const statusMap = {
  active: <Chip color="success">Activo</Chip>,
  reserved: <Chip color="warning">Reservado</Chip>,
  sold: <Chip color="danger">Vendido</Chip>,
  available: <Chip color="success">Disponible</Chip>,
}

const typeMap = {
  house: '🏠',
  apartment: '🏢',
  land: '🏞️',
  loft: '🏞️',
  commercial: '🏬',
  penthouse: '🏡',
  parking: '🚗',
}

const PropertiesList = () => {
  const { page, setCurrentPage } = usePaginator()

  const { error, isLoading, properties, refetch, isFetching } =
    useGetProperties({
      currentPage: +page,
      enabled: true,
    })

  useEffect(() => {
    const handleUpdate = () => {
      refetch()
    }
    eventBus.on(PROPERTY_REGISTERED_REFETCH_KEY, handleUpdate)

    return () => eventBus.off(PROPERTY_REGISTERED_REFETCH_KEY, handleUpdate)
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
      <Table aria-label="Propiedades" className="pt-4">
        <TableHeader columns={tableColumns}>
          {(column) => {
            return <TableColumn key={column.key}>{column.title}</TableColumn>
          }}
        </TableHeader>
        <TableBody items={properties?.data}>
          {(property) => {
            return (
              <TableRow key={property.id}>
                {(columnKey) => {
                  if (columnKey === 'status') {
                    return (
                      <TableCell key={columnKey} className="text-white">
                        <span className="!text-white">
                          {
                            statusMap[
                              (
                                getKeyValue(property, columnKey) as string
                              ).toLowerCase() as keyof typeof statusMap
                            ]
                          }
                        </span>
                      </TableCell>
                    )
                  }

                  if (columnKey === 'type') {
                    return (
                      <TableCell key={columnKey}>
                        {typeMap[
                          (
                            getKeyValue(property, columnKey) as string
                          ).toLowerCase() as keyof typeof typeMap
                        ] || getKeyValue(property, columnKey)}
                      </TableCell>
                    )
                  }

                  if (columnKey === 'price') {
                    return (
                      <TableCell key={columnKey}>
                        {`${getKeyValue(property, columnKey)}`
                          .toString()
                          ?.split?.(',')
                          .map((price: string) => (
                            <Chip
                              key={price}
                              className="mr-2"
                              variant="light"
                              classNames={{ content: 'text-left p-0' }}
                            >
                              S/ {price}
                            </Chip>
                          ))}
                      </TableCell>
                    )
                  }

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
                          >
                            <Edit />
                          </Button>
                          <Button
                            color="danger"
                            isIconOnly
                            className="text-white"
                          >
                            <Trash />
                          </Button>
                        </div>
                      </TableCell>
                    )
                  }

                  return (
                    <TableCell key={columnKey}>
                      {getKeyValue(property, columnKey)}
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
            total={+(properties?.meta?.lastPage ?? 0)}
            onChange={setCurrentPage}
          />
        </div>
      ) : (
        <SkeletonPagination total={+(properties?.meta?.lastPage ?? 0)} />
      )}
    </div>
  )
}

export default PropertiesList
