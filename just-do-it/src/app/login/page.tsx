'use client';

import { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { useAuth } from '@/context';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner'; 


export default function Login() {
  const port = process.env.NEXT_PUBLIC_APP_API_PORT;
  const { setToken, setSession } = useAuth(); // Asegúrate de tener acceso a estos métodos en el contexto
  const Router = useRouter();
  
  const initialState = {
    email: '',
    password: '',
  };

  const initialErrors = {
    email: '',
    password: '',
  };

  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState(initialErrors);
  const [passwordFocused, setPasswordFocused] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let valid = true;
    let newErrors = { email: '', password: '' };

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Por favor ingresa un correo electrónico válido.';
      valid = false;
    }

    const passwordRegex = /^(?=.*\d)(?=.*[a-zA-Z]).{8,}$/;
    if (!passwordRegex.test(formData.password)) {
      newErrors.password =
        'La contraseña debe tener al menos 8 caracteres y 1 número.';
      valid = false;
      toast.error('Hubo un error al intentar iniciar sesión');
    }

    setErrors(newErrors);

    if (valid) {
      try {
        const response = await fetch(`http://localhost:${port}/auth/signin`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        });

        if (!response.ok) {
          throw new Error('Credenciales incorrectas');
        }

        const result = await response.json();

        // Guarda los datos del usuario y el token en el contexto
        setSession(result.usedData); // Guarda los datos del usuario
        setToken(result.token);       // Guarda el token

        toast.success(`¡Hola, ${result.usedData.name}! Bienvenido a tu cuenta.`);


        console.log('Usuario logueado con éxito:', result);
        Router.push("/"); // Redirige a la página principal después del login
      } catch (error) {
        console.error('Error al iniciar sesión:', error);
        setErrors({
          ...errors,
          password: 'Hubo un error al intentar iniciar sesión',
          
        });
      }
    }
  };

  const handleClickGoogle = async () => {
    try {
      await signIn('google', { callbackUrl: '/' });
    } catch (error) {
      console.error('Error en signIn con Google', error);
    }
  };

  return (
    <div
      className="relative w-full h-full bg-slate-400"
      style={{
        background: 'slate',
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 90%, 0% 100%)',
      }}
    >
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-lg p-4 bg-yellow-300 shadow-lg rounded-lg">
          <h1 className="text-center text-3xl font-outerSans text-black">
            Just do it
          </h1>
          <p className="mx-auto mt-4 max-w-md text-center text-gray-700">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati
            sunt dolores deleniti inventore quaerat mollitia?
          </p>

          <form
            action="#"
            className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8 bg-yellow-400"
            onSubmit={handleSubmit}
          >
            <p className="text-center text-lg font-medium">Bienvenido</p>

            <div>
              <label htmlFor="email" className="sr-only">
                Correo Electronico
              </label>
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                  placeholder="Ingrese su correo electronico"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="password" className="sr-only">
                Contraseña
              </label>
              <div className="relative">
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  onFocus={() => setPasswordFocused(true)}
                  onBlur={() => setPasswordFocused(false)}
                  className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                  placeholder="Ingrese su contraseña"
                />
                {!errors.password && passwordFocused && (
                  <p className="text-gray-500 text-sm mt-2">
                    La contraseña debe tener al menos 8 caracteres y 1 número.
                  </p>
                )}
                {errors.password && (
                  <p className="text-red-500 text-sm">{errors.password}</p>
                )}
              </div>
            </div>

            <div className="flex flex-col items-center gap-4 w-full">
              <div className="flex flex-row items-center gap-4 justify-center w-full mt-10">
                <button
                  type="submit"
                  className="flex items-center justify-center w-full max-w-xs px-2 py-3 border border-gray-300 rounded-md shadow-sm bg-white hover:bg-gray-100 focus:border-blue-600 transition duration-300 ease-in-out"
                >
                  Ingresar
                </button>
                <button
                  type="button"
                  className="flex items-center justify-center w-full max-w-xs px-2 py-3 border border-gray-300 rounded-md shadow-sm bg-white hover:bg-gray-100 focus:border-blue-600 transition duration-300 ease-in-out"
                  onClick={handleClickGoogle}
                >
                  <FcGoogle className="w-6 h-6" />
                  <span className="ml-3 text-sm font-medium text-gray-700">
                    Continuar con Google
                  </span>
                </button>
              </div>
              <p className="mt-6 text-sm text-gray-500 sm:mt-0 mb-6">
                No tienes una cuenta? Puedes registrarte
                <Link
                  href={'/register'}
                  className="text-blue-500 font-bold hover:underline hover:text-blue-600 ml-1"
                >
                  Aquí
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
