import { useNavigate } from 'react-router'

export const useBackNavigate = () => {
  const navigate = useNavigate()

  const handleBackNavigate = (fallbackPath: string) => {
    navigate(fallbackPath, { replace: true })
  }

  return handleBackNavigate
}
