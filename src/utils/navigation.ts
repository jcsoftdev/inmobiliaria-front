import { Location, NavigateOptions, useSearchParams } from 'react-router'

interface NavigateWithParamsOptions {
  preserveParams?: boolean
  background?: Location
}

export const useNavigationPath = () => {
  const [searchParams] = useSearchParams()

  const getPath = (
    path: string,
    params: Record<string, string> = {},
    options: NavigateWithParamsOptions = {},
  ) => {
    const currentParams = Object.fromEntries(searchParams.entries())

    const finalParams = options.preserveParams
      ? { ...currentParams, ...params }
      : params

    const queryString = new URLSearchParams(finalParams).toString()
    const finalPath = queryString ? `${path}?${queryString}` : path

    if (options.background) {
      return {
        to: finalPath,
        state: { background: options.background } as NavigateOptions,
      }
    }

    return { to: finalPath }
  }

  const preserveParams = (targetPath: string) => {
    const queryString = searchParams.toString()
    return queryString ? `${targetPath}?${queryString}` : targetPath
  }

  return {
    getPath,
    preserveParams,
  }
}
