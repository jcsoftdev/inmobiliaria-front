import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'

import { UsersResponse } from '@contracts/users.response'

import { getUsers } from '@services/users'

import { useUsersStore } from '@store/users.store'

interface UseGetUsersParams {
  currentPage: number
  enabled?: boolean
}

export const useGetUsers = ({
  currentPage,
  enabled = false,
}: UseGetUsersParams) => {
  const setUsers = useUsersStore((state) => state.setUsers)
  const perPage = 8

  const { data, error, isLoading, refetch, isFetching, isRefetching } =
    useQuery<UsersResponse>({
      queryKey: ['users', currentPage],
      queryFn: () => getUsers({ perPage, page: currentPage }),
      enabled,
    })

  useEffect(() => {
    if (data) setUsers(data)
  }, [data, setUsers])

  return {
    users: data,
    error,
    isLoading,
    refetch,
    isFetching: isFetching || isRefetching,
  }
}
