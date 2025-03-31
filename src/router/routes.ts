import { ValidationsKeys } from '@utils/validations'

type Route = {
  path: string
  roles: string[]
  validation?: ValidationsKeys
}

type NestedRoutes = {
  [key: string]: Route
}

export const routes: {
  dashboard: Route
  properties: NestedRoutes
  agencies: NestedRoutes
  login: Route
  clients: NestedRoutes
  users: NestedRoutes
  companies: NestedRoutes
} = {
  dashboard: {
    path: '/',
    roles: ['admin', 'user'],
    validation: 'hasCompanies',
  },
  properties: {
    home: { path: '/properties', roles: ['admin', 'seller'] },
    register: { path: '/properties/register', roles: ['admin', 'seller'] },
    edit: { path: '/properties/edit/:id', roles: ['admin', 'seller'] },
  },
  agencies: {
    home: { path: '/agencies', roles: ['admin'] },
    register: { path: '/agencies/register', roles: ['admin'] },
    edit: { path: '/agencies/edit/:id', roles: ['admin'] },
  },
  login: { path: '/login', roles: [] },
  clients: {
    home: { path: '/clients', roles: ['admin', 'seller'] },
    register: { path: '/clients/register', roles: ['admin', 'seller'] },
    edit: { path: '/clients/edit/:id', roles: ['admin', 'seller'] },
  },
  users: {
    home: { path: '/users', roles: ['admin'] },
    register: { path: '/users/register', roles: ['admin'] },
    edit: { path: '/users/edit/:id', roles: ['admin'] },
  },
  companies: {
    home: { path: '/companies', roles: ['admin'] },
    register: { path: '/companies/register', roles: ['admin'] },
    edit: { path: '/companies/edit/:id', roles: ['admin'] },
  },
}

export const getDynamicRoute = (
  route: string,
  params: Record<string, string | number>,
) => {
  let newRoute = route
  Object.entries(params).forEach(([key, value]) => {
    newRoute = newRoute.replace(`:${key}`, value.toString())
  })
  return newRoute
}
