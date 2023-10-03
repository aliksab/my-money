import React, { useContext, useState } from 'react'
import { SidebarContext } from './context/SidebarContext'
import {
  MoonIcon,
  SunIcon,
  OutlinePersonIcon,
  OutlineLogoutIcon,
} from '../icons'
import { Dropdown, DropdownItem, WindmillContext } from '@windmill/react-ui'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import Sidebar from './Sidebar'
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUserData, getIsLoggedIn, logout } from "../store/users";

const Header = () => {
  const { mode, toggleMode } = useContext(WindmillContext)
  const dispath = useDispatch();
  const currentUser = useSelector(getCurrentUserData());
  const navigate = useNavigate();
  const isLoggedIn = useSelector(getIsLoggedIn())
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)

  function handleProfileClick() {
    setIsProfileMenuOpen(!isProfileMenuOpen)
  }
  const handleLogout = () => {
    dispath(logout())
    navigate('/')
  }

  return (
    <header className="py-2 bg-white shadow-bottom dark:bg-gray-800">
      <div className="container flex items-center justify-between h-full px-6 mx-auto text-purple-600 dark:text-purple-300">
        <div className="flex py-1 w-screen overflow-hidden text-gray-500 dark:text-gray-400 md:overflow-visible">
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

            {isLoggedIn && currentUser ? (
              <li className="relative">
                <button
                className="rounded-full focus:shadow-outline-purple focus:outline-none overflow-hidden w-1/3"
                onClick={handleProfileClick}
                aria-label="Account"
                aria-haspopup="true"
                >
                  <img
                      className="h-auto max-w-full rounded-full"
                      src={currentUser.image}
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
                    <Link className='flex' to={"/api/editProfile"}>
                      <OutlinePersonIcon className="w-4 h-4 mr-3" aria-hidden="true" />
                      Профиль
                    </Link>
                  </DropdownItem>
                  {/* <DropdownItem>
                      <OutlineCogIcon className="w-4 h-4 mr-3" aria-hidden="true" />
                      <Link to={"/api/settingProfile"}>Настройки</Link>
                  </DropdownItem> */}
                  <DropdownItem>
                    <button className='flex' onClick={handleLogout}>
                      <OutlineLogoutIcon className="w-4 h-4 mr-3" aria-hidden="true" />
                      Выход
                    </button>
                      
                      {/* <Link onClick={handleLogout}></Link> */}
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