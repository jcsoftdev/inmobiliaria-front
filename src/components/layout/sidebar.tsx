import { Accordion, AccordionItem } from '@heroui/react'
import { NavLink } from 'react-router'
import { twMerge } from 'tailwind-merge'

import { UserStore } from '@components/modules/login/utils'

import { validations } from '@utils/validations'

import { routes } from '@router/routes'

import { useLocalStorage } from '@hooks/use-localStorage'

import img from '../../assets/logo.png'

interface SidebarProps {
  className?: string
  style?: React.CSSProperties
}

const Sidebar = ({ className, ...props }: SidebarProps) => {
  const [userRole] = useLocalStorage<UserStore>('user', {
    email: '',
    name: '',
    exp: 0,
    roles: [],
    iat: 0,
    sub: '',
    username: '',
  })

  const visibleRoutes = [
    { label: 'Dashboard', route: routes.dashboard },
    { label: 'Usuarios', route: routes.users.home },
    { label: 'Agencias', route: routes.agencies.home },
    { label: 'Propiedades', route: routes.properties.home },
    { label: 'Clientes', route: routes.clients.home },
  ].filter(({ route }) => {
    const hasRole = route.roles.includes(userRole.roles[0])
    const isValid = route.validation ? validations[route.validation]() : true
    return hasRole && isValid
  })

  const visibleAccordionRoutes = [
    {
      label: 'Empresas',
      route: routes.companies.home,
      subRoutes: [
        { label: 'Listado', path: routes.companies.home.path },
        { label: 'Registrar', path: routes.companies.register.path },
      ],
    },
  ].filter(({ route }) => {
    const hasRole = route.roles.includes(userRole.roles[0])
    const isValid = route.validation ? validations[route.validation]() : true
    return hasRole && isValid
  })

  return (
    <nav
      className={twMerge(className, 'p-4 px-6 flex flex-col gap-16')}
      style={props.style}
    >
      <img src={img} alt="logo" />
      <ul className="flex flex-col gap-4">
        {visibleRoutes.map(({ label, route }) => (
          <li key={route.path}>
            <NavLink className={'p-4'} to={route.path}>
              {label}
            </NavLink>
          </li>
        ))}
        {visibleAccordionRoutes.map(({ label, subRoutes }) => (
          <li key={label}>
            <Accordion isCompact>
              <AccordionItem
                aria-label={label}
                title={label}
                className="text-white py-0"
                classNames={{
                  heading: 'text-white',
                  trigger: 'text-white p-0',
                  title: 'text-white p-2 py-0',
                  content: 'py-4 pb-0 flex flex-col gap-4 ',
                }}
              >
                {subRoutes.map((subRoute) => (
                  <NavLink
                    key={subRoute.path}
                    className={'px-4 block'}
                    to={subRoute.path}
                  >
                    {subRoute.label}
                  </NavLink>
                ))}
              </AccordionItem>
            </Accordion>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Sidebar
