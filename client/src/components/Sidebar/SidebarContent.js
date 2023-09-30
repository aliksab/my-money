import React from 'react'
import { NavLink } from 'react-router-dom'
import * as Icons from '../../icons'
import SidebarSubmenu from './SidebarSubmenu'
import { useSelector } from 'react-redux'


function Icon({ icon, ...props }) {
  const Icon = Icons[icon]
  return <Icon {...props} />
}

const routes = [
  {
    path: '/api/',
    icon: 'HomeIcon',
    name: 'Главная',
  },
  {
    path: '/api/logbook',
    icon: 'FormsIcon',
    name: 'Журнал',
  },
  {
    path: '/api/trading',
    icon: 'ChartsIcon',
    name: 'Инвестиции',
  },
  {
    path: '/app/modals',
    icon: 'ModalsIcon',
    name: 'Календарь',
  }
]

function SidebarContent() {
  const baseStyle = "inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
  const activeStyle = " text-gray-800 dark:text-gray-100"
  return (
    <div className="flex items-center justify-between">
      <ul className="flex justify-between w-full font-medium p-4 md:p-0 md:mx-4 mt-2">
        {routes.map((route) =>
          route.routes ? (
            <SidebarSubmenu route={route} key={route.name} />
          ) : (
            <li className=" block py-2 pl-3 pr-4" key={route.name}>
              <NavLink
                to={route.path}
                className={({isActive}) => (isActive ? baseStyle + activeStyle : baseStyle)}
              >              
                <Icon className="w-5 h-5" aria-hidden="true" icon={route.icon} />
                <span className="ml-4 hidden md:block">{route.name}</span>
              </NavLink>
            </li>
          )
        )}
        
      </ul>
    </div>
    
  )
}

export default SidebarContent
