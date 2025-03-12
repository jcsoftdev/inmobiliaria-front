import { useLocalStorage } from '@hooks/use-localStorage'
import { NotFound } from '@router/NotFound'
import { routes } from '@router/routes'
import { useEffect } from 'react'
import { Route, Routes, useLocation, useNavigate } from 'react-router'

import { Footer, Header, Layout, Sidebar } from '@components/layout'
import { AgenciesModule } from '@components/modules/agencies'
import AgencyForm from '@components/modules/agencies/agencies-form'
import { ClientsModule } from '@components/modules/clients'
import ClientsEdit from '@components/modules/clients/clients-edit'
import ClientsRegister from '@components/modules/clients/clients-register'
import { Dashboard } from '@components/modules/dashboard'
import { LoginModule } from '@components/modules/login'
import { authStorageKeys } from '@components/modules/login/utils'
import { PropertiesModule } from '@components/modules/properties'
import PropertyForm from '@components/modules/properties/property-form'

export const Router = () => {
  const location = useLocation()
  const background = location.state?.background
  const [token] = useLocalStorage(authStorageKeys.accessToken, '')

  const hasAuth = !!token
  const navigate = useNavigate()

  useEffect(() => {
    if (!hasAuth && location.pathname !== routes.login) {
      navigate(routes.login, { replace: true })
    }
  }, [hasAuth, location.pathname, navigate])

  return (
    <>
      <Routes location={background || location}>
        <Route path={routes.login} element={<LoginModule />} />

        {hasAuth && (
          <Route
            element={
              <Layout footer={Footer} header={Header} sidebar={Sidebar} />
            }
          >
            <Route index element={<Dashboard />} />
            <Route
              path={routes.properties.home}
              element={<PropertiesModule />}
            />
            <Route path={routes.agencies.home} element={<AgenciesModule />} />
            <Route path={routes.clients.home} element={<ClientsModule />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        )}

        {!hasAuth && <Route path="*" element={<></>} />}
      </Routes>

      {hasAuth && background && (
        <Routes>
          <Route path={routes.properties.register} element={<PropertyForm />} />
          <Route path={routes.clients.edit} element={<ClientsEdit />} />
          <Route path={routes.clients.register} element={<ClientsRegister />} />
          <Route path={routes.agencies.register} element={<AgencyForm />} />
        </Routes>
      )}
    </>
  )
}
