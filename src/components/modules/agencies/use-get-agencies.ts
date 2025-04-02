import { useQuery } from '@tanstack/react-query'
import { useEffect, useCallback, useRef } from 'react'

import { AgenciesResponse } from '@contracts/agencies.response'

import { getAgencies } from '@services/agencies'

import { useAgenciesStore } from '@store/agencies.store'

interface UseGetPropertiesParams {
  currentPage: number
  q?: string
  enabled?: boolean
}

export const useGetAgencies = ({
  currentPage,
  q,
  enabled = false,
}: UseGetPropertiesParams) => {
  const SetAgencies = useAgenciesStore((state) => state.setAgencies)
  const perPage = 8
  const isInitialMount = useRef(true)
  const previousData = useRef<AgenciesResponse | null>(null)
  const updateTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined)

  const queryKey = ['agencies', currentPage, q]

  const queryFn = useCallback(
    () => getAgencies({ perPage, page: currentPage, q }),
    [currentPage, q, perPage],
  )

  const { data, error, isLoading, refetch, isFetching, isRefetching } =
    useQuery<AgenciesResponse>({
      queryKey,
      queryFn,
      enabled,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      retry: false,
      refetchOnReconnect: false,
      networkMode: 'offlineFirst',
    })

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false
      return
    }

    if (updateTimeoutRef.current) {
      clearTimeout(updateTimeoutRef.current)
    }

    if (data && !isFetching && data !== previousData.current) {
      updateTimeoutRef.current = setTimeout(() => {
        previousData.current = data
        SetAgencies({
          data: data.data,
          meta: data.meta,
          currentPage,
        })
      }, 0)
    }

    return () => {
      if (updateTimeoutRef.current) {
        clearTimeout(updateTimeoutRef.current)
      }
    }
  }, [data, SetAgencies, currentPage, isFetching])

  return {
    agencies: data,
    error,
    isLoading,
    refetch,
    isFetching: isFetching || isRefetching,
  }
}
