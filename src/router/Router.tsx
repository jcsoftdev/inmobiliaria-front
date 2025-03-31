import { Suspense, lazy, useEffect, useState } from 'react'
import { Route, Routes, Navigate, Outlet } from 'react-router'

import { Footer, Header, Layout, Sidebar } from '@components/layout'
import {
  authStorageKeys,
  removeLocalStorage,
  UserStore,
} from '@components/modules/login/utils'

import { validations, ValidationsKeys } from '@utils/validations'

import { routes } from '@router/routes'

import { useIndexedDBStorage } from '@hooks/use-indexeddb-storage'
import { useLocalStorage } from '@hooks/use-local-storage'

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
  const { value: user, error } = useIndexedDBStorage<UserStore>(
    authStorageKeys.user,
  )

  const [isAsyncValid, setIsAsyncValid] = useState<boolean | null>(null)

  useEffect(() => {
    let isMounted = true

    if (validation) {
      const validationFn = validations[validation]
      const isValid = validationFn()

      if (isValid instanceof Promise) {
        setIsAsyncValid(null)
        isValid
          .then((result) => {
            if (isMounted) setIsAsyncValid(!!result)
          })
          .catch(() => {
            if (isMounted) setIsAsyncValid(false)
          })
      } else {
        setIsAsyncValid(isValid)
      }
    } else {
      setIsAsyncValid(true)
    }

    return () => {
      isMounted = false
    }
  }, [validation])

  if (error) {
    removeLocalStorage(authStorageKeys.accessToken)
    return (
      <Navigate
        to={routes.login.path}
        replace
        state={{ error: 'Error retrieving user data' }}
      />
    )
  }

  if (user === null) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-sky-700"></div>
      </div>
    )
  }

  if (!token) {
    console.log('Access denied. Redirecting to login.')
    return <Navigate to={routes.login.path} replace />
  }

  if (!allowedRoles.includes(user.roles[0])) {
    console.log('Access denied. Insufficient permissions.')
    return <Navigate to={routes.dashboard.path} replace />
  }

  if (isAsyncValid === null) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-sky-700"></div>
      </div>
    )
  }

  if (!isAsyncValid) {
    console.log('Access denied. Validation failed.')
    return <Navigate to={routes.dashboard.path} replace />
  }

  return children
}

export const Router = () => {
  return (
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
            element={<Navigate to={routes.dashboard.path} relative="path" />}
          />

          <Route
            path={routes.dashboard.path}
            element={
              <RouteGuard
                allowedRoles={routes.dashboard.roles}
                validation={undefined}
              >
                <Dashboard />
              </RouteGuard>
            }
          />

          {/* Properties routes */}
          <Route path={routes.properties.home.path}>
            <Route
              index
              element={
                <RouteGuard
                  allowedRoles={routes.properties.home.roles}
                  validation={routes.properties.home.validation}
                >
                  <PropertiesModule />
                </RouteGuard>
              }
            />
            <Route
              path="register"
              element={
                <RouteGuard allowedRoles={routes.properties.register.roles}>
                  <PropertyForm />
                </RouteGuard>
              }
            />
            <Route
              path="edit/:id"
              element={
                <RouteGuard allowedRoles={routes.properties.edit.roles}>
                  <PropertyForm />
                </RouteGuard>
              }
            />
          </Route>

          {/* Agencies routes */}
          <Route path={routes.agencies.home.path}>
            <Route
              index
              element={
                <RouteGuard
                  allowedRoles={routes.agencies.home.roles}
                  validation={routes.agencies.home.validation}
                >
                  <AgenciesModule />
                </RouteGuard>
              }
            />
            <Route
              path="register"
              element={
                <RouteGuard allowedRoles={routes.agencies.register.roles}>
                  <AgencyForm />
                </RouteGuard>
              }
            />
            <Route
              path="edit/:id"
              element={
                <RouteGuard allowedRoles={routes.agencies.edit.roles}>
                  <AgencyForm />
                </RouteGuard>
              }
            />
          </Route>

          {/* Clients routes */}
          <Route path={routes.clients.home.path}>
            <Route
              index
              element={
                <RouteGuard
                  allowedRoles={routes.clients.home.roles}
                  validation={routes.clients.home.validation}
                >
                  <ClientsModule />
                </RouteGuard>
              }
            />
            <Route
              path="register"
              element={
                <RouteGuard allowedRoles={routes.clients.register.roles}>
                  <ClientsForm />
                </RouteGuard>
              }
            />
            <Route
              path="edit/:id"
              element={
                <RouteGuard allowedRoles={routes.clients.edit.roles}>
                  <ClientsForm />
                </RouteGuard>
              }
            />
          </Route>

          {/* Users routes */}
          <Route path={routes.users.home.path}>
            <Route
              index
              element={
                <RouteGuard
                  allowedRoles={routes.users.home.roles}
                  validation={routes.users.home.validation}
                >
                  <UsersModule />
                </RouteGuard>
              }
            />
            <Route
              path="register"
              element={
                <RouteGuard allowedRoles={routes.users.register.roles}>
                  <UsersForm />
                </RouteGuard>
              }
            />
            <Route
              path="edit/:id"
              element={
                <RouteGuard allowedRoles={routes.users.edit.roles}>
                  <UsersForm />
                </RouteGuard>
              }
            />
          </Route>

          {/* Companies routes */}
          <Route path={routes.companies.home.path}>
            <Route
              index
              element={
                <RouteGuard
                  allowedRoles={routes.companies.home.roles}
                  validation={routes.companies.home.validation}
                >
                  <CompaniesModule />
                </RouteGuard>
              }
            />
            <Route
              path="register"
              element={
                <RouteGuard allowedRoles={routes.companies.register.roles}>
                  <CompaniesForm />
                </RouteGuard>
              }
            />
            <Route
              path="edit/:id"
              element={
                <RouteGuard allowedRoles={routes.companies.edit.roles}>
                  <CompaniesForm />
                </RouteGuard>
              }
            />
          </Route>

          {/* Fallback route */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
