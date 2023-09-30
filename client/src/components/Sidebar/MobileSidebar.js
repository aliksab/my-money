import React, { useContext } from 'react'

import SidebarContent from './SidebarContent'
import { Transition, Backdrop } from '@windmill/react-ui'

import { SidebarContext } from '../context/SidebarContext'

function MobileSidebar() {
  const { isSidebarOpen, closeSidebar } = useContext(SidebarContext)

  return (

    <aside className="fixed inset-x-0 bottom-0 overflow-y-auto bg-white dark:bg-gray-800 lg:hidden">
            <SidebarContent />
          </aside>
  )
}

export default MobileSidebar
