import { Button } from '@heroui/button'
import { Input } from "@heroui/react"
import { useState } from "react";

import bgImage from '../../../assets/background.png'
import img from '../../../assets/logo.png'
import passwordIcon from '../../../assets/password.svg'
import userIcon from '../../../assets/username.svg'

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Logging in with:", { username, password });
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})`}}
    >
      <div className="absolute inset-0 bg-zinc-400 opacity-70 z-0"></div>
      
      <div className="relative w-full max-w-md p-8 bg-sky-900 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-white">¡BIENVENIDOS!</h2>
        <div className="flex justify-center my-4">
          <img src={img} alt="logo" className="h-12" />
        </div>
        
        <form className="mt-6" onSubmit={handleLogin}>
          <div className="mb-4">
          <div className="flex items-center text-left mb-2">
              <img src={userIcon} alt="Usuario" className="h-5 w-5 mr-2"/>
              <label className="text-sm font-bold text-white">Usuario</label>
            </div>
              <Input
              isClearable
                radius='none'
                type="text"
                className="w-full rounded-lg overflow-hidden"
                placeholder="Ingrese su usuario"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onClear={() => setUsername("")}
              />
          </div>

          <div className="mb-4">
          <div className="flex items-center text-left mb-2">
              <img src={passwordIcon} alt="Contraseña" className="h-5 w-5 mr-2"/>
              <label className="text-sm font-bold text-white">Contraseña</label>
            </div>
              <Input
              isClearable
                radius='none'
                type="password"
                className="w-full rounded-lg overflow-hidden"
                placeholder="Ingrese su contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onClear={() => setPassword("")}
              />
          </div>

          <Button color="primary">
            Iniciar Sesion
          </Button>

          <div className="mt-4 text-center">
            <a href="#" className="text-white text-sm">¿Olvidaste la contraseña?</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
