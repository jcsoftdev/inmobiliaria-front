export const routes = {
  dashboard: '/',
  properties: {
    home: '/properties',
    register: '/properties/register',
  },
  agencies: {
    home: '/agencies',
    register: '/agencies/register',
  },
  login: 'login',
  clients: {
    home: '/clients',
    register: '/clients/register',
    edit: '/clients/edit/:id',
  },
  users: {
    home: '/users',
    register: '/users/register',
    edit: '/users/edit/:id',
  },
} as const

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
