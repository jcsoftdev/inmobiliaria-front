import { useQuery } from '@tanstack/react-query'
import { useCallback, useEffect } from 'react'

import { AgenciesResponse } from '@contracts/agencies.response'

import { getAgencies } from '@services/agencies'

import { useAgenciesStore } from '@store/agencies.store'

interface UseGetPropertiesParams {
  currentPage: number
  q?: string
}

export const useGetAgencies = ({ currentPage, q }: UseGetPropertiesParams) => {
  const SetAgencies = useAgenciesStore((state) => state.setAgencies)
  const perPage = 8

  const queryKey = ['agencies', currentPage, q]

  const queryFn = useCallback(
    () => getAgencies({ perPage, page: currentPage, q }),
    [currentPage, q, perPage],
  )

  const { data, error, isLoading, refetch, isFetching, isRefetching } =
    useQuery<AgenciesResponse>({
      queryKey,
      queryFn,
      enabled: true,
      refetchOnWindowFocus: false,
      refetchOnMount: true,
      retry: 1,
    })

  useEffect(() => {
    if (data) {
      SetAgencies({
        data: data.data,
        meta: data.meta,
        currentPage,
        isLoading,
        isError: false,
      })
    }
  }, [data, SetAgencies, currentPage, isLoading])

  return {
    agencies: data,
    error,
    isLoading,
    refetch,
    isFetching: isFetching || isRefetching,
  }
}
