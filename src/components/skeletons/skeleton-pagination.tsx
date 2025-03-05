import { Pagination, Skeleton } from '@heroui/react'

export const SkeletonPagination = ({ total }: { total: number }) => {
  return (
    <div className="py-4">
      <Pagination
        color="primary"
        page={6}
        total={total}
        onChange={() => {}}
        renderItem={() => (
          <Skeleton className="rounded-lg w-9">
            <div className="h-9 rounded-lg bg-default-300 w-full" />
          </Skeleton>
        )}
      />
    </div>
  )
}
