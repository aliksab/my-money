import React, { useContext, useState } from 'react'
import { SidebarContext } from './context/SidebarContext'
import {
  SearchIcon,
  MoonIcon,
  SunIcon,
  BellIcon,
  MenuIcon,
  OutlinePersonIcon,
  OutlineCogIcon,
  OutlineLogoutIcon,
} from '../icons'
import { Avatar, Badge, Input, Dropdown, DropdownItem, WindmillContext } from '@windmill/react-ui'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import Sidebar from './Sidebar'
import { useDispatch, useSelector } from "react-redux";
import { getIsLoggedIn, logout } from "../store/users";

const Header = () => {
  const { mode, toggleMode } = useContext(WindmillContext)
  const dispath = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector(getIsLoggedIn())
  console.log(isLoggedIn);
  const { toggleSidebar } = useContext(SidebarContext)

  const [isNotificationsMenuOpen, setIsNotificationsMenuOpen] = useState(false)
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)

  function handleProfileClick() {
    setIsProfileMenuOpen(!isProfileMenuOpen)
    console.log(isProfileMenuOpen);
  }
  const handleLogout = () => {
    dispath(logout())
    navigate('/')
  }

  return (
    <header className="z-40 py-2 bg-white shadow-bottom dark:bg-gray-800">
      <div className="container flex items-center justify-between h-full px-6 mx-auto text-purple-600 dark:text-purple-300">
        <div className="flex py-1 w-full text-gray-500 dark:text-gray-400">
          <div className='flex items-center'>
            <NavLink className="self-center text-xl font-semibold whitespace-nowrap text-gray-800 dark:text-gray-200" to="/">
              Мой бюджет  
            </NavLink>
          </div>
          
          {isLoggedIn && <Sidebar/>}
        </div>
        
        
        <div className="flex w-full justify-end">
          <ul className="flex items-center flex-shrink-0 space-x-6">
            {/* <!-- Theme toggler --> */}
            <li className="flex">
              <button
              className="rounded-md focus:outline-none focus:shadow-outline-purple"
              onClick={toggleMode}
              aria-label="Toggle color mode"
              >
              {mode === 'dark' ? (
                  <SunIcon className="w-5 h-5" aria-hidden="true" />
              ) : (
                  <MoonIcon className="w-5 h-5" aria-hidden="true" />
              )}
              </button>
            </li>
        
            {/* <!-- Profile menu --> */}

            {isLoggedIn ? (
              <li className="relative">
                <button
                className="rounded-full focus:shadow-outline-purple focus:outline-none overflow-hidden w-1/3"
                onClick={handleProfileClick}
                aria-label="Account"
                aria-haspopup="true"
                >
                  <img
                      className="align-middle rounded-full overflow-hidden"
                      src="https://images.unsplash.com/photo-1502378735452-bc7d86632805?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&s=aa3a807e1bbdfd4364d1f449eaa96d82"
                      alt=""
                      aria-hidden="true"
                  />
                </button>
                <Dropdown
                  align="right"
                  isOpen={isProfileMenuOpen}
                  onClose={() => setIsProfileMenuOpen(false)}
                  >
                  <DropdownItem>
                      <OutlinePersonIcon className="w-4 h-4 mr-3" aria-hidden="true" />
                      <Link to={"/api/editProfile"}>Профиль</Link>
                  </DropdownItem>
                  {/* <DropdownItem>
                      <OutlineCogIcon className="w-4 h-4 mr-3" aria-hidden="true" />
                      <Link to={"/api/settingProfile"}>Настройки</Link>
                  </DropdownItem> */}
                  <DropdownItem>
                      <OutlineLogoutIcon className="w-4 h-4 mr-3" aria-hidden="true" />
                      <Link onClick={handleLogout}>Выход</Link>
                  </DropdownItem>
                </Dropdown>
              </li>
            ) : <Link className="nav-link" to="/auth/login">Вход</Link>}
          </ul>
        </div>
      </div>
    </header>
  )
}

export default Header