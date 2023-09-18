import React from 'react'
import { Link } from 'react-router-dom'
import { GithubIcon, TwitterIcon } from '../icons'
import { Label, Input, Button } from '@windmill/react-ui'

const Login = () => {
  return (
    <div className="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
      <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
        <div className="flex justify-around overflow-y-auto md:flex-row">
          <main className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
            <div className="w-full">
              <h1 className="mb-4 text-xl font-semibold text-center text-gray-700 dark:text-gray-200">Добро пожаловать</h1>
              <Label>
                <span>Email</span>
                <Input className="mt-1" type="email" placeholder="john@doe.ru" />
              </Label>

              <Label className="mt-4">
                <span>Пароль</span>
                <Input className="mt-1" type="password" placeholder="***************" />
              </Label>

              <Button className="mt-4" block tag={Link} to="/home">
                Вход
              </Button>

              <hr className="my-8" />
              <div className="flex allign-start justify-between">
                <p className="mt-4">
                  <Link
                    className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline"
                    to="/forgot-password"
                  >
                    Забыли пароль?
                  </Link>
                </p>
                <p className="mt-4">
                  <Link
                    className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline"
                    to="/create-account"
                  >
                    Создать аккаунт
                  </Link>
                </p>
              </div>

              
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

export default Login
