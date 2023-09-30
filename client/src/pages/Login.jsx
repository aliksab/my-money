import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { GithubIcon, TwitterIcon } from '../icons'
import { Label, Input, Button } from '@windmill/react-ui'
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
            <div className="w-full">
              {formType === "register" ? <><PageTitle>Регистрация</PageTitle><RegisterForm /><p>Уже есть аккаунт? <Link role="button" onClick={toggleFormType} to={`../login`}>Вход</Link></p></> : <><PageTitle>Авторизация</PageTitle><LoginForm /><p>Первый раз? <Link role="button" onClick={toggleFormType} to={`../register`}>Регистрация</Link></p></>}
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

export default Login
