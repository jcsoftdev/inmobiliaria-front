import { NavLink } from "react-router"
import { twMerge } from "tailwind-merge"

import img from '../../assets/logo.png'

interface SidebarProps {
  className?: string
  style?: React.CSSProperties
}

const Sidebar = ({className, ...props}:SidebarProps ) => {
  return (
    <nav className={twMerge(className, "p-4 px-6 flex flex-col gap-16")} style={props.style} >

      <img src={img} alt="logo"/>
      <ul className="flex flex-col gap-4">
        <li><NavLink to="/">Dashboard</NavLink></li>
        <li><NavLink to="/empresa-registro">Registro de empres</NavLink></li>
        <li><NavLink to="/proyecto">Proyecto</NavLink></li>
        <li><NavLink to="/agencia">Agencia</NavLink></li>
        <li><NavLink to="/properties">Propiedades</NavLink></li>
      </ul>
    </nav>
  )
}

export default Sidebar
