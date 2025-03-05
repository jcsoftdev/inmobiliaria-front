import { useEffect } from 'react'
import { useNavigate } from 'react-router'

export const NotFound = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigate('/')
    }, 0)

    return () => clearTimeout(timeout)
  }, [navigate])

  return (
    <div>
      <h1>404</h1>
      <p>Not Found</p>
      <p>Redirecting to home...</p>
      <br />
      <button onClick={() => navigate('/')}>Go Home</button>
    </div>
  )
}
