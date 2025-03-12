import { useClientsStore } from '@store/clients.store'
import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'

import { ClientsResponse } from '@contracts/clients.response'

import { getClients } from '@services/clients'

interface UseGetPropertiesParams {
  currentPage: number
  enabled?: boolean
}

export const useGetClients = ({
  currentPage,
  enabled = false,
}: UseGetPropertiesParams) => {
  const setClients = useClientsStore((state) => state.setClients)
  const perPage = 8

  const { data, error, isLoading, refetch, isFetching, isRefetching } =
    useQuery<ClientsResponse>({
      queryKey: ['clients', currentPage],
      queryFn: () => getClients({ perPage, page: currentPage }),
      enabled,
    })

  useEffect(() => {
    if (data) setClients(data)
  }, [data, setClients])

  return {
    clients: data,
    error,
    isLoading,
    refetch,
    isFetching: isFetching || isRefetching,
  }
}
