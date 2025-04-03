import { RefetchOptions, useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'

import { CompaniesResponse } from '@contracts/companies.response'

import { getCompanies } from '@services/companies'

import { useCompaniesStore } from '@store/companies.store'

interface UseGetCompaniesParams {
  currentPage: number
  enabled?: boolean
}

interface Options extends RefetchOptions {
  witLoader?: boolean
}

export const useGetCompanies = ({
  currentPage,
  enabled = false,
}: UseGetCompaniesParams) => {
  const setCompanies = useCompaniesStore((state) => state.setCompanies)
  const setIsLoading = useCompaniesStore((state) => state.setIsLoading)
  const isLoading = useCompaniesStore((state) => state.isLoading)
  const companies = useCompaniesStore((state) => state.data)
  const meta = useCompaniesStore((state) => state.meta)
  const perPage = 8

  const {
    data,
    error,
    isLoading: loading,
    refetch,
    isFetching,
    isRefetching,
  } = useQuery<CompaniesResponse>({
    queryKey: ['companies', currentPage],
    queryFn: () => getCompanies({ perPage, page: currentPage }),
    enabled,
  })
  useEffect(() => {
    if (data) setCompanies(data)
  }, [data, setCompanies])

  useEffect(() => {
    setIsLoading(loading)
  }, [loading, setIsLoading])

  const refetchCompanies = ({ witLoader, ...options }: Options = {}) => {
    if (witLoader && !companies?.length) setIsLoading(true)
    refetch({
      ...options,
    }).then(() => {
      if (witLoader) setIsLoading(false)
    })
  }

  return {
    companies,
    meta,
    error,
    isLoading,
    refetch: refetchCompanies,
    isFetching: isFetching || isRefetching,
  }
}
