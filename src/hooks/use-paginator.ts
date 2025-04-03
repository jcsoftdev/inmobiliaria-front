import { useCallback } from 'react'
import { useSearchParams } from 'react-router'

export const usePaginator = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'

  const setCurrentPage = useCallback(
    (page: number) => {
      const newParams = new URLSearchParams(searchParams)
      newParams.set('page', page.toString())
      setSearchParams(newParams)
    },
    [searchParams, setSearchParams],
  )

  return {
    page: +page,
    setCurrentPage,
  }
}
