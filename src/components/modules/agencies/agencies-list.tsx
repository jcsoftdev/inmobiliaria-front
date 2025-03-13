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
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

import { SkeletonTable } from '@components/ui/skeletons/skeleton-table'

import { AgenciesResponse } from '@contracts/agencies.response'

import { getAgencies } from '@services/agencies'

import { useAgenciesStore } from '@store/agencies.store'

const tableColumns = [
  {
    key: 'name',
    title: 'Nombre',
  },
  {
    key: 'address',
    title: 'Dirección',
  },
  {
    key: 'phone',
    title: 'Teléfono',
  },
  {
    key: 'email',
    title: 'Email',
  },
]

const AgenciesList = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const perPage = 8
  const {
    data: agencies,
    error,
    isLoading,
  } = useQuery<AgenciesResponse>({
    queryKey: ['agencies', currentPage],
    queryFn: async () => await getAgencies({ perPage, page: currentPage }),
  })

  const { setAgencies } = useAgenciesStore()

  useEffect(() => {
    if (agencies) {
      setAgencies({
        data: agencies.data,
        meta: agencies.meta,
        isLoading,
        isError: !!error,
      })
    }
  }, [agencies, setAgencies, isLoading, error])

  if (isLoading) {
    return <SkeletonTable tableColumns={tableColumns} columns={perPage} />
  }

  if (error) {
    return (
      <p>
        Error:
        {error.message}
      </p>
    )
  }

  console.log({ agencies, error, isLoading })

  return (
    <div className="">
      <Table aria-label="Agencias" className="pt-4">
        <TableHeader columns={tableColumns}>
          {(column) => {
            return <TableColumn key={column.key}>{column.title}</TableColumn>
          }}
        </TableHeader>
        <TableBody items={agencies?.data}>
          {(agency) => {
            return (
              <TableRow key={agency.id}>
                {(columnKey) => {
                  return (
                    <TableCell key={columnKey}>
                      <span>{getKeyValue(agency, columnKey)}</span>
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
          total={agencies?.meta.lastPage ?? 0}
          onChange={setCurrentPage}
        />
      </div>
    </div>
  )
}

export default AgenciesList
