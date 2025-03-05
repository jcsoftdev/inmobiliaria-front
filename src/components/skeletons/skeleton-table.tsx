import { Skeleton } from '@heroui/react'
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@heroui/table'

interface SkeletonTableProps {
  columns: number
  tableColumns: { key: string; title: string }[]
  hasActions?: boolean
}

export const SkeletonTable = ({
  columns: c,
  tableColumns,
  hasActions,
}: SkeletonTableProps) => {
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
                if (columnKey === 'actions' && hasActions) {
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
