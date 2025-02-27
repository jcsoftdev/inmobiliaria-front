import { Button } from '@heroui/button'
import { Chip } from '@heroui/chip'
import { Pagination, Skeleton } from '@heroui/react'
import {
  getKeyValue,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@heroui/table'
import { useAppStore } from '@store/index'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

import { PropertiesResponse } from '@contracts/properties.response'

import { getProperties } from '@services/properties'

const tableColumns = [
  {
    key: 'title',
    title: 'Nombre',
  },
  {
    key: 'description',
    title: 'Descripción',
  },
  {
    key: 'price',
    title: 'Precio',
  },
  {
    key: 'type',
    title: 'Tipo',
  },
  // {
  //   key: 'features',
  //   title: 'Características',
  // },
  {
    key: 'status',
    title: 'Estado',
  },
  // {
  //   key: 'created_at',
  //   title: 'Creado',
  // },
  {
    key: 'actions',
    title: 'Acciones',
  },
]

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

const SkeletonTable = ({ columns: c }: { columns: number }) => {
  const columns = Array.from({ length: c }).map((_, index) => ({
    index: `${index}`,
  }))
  return (
    <Table aria-label="Propiedades" className="pt-4">
      <TableHeader columns={tableColumns}>
        {(column) => {
          return <TableColumn key={column.key}>{column.title}</TableColumn>
        }}
      </TableHeader>
      <TableBody items={columns}>
        {({ index }) => {
          return (
            <TableRow key={index}>
              {(columnKey) => {
                console.log({ columnKey })

                if (columnKey === 'actions') {
                  return (
                    <TableCell key={columnKey} className="w-0">
                      <div className="py-2 flex gap-4 w-full justify-center">
                        <Skeleton className="rounded-lg w-10">
                          <div className="h-8 rounded-lg bg-default-300" />
                        </Skeleton>
                        <Skeleton className="rounded-lg w-10 ">
                          <div className="h-8 rounded-lg bg-default-300" />
                        </Skeleton>
                        <Skeleton className="rounded-lg w-10">
                          <div className="h-8 rounded-lg bg-default-300" />
                        </Skeleton>
                      </div>
                    </TableCell>
                  )
                }

                return (
                  <TableCell key={columnKey}>
                    <div className="py-2">
                      <Skeleton className="rounded-lg">
                        <div className="h-8 rounded-lg bg-default-300" />
                      </Skeleton>
                    </div>
                  </TableCell>
                )
              }}
            </TableRow>
          )
        }}
      </TableBody>
    </Table>
  )
}

const PropertiesList = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const perPage = 8
  const {
    data: properties,
    error,
    isLoading,
  } = useQuery<PropertiesResponse>({
    queryKey: ['properties', currentPage],
    queryFn: async () => await getProperties({ perPage, page: currentPage }),
  })

  const { setProperties } = useAppStore()

  useEffect(() => {
    if (properties) {
      setProperties({
        data: properties.data,
        meta: properties.meta,
        isLoading,
        isError: !!error,
      })
    }
  }, [properties, setProperties, isLoading, error])

  if (isLoading) {
    return <SkeletonTable columns={perPage} />
  }

  if (error) {
    return (
      <p>
        Error:
        {error.message}
      </p>
    )
  }

  console.log({ properties, error, isLoading })

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
            console.log({ property }, getKeyValue(property, 'title'))
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
                          <Button color="primary" className="!p-0" isIconOnly>
                            <svg
                              className="w-6 h-6 text-white dark:text-white"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M4.998 7.78C6.729 6.345 9.198 5 12 5c2.802 0 5.27 1.345 7.002 2.78a12.713 12.713 0 0 1 2.096 2.183c.253.344.465.682.618.997.14.286.284.658.284 1.04s-.145.754-.284 1.04a6.6 6.6 0 0 1-.618.997 12.712 12.712 0 0 1-2.096 2.183C17.271 17.655 14.802 19 12 19c-2.802 0-5.27-1.345-7.002-2.78a12.712 12.712 0 0 1-2.096-2.183 6.6 6.6 0 0 1-.618-.997C2.144 12.754 2 12.382 2 12s.145-.754.284-1.04c.153-.315.365-.653.618-.997A12.714 12.714 0 0 1 4.998 7.78ZM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                            </svg>
                          </Button>
                          <Button color="warning" isIconOnly>
                            <svg
                              className="w-6 h-6 text-white dark:text-white"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M10.779 17.779 4.36 19.918 6.5 13.5m4.279 4.279 8.364-8.643a3.027 3.027 0 0 0-2.14-5.165 3.03 3.03 0 0 0-2.14.886L6.5 13.5m4.279 4.279L6.499 13.5m2.14 2.14 6.213-6.504M12.75 7.04 17 11.28"
                              />
                            </svg>
                          </Button>
                          <Button color="danger" isIconOnly>
                            <svg
                              className="w-6 h-6 text-white dark:text-white"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"
                              />
                            </svg>
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
      <div className="py-4">
        <Pagination
          color="primary"
          page={currentPage}
          total={properties?.meta.lastPage ?? 0}
          onChange={setCurrentPage}
        />
      </div>
    </div>
  )
}

export default PropertiesList
