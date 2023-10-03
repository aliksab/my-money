import React from 'react'
import SidebarContent from './SidebarContent'

function MobileSidebar() {

  return (

    <aside className="fixed w-screen inset-x-0 bottom-0 overflow-y-auto bg-white dark:bg-gray-800 lg:invisible">
            <SidebarContent />
          </aside>
  )
}

export default MobileSidebar
