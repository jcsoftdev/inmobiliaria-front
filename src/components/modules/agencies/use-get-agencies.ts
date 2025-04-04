import { RefetchOptions, useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'

import { AgenciesResponse } from '@contracts/agencies.response'

import { getAgencies } from '@services/agencies'

import { useAgenciesStore } from '@store/agencies.store'

interface UseGetAgenciesParams {
  currentPage: number
  enabled?: boolean
}

interface Options extends RefetchOptions {
  witLoader?: boolean
}

export const useGetAgencies = ({
  currentPage,
  enabled = false,
}: UseGetAgenciesParams) => {
  const setAgencies = useAgenciesStore((state) => state.setAgencies)
  const setIsLoading = useAgenciesStore((state) => state.setIsLoading)
  const isLoading = useAgenciesStore((state) => state.isLoading)
  const agencies = useAgenciesStore((state) => state.data)
  const search = useAgenciesStore((state) => state.search)
  const setLastSearch = useAgenciesStore((state) => state.setLastSearch)
  const meta = useAgenciesStore((state) => state.meta)
  const perPage = 8

  const {
    data,
    error,
    isLoading: loading,
    refetch,
    isFetching,
    isRefetching,
  } = useQuery<AgenciesResponse>({
    queryKey: ['agencies', currentPage, search],
    queryFn: () => getAgencies({ perPage, page: currentPage, q: search }),
    enabled,
  })

  useEffect(() => {
    if (data) {
      setAgencies({
        data: data.data,
        meta: data.meta,
        currentPage,
        isLoading,
        isError: false,
      })
      setLastSearch(search ?? '')
    }
  }, [data, search, setAgencies, setLastSearch, currentPage, isLoading])

  useEffect(() => {
    setIsLoading(loading)
  }, [loading, setIsLoading])

  const refetchAgencies = ({ witLoader, ...options }: Options = {}) => {
    if (witLoader && !agencies?.length) setIsLoading(true)
    refetch({
      ...options,
    }).then(() => {
      setLastSearch(search ?? '')
      if (witLoader) setIsLoading(false)
    })
  }

  return {
    agencies: data,
    meta,
    error,
    isLoading,
    refetch: refetchAgencies,
    isFetching: isFetching || isRefetching,
    setAgencies,
  }
}
