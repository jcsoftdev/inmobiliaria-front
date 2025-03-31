import { Suspense, lazy } from 'react'
import { Route, Routes, Navigate, Outlet } from 'react-router'

import { Footer, Header, Layout, Sidebar } from '@components/layout'
import { authStorageKeys, UserStore } from '@components/modules/login/utils'

import { validations, ValidationsKeys } from '@utils/validations'

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

const CompaniesModule = lazy(() =>
  import('@components/modules/companies').then((m) => ({
    default: m.CompaniesModule,
  })),
)

const CompaniesForm = lazy(() =>
  import('@components/modules/companies').then((m) => ({
    default: m.CompaniesForm,
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

  if (!token && !currentPath.includes(routes.login.path)) {
    console.log('redirecting to login')
    return <Navigate to={routes.login.path} relative="path" />
  }

  return <Outlet />
}

const RouteGuard = ({
  children,
  allowedRoles,
  validation,
}: {
  children: React.ReactNode
  allowedRoles: string[]
  validation?: ValidationsKeys
}) => {
  const [token] = useLocalStorage(authStorageKeys.accessToken, '')
  const [user] = useLocalStorage<UserStore>(authStorageKeys.user, {
    email: '',
    name: '',
    exp: 0,
    roles: [],
    iat: 0,
    sub: '',
    username: '',
  })

  if (!token) {
    console.log('Access denied. Redirecting to login.')
    return <Navigate to={routes.login.path} replace />
  }

  if (!allowedRoles.includes(user.roles[0])) {
    console.log('Access denied. Insufficient permissions.')
    return <Navigate to={routes.dashboard.path} replace />
  }

  if (validation && !validations[validation]()) {
    console.log('Access denied. Validation failed.')
    return <Navigate to={routes.dashboard.path} replace />
  }

  return children
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
          path={routes.login.path}
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
            <Route
              index
              element={
                //  is missing the RouteGuard
                <Dashboard />
              }
            />

            <Route
              path={routes.properties.home.path}
              element={
                <RouteGuard
                  allowedRoles={routes.properties.home.roles}
                  validation={routes.properties.home.validation}
                >
                  <PropertiesModule />
                </RouteGuard>
              }
            >
              <Route path="register" element={<PropertyForm />} />
              <Route path="edit/:id" element={<PropertyForm />} />
            </Route>

            <Route
              path={routes.agencies.home.path}
              element={
                <RouteGuard
                  allowedRoles={routes.agencies.home.roles}
                  validation={routes.agencies.home.validation}
                >
                  <AgenciesModule />
                </RouteGuard>
              }
            >
              <Route path="register" element={<AgencyForm />} />
              <Route path="edit/:id" element={<AgencyForm />} />
            </Route>

            <Route
              path={routes.clients.home.path}
              element={
                <RouteGuard
                  allowedRoles={routes.clients.home.roles}
                  validation={routes.clients.home.validation}
                >
                  <ClientsModule />
                </RouteGuard>
              }
            >
              <Route path="register" element={<ClientsForm />} />
              <Route path="edit/:id" element={<ClientsForm />} />
            </Route>

            <Route
              path={routes.users.home.path}
              element={
                <RouteGuard
                  allowedRoles={routes.users.home.roles}
                  validation={routes.users.home.validation}
                >
                  <UsersModule />
                </RouteGuard>
              }
            >
              <Route path="register" element={<UsersForm />} />
              <Route path="edit/:id" element={<UsersForm />} />
            </Route>

            <Route
              path={routes.companies.home.path}
              element={
                <RouteGuard
                  allowedRoles={routes.companies.home.roles}
                  validation={routes.companies.home.validation}
                >
                  <CompaniesModule />
                </RouteGuard>
              }
            >
              <Route path="register" element={<CompaniesForm />} />
              <Route path="edit/:id" element={<CompaniesForm />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  )
}
