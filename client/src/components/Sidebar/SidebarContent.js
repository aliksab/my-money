import React from 'react'
// import routes from '../../routes/sidebar'
import { NavLink, Route, Routes } from 'react-router-dom'
import * as Icons from '../../icons'
import SidebarSubmenu from './SidebarSubmenu'
import { Button } from '@windmill/react-ui'

function Icon({ icon, ...props }) {
  const Icon = Icons[icon]
  return <Icon {...props} />
}

const routes = [
  {
    path: '/home', // the url
    icon: 'HomeIcon', // the component being exported from icons/index.js
    name: 'Главная', // name that appear in Sidebar
  },
  {
    path: '/home/logbook',
    icon: 'FormsIcon',
    name: 'Журнал',
  },
  {
    path: '/home/trading',
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
    <div className="flex py-1 text-gray-500 dark:text-gray-400">
      <a className="py-3 text-lg font-bold text-gray-800 dark:text-gray-200" href="#">
        Мой бюджет  
      </a>
      <ul className="flex mx-6">
        {routes.map((route) =>
          route.routes ? (
            <SidebarSubmenu route={route} key={route.name} />
          ) : (
            <li className="relative px-6 py-3" key={route.name}>
              <NavLink
                exact={`${route.exact}`}
                to={route.path}
                className={({isActive}) => (isActive ? baseStyle + activeStyle : baseStyle)}
              >
                <Routes>
                  <Route path={route.path} exact={`${route.exact}`}>
                    {/* <span
                      className="absolute inset-y-0 left-0 w-1 bg-purple-600 rounded-tr-lg rounded-br-lg"
                      aria-hidden="true"
                    ></span>   */}
                  </Route>
                </Routes>
                
                <Icon className="w-5 h-5" aria-hidden="true" icon={route.icon} />
                <span className="ml-4">{route.name}</span>
              </NavLink>
            </li>
          )
        )}
      </ul>
    </div>
  )
}

export default SidebarContent
