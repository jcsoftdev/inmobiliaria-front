import { useQuery } from '@tanstack/react-query'

import { PropertiesResponse } from '@contracts/properties.response'

import { getProperties } from '@services/properties'

interface UseGetPropertiesParams {
  currentPage: number
  enabled?: boolean
}

export const useGetProperties = ({
  currentPage,
  enabled = false,
}: UseGetPropertiesParams) => {
  const perPage = 8

  const { data, error, isLoading, refetch, isFetching, isRefetching } =
    useQuery<PropertiesResponse>({
      queryKey: ['properties', currentPage],
      queryFn: () => getProperties({ perPage, page: currentPage }),
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
