import './App.css'

import { ToastProvider } from '@heroui/react'
import { HeroUIProvider } from '@heroui/system'
import { useLocalStorage } from '@hooks/useLocalStorage'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import {
  BrowserRouter,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from 'react-router'

import { Footer, Header, Layout, Sidebar } from '@components/layout'
import { AgenciesModule } from '@components/modules/agencies'
import AgencyForm from '@components/modules/agencies/agencies-form'
import { Dashboard } from '@components/modules/dashboard'
import { LoginModule } from '@components/modules/login'
import { authStorageKeys } from '@components/modules/login/utils'
import { PropertiesModule } from '@components/modules/properties'
import PropertyForm from '@components/modules/properties/property-form'

const NotFound = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigate('/')
    }, 3000)

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

const client = new QueryClient()

const Router = () => {
  const location = useLocation()
  const background = location.state?.background
  const [token] = useLocalStorage(authStorageKeys.accessToken, '')

  const hasAuth = !!token
  const navigate = useNavigate()

  useEffect(() => {
    if (!hasAuth && location.pathname !== '/login') {
      navigate('/login')
    }
  }, [hasAuth, location.pathname, navigate])

  return (
    <>
      {!hasAuth ? (
        <Routes location={background || location}>
          <Route path="login" element={<LoginModule />} />
          {/* ✅ Redirigir a NotFound si no está logueado y entra a cualquier otra ruta */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      ) : (
        <Layout footer={Footer} header={Header} sidebar={Sidebar}>
          <Routes location={background || location}>
            <Route path="/" element={<Dashboard />} />
            <Route path="properties" element={<PropertiesModule />} />
            <Route path="agencia" element={<AgenciesModule />} />
            {/* ✅ Ruta comodín para 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>

          {background && (
            <Routes>
              <Route path="agencia/register" element={<AgencyForm />} />
              <Route path="properties/register" element={<PropertyForm />} />
            </Routes>
          )}
        </Layout>
      )}
    </>
  )
}

function App() {
  return (
    <QueryClientProvider client={client}>
      <BrowserRouter>
        <HeroUIProvider>
          {createPortal(<ToastProvider placement="top-right" />, document.body)}
          <Router />
        </HeroUIProvider>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
