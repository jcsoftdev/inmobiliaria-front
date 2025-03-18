import { Suspense, lazy } from 'react'
import { Route, Routes, Navigate, Outlet } from 'react-router'

import { Footer, Header, Layout, Sidebar } from '@components/layout'
import { authStorageKeys } from '@components/modules/login/utils'

import { routes } from '@router/routes'

import { useLocalStorage } from '@hooks/use-localStorage'

const AgenciesModule = lazy(() =>
  import('@components/modules/agencies').then((m) => ({
    default: m.AgenciesModule,
  })),
)

const AgencyForm = lazy(() =>
  import('@components/modules/agencies').then((m) => ({
    default: m.AgencyForm,
  })),
)

const ClientsModule = lazy(() =>
  import('@components/modules/clients').then((m) => ({
    default: m.ClientsModule,
  })),
)

const ClientsForm = lazy(() =>
  import('@components/modules/clients').then((m) => ({
    default: m.ClientsForm,
  })),
)

const UsersModule = lazy(() =>
  import('@components/modules/users').then((m) => ({
    default: m.UserModule,
  })),
)

const UsersForm = lazy(() =>
  import('@components/modules/users').then((m) => ({
    default: m.UsersForm,
  })),
)

const Dashboard = lazy(() =>
  import('@components/modules/dashboard').then((m) => ({
    default: m.Dashboard,
  })),
)

const PropertiesModule = lazy(() =>
  import('@components/modules/properties').then((m) => ({
    default: m.PropertiesModule,
  })),
)

const PropertyForm = lazy(() =>
  import('@components/modules/properties').then((m) => ({
    default: m.PropertyForm,
  })),
)
const LoginModule = lazy(() =>
  import('@components/modules/login').then((m) => ({ default: m.LoginModule })),
)

const NotFound = lazy(() =>
  import('@router/NotFound').then((m) => ({ default: m.NotFound })),
)

const AuthWrapper = () => {
  const [token] = useLocalStorage(authStorageKeys.accessToken, '')
  const currentPath = window.location.pathname

  if (!token && !currentPath.includes(routes.login)) {
    console.log('redirecting to login')
    return <Navigate to={routes.login} relative="path" />
  }

  return <Outlet />
}

export const Router = () => {
  return (
    <Suspense
      fallback={
        <Layout footer={Footer} header={Header} sidebar={Sidebar}>
          <div className="flex items-center justify-center h-screen">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-sky-700"></div>
          </div>
        </Layout>
      }
    >
      <Routes>
        <Route
          path={routes.login}
          element={
            <Suspense
              fallback={
                <div className="w-full h-screen grid place-content-center">
                  Cargando login...
                </div>
              }
            >
              <LoginModule />
            </Suspense>
          }
        />

        <Route
          element={<Layout footer={Footer} header={Header} sidebar={Sidebar} />}
        >
          <Route element={<AuthWrapper />}>
            <Route index element={<Dashboard />} />

            <Route path={routes.properties.home} element={<PropertiesModule />}>
              <Route path="register" element={<PropertyForm />} />
            </Route>

            <Route path={routes.agencies.home} element={<AgenciesModule />}>
              <Route path="register" element={<AgencyForm />} />
            </Route>

            <Route path={routes.clients.home} element={<ClientsModule />}>
              <Route path="register" element={<ClientsForm />} />
              <Route path="edit/:id" element={<ClientsForm />} />
            </Route>

            <Route path={routes.users.home} element={<UsersModule />}>
              <Route path="register" element={<UsersForm />} />
              <Route path="edit/:id" element={<UsersForm />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  )
}
