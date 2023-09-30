
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import React, { useContext, Suspense, useEffect, lazy } from 'react'
import { Switch, Route, Redirect, useLocation, Outlet } from 'react-router-dom'
import { SidebarContext } from '../components/context/SidebarContext'

const Container = () => {
  const { isSidebarOpen, closeSidebar } = useContext(SidebarContext)
  let location = useLocation()
  useEffect(() => {
    closeSidebar()
  }, [location])
  return (
    <>
      <div className="flex flex-col flex-1 w-full">
        <main className="h-full bg-gray-50 overflow-y-auto dark:bg-gray-900 false">
            <div className="container px-6 mx-auto h-screen mt-5"><Outlet/></div>
        </main>
      </div>
    </>
  )  
}

export default Container