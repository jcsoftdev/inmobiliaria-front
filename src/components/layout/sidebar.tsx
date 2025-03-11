import { routes } from '@router/routes'
import { NavLink } from 'react-router'
import { twMerge } from 'tailwind-merge'

import img from '../../assets/logo.png'

interface SidebarProps {
  className?: string
  style?: React.CSSProperties
}

const Sidebar = ({ className, ...props }: SidebarProps) => {
  return (
    <nav
      className={twMerge(className, 'p-4 px-6 flex flex-col gap-16')}
      style={props.style}
    >
      <img src={img} alt="logo" />
      <ul className="flex flex-col gap-4">
        <li>
          <NavLink className={'p-4'} to={routes.dashboard}>
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink className={'p-4'} to="/empresa-registro">
            Registro de empres
          </NavLink>
        </li>
        <li>
          <NavLink className={'p-4'} to="/proyecto">
            Proyecto
          </NavLink>
        </li>
        <li>
          <NavLink className={'p-4'} to={routes.agencies.home}>
            Agencia
          </NavLink>
        </li>
        <li>
          <NavLink className={'p-4'} to={routes.properties.home}>
            Propiedades
          </NavLink>
        </li>
        <li>
          <NavLink className={'p-4'} to={routes.clients.home}>
            Clientes
          </NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default Sidebar
