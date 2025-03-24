import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'

import { CompaniesResponse } from '@contracts/companies.response'

import { getCompanies } from '@services/companies'

import { useCompaniesStore } from '@store/companies.store'

interface UseGetCompaniesParams {
  currentPage: number
  enabled?: boolean
}

export const useGetCompanies = ({
  currentPage,
  enabled = false,
}: UseGetCompaniesParams) => {
  const setCompanies = useCompaniesStore((state) => state.setCompanies)
  const perPage = 8

  const { data, error, isLoading, refetch, isFetching, isRefetching } =
    useQuery<CompaniesResponse>({
      queryKey: ['companies', currentPage],
      queryFn: () => getCompanies({ perPage, page: currentPage }),
      enabled,
    })
  useEffect(() => {
    if (data) setCompanies(data)
  }, [data, setCompanies])

  return {
    companies: data,
    error,
    isLoading,
    refetch,
    isFetching: isFetching || isRefetching,
  }
}
