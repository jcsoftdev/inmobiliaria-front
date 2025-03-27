import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'

import { AgenciesResponse } from '@contracts/agencies.response'

import { getAgencies } from '@services/agencies'

import { useAgenciesStore } from '@store/agencies.store'

interface UseGetPropertiesParams {
  currentPage: number
  enabled?: boolean
}

export const useGetAgencies = ({
  currentPage,
  enabled = false,
}: UseGetPropertiesParams) => {
  const SetAgencies = useAgenciesStore((state) => state.setAgencies)
  const perPage = 8

  const { data, error, isLoading, refetch, isFetching, isRefetching } =
    useQuery<AgenciesResponse>({
      queryKey: ['agencies', currentPage],
      queryFn: () => getAgencies({ perPage, page: currentPage }),
      enabled,
    })
  useEffect(() => {
    if (data) SetAgencies(data)
  }, [data, SetAgencies])

  return {
    agencies: data,
    error,
    isLoading,
    refetch,
    isFetching: isFetching || isRefetching,
  }
}
