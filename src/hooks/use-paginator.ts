import { useSearchParams } from 'react-router'

export const usePaginator = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'

  const setCurrentPage = (page: number) => {
    setSearchParams({ page: page.toString() })
  }

  return {
    page: +page,
    setCurrentPage,
  }
}
