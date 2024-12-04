'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/context';
import { Eye, EyeOff } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function Register() {
  const PORT = process.env.NEXT_PUBLIC_APP_API_PORT;
  const DOMAIN = process.env.NEXT_PUBLIC_APP_API_DOMAIN;
  const API_URL = `${process.env.NEXT_PUBLIC_APP_API_DOMAIN}:${process.env.NEXT_PUBLIC_APP_API_PORT}`;

  const { token, setToken, setSession } = useAuth();
  const router = useRouter();

  const initialState = {
    name: '',
    email: '',
    phone: '',
    country: '',
    address: '',
    password: '',
    confirmPassword: '',
  };

  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    phone: '',
    country: '',
    address: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Manejo de carga

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Resetear los errores
    const newErrors = {
      name: '',
      email: '',
      phone: '',
      country: '',
      address: '',
      password: '',
      confirmPassword: '',
    };

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const phoneRegex = /^[0-9]{10}$/;
    const passwordRegex = /^(?=.*\d)(?=.*[a-zA-Z]).{8,}$/;

    // Validaciones
    if (!formData.name.trim()) newErrors.name = 'El nombre es obligatorio.';
    if (!emailRegex.test(formData.email))
      newErrors.email = 'Correo electrónico inválido.';
    if (!phoneRegex.test(formData.phone))
      newErrors.phone = 'El número de teléfono debe tener 10 dígitos.';
    if (!formData.country.trim()) newErrors.country = 'El país es obligatorio.';
    if (!formData.address.trim())
      newErrors.address = 'La dirección es obligatoria.';
    if (!passwordRegex.test(formData.password))
      newErrors.password =
        'La contraseña debe tener al menos 8 caracteres y un número.';
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden.';
    }

    setErrors(newErrors);

    if (Object.values(newErrors).every(err => !err)) {
      try {
        setIsLoading(true);

        const response = await fetch(`${DOMAIN}/auth/signup`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          throw new Error('Error en el registro del usuario.');
        }

        const result = await response.json();

        setSession(result.userData);
        setToken(result.token);

        toast.success('Usuario registrado con éxito. Bienvenido a Just do it.');
        router.push('/login');
      } catch (error) {
        toast.error(
          'Error al registrar usuario.',

          {
            style: {
              background: 'red',
              color: 'white',
              fontWeight: 'bold',
              fontSize: '15px',
              borderRadius: '8px',
            },
          },
        );

        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="relative w-full h-full bg-gradient-to-b from-yellow-500 via-gray-500 to-black">
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-lg p-4 bg-gradient-to-r from-black via-gray-500 to-yellow-500bg-gradient-to-r from-black via-gray to-black shadow-lg rounded-xl ">
        <Image src="/justDoItGym-logo.png" alt="Logo" width={170} height={170} className=' flex justify-center justify-self-center'></Image>

          <form
            className="space-y-4 p-4 shadow-lg sm:p-6 lg:p-8 bg-yellow-400  rounded-xl"
            onSubmit={handleSubmit}
          >
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 "
              >
                Nombre
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full  rounded-xl border-gray-200 p-4 text-sm shadow-sm"
                placeholder="Ingresa tu nombre"
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Correo electrónico
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full  rounded-xl border-gray-200 p-4 text-sm shadow-sm"
                placeholder="Ingresa tu correo"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700"
              >
                Teléfono
              </label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full  rounded-xl border-gray-200 p-4 text-sm shadow-sm"
                placeholder="Ingresa tu número de teléfono"
              />
              {errors.phone && (
                <p className="text-red-500 text-sm">{errors.phone}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="country"
                className="block text-sm font-medium text-gray-700"
              >
                País
              </label>
              <input
                type="text"
                id="country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="w-full  rounded-xl border-gray-200 p-4 text-sm shadow-sm"
                placeholder="Ingresa tu país"
              />
              {errors.country && (
                <p className="text-red-500 text-sm">{errors.country}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-700"
              >
                Dirección
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full  rounded-xl border-gray-200 p-4 text-sm shadow-sm"
                placeholder="Ingresa tu dirección"
              />
              {errors.address && (
                <p className="text-red-500 text-sm">{errors.address}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Contraseña
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full  rounded-xl border-gray-200 p-4 text-sm shadow-sm pr-10"
                  placeholder="Ingresa tu contraseña"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-600"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <Eye className="h-5 w-5" />
                  ) : (
                    <EyeOff className="h-5 w-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Confirmar Contraseña
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full  rounded-xl border-gray-200 p-4 text-sm shadow-sm pr-10"
                  placeholder="Confirma tu contraseña"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-600 "
                  onClick={toggleConfirmPasswordVisibility}
                >
                  {showConfirmPassword ? (
                    <Eye className="h-5 w-5" />
                  ) : (
                    <EyeOff className="h-5 w-5" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
              )}
            </div>

            <div className="flex items-center justify-between">
              <button
                type="submit"
                disabled={isLoading} // Deshabilitar botón mientras se carga
                className="w-full  rounded-xl bg-blue-500 text-white px-4 py-2"
              >
                {isLoading ? 'Registrando...' : 'Registrarme'}
              </button>
            </div>

            <div className="mt-4 text-center">
              <p>
                ¿Ya tienes una cuenta?{' '}
                <Link href="/login" className="text-blue-500">
                  Inicia sesión
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
