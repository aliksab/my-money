import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import LoginForm from '../components/Forms/LoginForm'
import RegisterForm from '../components/Forms/RegisterForm'
import PageTitle from '../components/PageTitle'

const Login = () => {
  const { type } = useParams();
    const [formType, setFormType] = useState(type === "register" ? type : "login");
    const toggleFormType = (params) => {
        setFormType(prev => prev === "register" ? "login" : "register");
    };
  return (
    <div className="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
      <div className="flex-1 max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
        <div className="flex justify-around overflow-y-auto md:flex-row">
          <main className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
            <div className="w-full text-gray-700 dark:text-gray-200">
              {formType === "register" ? <><PageTitle>Регистрация</PageTitle><RegisterForm /><div className='flex justify-between'><p>Уже есть аккаунт?</p> <p><Link role="button" className='tracking-widest  text-gray-900 underline dark:text-white decoration-indigo-500' onClick={toggleFormType} to={`auth/login`}>Вход</Link></p></div></> : <><PageTitle>Авторизация</PageTitle><LoginForm /><div className='flex justify-between'><p>Первый раз?</p><p><Link role="button" className='tracking-widest  text-gray-900 underline dark:text-white decoration-indigo-500' onClick={toggleFormType} to={`auth/register`}>Регистрация</Link></p></div></>}
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

export default Login
