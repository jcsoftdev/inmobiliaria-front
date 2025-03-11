import { useQuery } from '@tanstack/react-query'

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
  const perPage = 8

  const { data, error, isLoading, refetch, isFetching, isRefetching } =
    useQuery<ClientsResponse>({
      queryKey: ['clients', currentPage],
      queryFn: () => getClients({ perPage, page: currentPage }),
      enabled,
    })

  return {
    properties: data,
    error,
    isLoading,
    refetch,
    isFetching: isFetching || isRefetching,
  }
}
