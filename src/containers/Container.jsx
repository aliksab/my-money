import React from 'react'
import Header from '../components/Header'

const Container = ({ children }) => {
  return (
    <>
      <Header/>
      <div className="flex flex-col flex-1 w-full">
        <main className="h-full bg-gray-50 overflow-y-auto dark:bg-gray-900 false">
            <div className="container grid px-6 mx-auto h-screen mt-5">{children}</div>
        </main>
      </div>
    </>
  )  
}

export default Container
