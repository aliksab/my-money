import React, { useState } from 'react'

import { Modal } from '@windmill/react-ui'
import Button from './Button'


function Modals({title, icon, children}) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  function openModal() {
    setIsModalOpen(true)
  }

  function closeModal() {
    setIsModalOpen(false)
  }

  return (
    <>
      <div>
        {!!title ? <Button toggleButton={openModal}>{title}</Button> : <button className='flex items-center width-full text-gray-800 dark:text-gray-200' onClick={openModal}>{icon}</button>}
      </div>
      {/* {isModalOpen && (
        <div className='fixed inset-0 top-0 w-full z-40 flex items-end bg-black bg-opacity-50 sm:items-center sm:justify-center enter enter-active'>
          <div className='absolute inset-x-1/4 border h-max rounded p-6 bg-gray-50 dark:bg-gray-9'>
            {children}
            {console.log(children)}
          <button onClick={() => closeModal()}>
          Close Pop-up
        </button></div>
        </div>
        
      )} */}
      
    </>
  )
}

export default Modals
