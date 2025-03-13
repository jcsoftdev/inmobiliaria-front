import { useNavigate } from 'react-router'

export const useBackNavigate = () => {
  const navigate = useNavigate()

  const handleBackNavigate = (fallbackPath: string) => {
    if (window.history.length > 2) {
      navigate(-1)
    } else {
      navigate(fallbackPath, { replace: true })
    }
  }

  return handleBackNavigate
}
