'use client';

import { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import Link from 'next/link';
import Image from 'next/image';
import { signIn } from 'next-auth/react';
import { useAuth } from '@/context';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function Login() {
  const port = process.env.NEXT_PUBLIC_APP_API_PORT;
  const DOMAIN = process.env.NEXT_PUBLIC_APP_API_DOMAIN;
  const API_URL = `${process.env.NEXT_PUBLIC_APP_API_DOMAIN}:${process.env.NEXT_PUBLIC_APP_API_PORT}`;

  const { setToken, setSession } = useAuth();
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
  const [passwordVisible, setPasswordVisible] = useState(false);

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
    const newErrors = { email: '', password: '' };

    if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email)
    ) {
      newErrors.email = 'Por favor ingresa un correo electrónico válido.';
      valid = false;
    }

    if (!/^(?=.*\d)(?=.*[a-zA-Z]).{8,}$/.test(formData.password)) {
      newErrors.password =
        'La contraseña debe tener al menos 8 caracteres y 1 número.';
      valid = false;
    }

    setErrors(newErrors);

    if (!valid) return;

    try {
      const response = await fetch(`${DOMAIN}/auth/signin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Credenciales incorrectas');
      }

      const result = await response.json();

      if (!result.token || !result.userData) {
        throw new Error('Respuesta inesperada del servidor.');
      }

      setSession(result.userData);
      setToken(result.token);

      toast.success(`¡Hola, ${result.userData.name}! Bienvenido a tu cuenta.`);

      if (result.userData.roles !== 'user') {
        Router.push('/dashBoard-Admin');
      } else {
        Router.push('/');
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error al iniciar sesión:', error.message);
        toast.error('Hubo un error al intentar iniciar sesión.', {
          style: {
            background: 'red',
            color: 'white',
            fontWeight: 'bold',
            fontSize: '15px',
            borderRadius: '8px',
          },
        });
        setErrors({
          ...newErrors,
          password: error.message || 'Credenciales incorrectas',
        });
      } else {
        console.error('Error desconocido', error);
        toast.error('Hubo un error al intentar iniciar sesión.', {
          style: {
            background: 'red',
            color: 'white',
            fontWeight: 'bold',
            fontSize: '15px',
            borderRadius: '8px',
          },
        });
        setErrors({
          ...newErrors,
          password: 'Credenciales incorrectas',
        });
      }
    }
  };

  const handleClickGoogle = async () => {
    try {
      await signIn('google', { callbackUrl: '/loading' });
    } catch (error) {
      console.error('Error en signIn con Google', error);
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(prevState => !prevState);
  };

  return (
    <div
      className="relative w-full h-full bg-gradient-to-b from-yellow-500 via-gray-500 to-black "
      style={{
        background: 'slate',
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 90%, 0% 100%)',
      }}
    >
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8  ">
        <div className="mx-auto max-w-lg p-4 shadow-lg  rounded-xl bg-gradient-to-r from-black via-gray-500 to-yellow-500bg-gradient-to-r from-black via-gray to-black">
          <Image src="/justDoItGym-logo.png" alt="Logo" width={170} height={170} className=' flex justify-center justify-self-center'></Image>


          <form
            action="#"
            className="mb-0 mt-6 space-y-4  rounded-xl p-4 shadow-lg sm:p-6 lg:p-8 bg-yellow-400"
            onSubmit={handleSubmit}
          >
            <p className="text-center text-lg font-medium">Bienvenido</p>

            <div>
              <label htmlFor="email" className="sr-only">
                Correo Electrónico
              </label>
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full  rounded-xl border-gray-200 p-4 pe-12 text-sm shadow-sm"
                  placeholder="Ingrese su correo electrónico"
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
                  type={passwordVisible ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  onFocus={() => setPasswordFocused(true)}
                  onBlur={() => setPasswordFocused(false)}
                  className="w-full  rounded-xl border-gray-200 p-4 pe-12 text-sm shadow-sm"
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
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-4 top-4"
                >
                  {passwordVisible ? (
                    <AiFillEye className="text-gray-500 w-6 h-6" />
                  ) : (
                    <AiFillEyeInvisible className="text-black-500 w-6 h-6" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex flex-col items-center gap-4 w-full">
              <div className="flex flex-row items-center gap-4 justify-center w-full mt-10">
                <button
                  type="submit"
                  className="flex items-center  rounded-xl justify-center w-full max-w-xs px-2 py-3 border border-gray-300 rounded-md shadow-sm bg-white hover:bg-gray-100 focus:border-blue-600 transition duration-300 ease-in-out"
                >
                  Ingresar
                </button>
                <button
                  type="button"
                  className="flex items-center  rounded-xl justify-center w-full max-w-xs px-2 py-3 border border-gray-300 rounded-md shadow-sm bg-white hover:bg-gray-100 focus:border-blue-600 transition duration-300 ease-in-out"
                  onClick={handleClickGoogle}
                >
                  <FcGoogle className="w-6 h-6" />
                  <span className="ml-3 text-sm font-medium text-gray-700">
                    Continuar con Google
                  </span>
                </button>
              </div>
              <p className="mt-6 text-sm font-bold text-gray-700 sm:mt-0 mb-6">
                ¿No tienes una cuenta? Puedes registrarte
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
