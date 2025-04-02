import { useSearchParams } from 'react-router'

export const usePaginator = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'

  const setCurrentPage = (page: number) => {
    const newParams = new URLSearchParams(searchParams)
    newParams.set('page', page.toString())
    setSearchParams(newParams)
  }

  return {
    page: +page,
    setCurrentPage,
  }
}
