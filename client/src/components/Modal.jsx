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
      
        <Modal isOpen={isModalOpen} onClose={closeModal} className='absolute inset-x-1/4 border h-max rounded p-6 bg-gray-50 dark:bg-gray-900'>
          {children}
        </Modal>
      
      {/* {isModalOpen && (
        <div className='absolute inset-x-1/4 border h-max rounded p-6 bg-gray-50 dark:bg-gray-9'>
          {children}
        </div>
      )} */}
      
    </>
  )
}

export default Modals
