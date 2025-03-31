import { Accordion, AccordionItem } from '@heroui/react'
import { useEffect, useState } from 'react'
import { NavLink } from 'react-router'
import { twMerge } from 'tailwind-merge'

import { UserStore } from '@components/modules/login/utils'

import { validations } from '@utils/validations'

import { routes } from '@router/routes'

import { useIndexedDBStorage } from '@hooks/use-indexeddb-storage'

import img from '../../assets/logo.png'

interface SidebarProps {
  className?: string
  style?: React.CSSProperties
}

const ROUTES = [
  { label: 'Dashboard', route: routes.dashboard },
  { label: 'Usuarios', route: routes.users.home },
  { label: 'Agencias', route: routes.agencies.home },
  { label: 'Propiedades', route: routes.properties.home },
  { label: 'Clientes', route: routes.clients.home },
]

const ACCORDION_ROUTES = [
  {
    label: 'Empresas',
    route: routes.companies.home,
    subRoutes: [
      { label: 'Listado', path: routes.companies.home.path },
      { label: 'Registrar', path: routes.companies.register.path },
    ],
  },
]

const useFilteredRoutes = (userRole: UserStore | null) => {
  const [visibleRoutes, setVisibleRoutes] = useState<
    { label: string; route: (typeof routes)[keyof typeof routes] }[]
  >([])
  const [visibleAccordionRoutes, setVisibleAccordionRoutes] = useState<
    {
      label: string
      route: (typeof routes)[keyof typeof routes]
      subRoutes: { label: string; path: string }[]
    }[]
  >([])

  useEffect(() => {
    if (!userRole) return

    const filterRoutes = async () => {
      const filteredRoutes = await Promise.all(
        ROUTES.map(async ({ label, route }) => {
          const hasRole = route.roles.includes(userRole.roles[0])
          const isValid = route.validation
            ? await validations[route.validation]()
            : true
          return hasRole && isValid ? { label, route } : null
        }),
      )
      setVisibleRoutes(filteredRoutes.filter(Boolean) as typeof visibleRoutes)
    }

    const filterAccordionRoutes = async () => {
      const filteredAccordionRoutes = await Promise.all(
        ACCORDION_ROUTES.map(async ({ label, route, subRoutes }) => {
          const hasRole = route.roles.includes(userRole.roles[0])
          const isValid = route.validation
            ? await validations[route.validation]()
            : true
          return hasRole && isValid ? { label, route, subRoutes } : null
        }),
      )
      setVisibleAccordionRoutes(
        filteredAccordionRoutes.filter(
          Boolean,
        ) as typeof visibleAccordionRoutes,
      )
    }

    filterRoutes()
    filterAccordionRoutes()
  }, [userRole])

  return { visibleRoutes, visibleAccordionRoutes }
}

const Sidebar = ({ className, ...props }: SidebarProps) => {
  const { value: user } = useIndexedDBStorage<UserStore>('user')
  const { visibleRoutes, visibleAccordionRoutes } = useFilteredRoutes(user)

  return (
    <nav
      className={twMerge(className, 'p-4 px-6 flex flex-col gap-16')}
      style={props.style}
    >
      <img src={img} alt="logo" />
      <ul className="flex flex-col gap-4">
        {visibleRoutes.map(({ label, route }) => (
          <li key={typeof route.path === 'string' ? route.path : ''}>
            <NavLink
              className={'p-4'}
              to={typeof route.path === 'string' ? route.path : ''}
            >
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
