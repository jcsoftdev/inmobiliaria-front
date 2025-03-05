import { Button } from '@heroui/button'
import { Input } from '@heroui/react'
import { useId, useState } from 'react'
import { Link, useNavigate } from 'react-router'

import {
  authStorageKeys,
  saveInLocalStorage,
} from '@components/modules/login/utils'

import { signIn } from '@services/auth'

import bgImage from '../../../assets/background.png'
import img from '../../../assets/logo.png'
import passwordIcon from '../../../assets/password.svg'
import userIcon from '../../../assets/username.svg'

const Login = () => {
  const [username, setUsername] = useState('jc2@dev.com')
  const [password, setPassword] = useState('seguro')

  const idUsername = useId()
  const idPassword = useId()

  const navigate = useNavigate()

  const [hasError, setHasError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    setIsLoading(true)
    signIn(email, password)
      .then((res) => {
        saveInLocalStorage(authStorageKeys.accessToken, res.access_token)
        saveInLocalStorage(authStorageKeys.refreshToken, res.refresh_token)
        // setTimeout(() => {
        navigate('/')
        // }, 1000)
      })
      .catch(() => {
        setHasError(true)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="absolute inset-0 bg-zinc-400 opacity-70 z-0"></div>

      <div className="relative w-full max-w-md p-8 bg-sky-900 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-white">
          ¡BIENVENIDOS!
        </h2>
        <div className="flex justify-center my-4">
          <img src={img} alt="logo" className="h-12" />
        </div>

        <form className="mt-6" onSubmit={handleLogin}>
          <div className="mb-4">
            <div className="flex items-center text-left mb-2">
              <img src={userIcon} alt="Usuario" className="h-5 w-5 mr-2" />
              <label
                htmlFor={idUsername}
                className="text-sm font-bold text-white"
              >
                Usuario
              </label>
            </div>
            <Input
              id={idUsername}
              isClearable
              radius="none"
              name="email"
              type="text"
              className="w-full rounded-lg overflow-hidden"
              placeholder="Ingrese su usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onClear={() => setUsername('')}
              isInvalid={hasError}
            />
          </div>

          <div className="mb-4">
            <div className="flex items-center text-left mb-2">
              <img
                src={passwordIcon}
                alt="Contraseña"
                className="h-5 w-5 mr-2"
              />
              <label
                htmlFor={idPassword}
                className="text-sm font-bold text-white"
              >
                Contraseña
              </label>
            </div>
            <Input
              id={idPassword}
              isClearable
              name="password"
              radius="none"
              type="password"
              className="w-full rounded-lg overflow-hidden"
              placeholder="Ingrese su contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onClear={() => setPassword('')}
              isInvalid={hasError}
              errorMessage="Usuario o contraseña incorrectos"
            />
          </div>

          <Button color="primary" type="submit">
            {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
          </Button>
          {/* Not implemented yet  */}
          <div className="mt-4 text-center">
            <Link to="/forgot-password" className="text-white text-sm">
              ¿Olvidaste la contraseña?
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
