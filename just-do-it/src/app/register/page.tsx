"use client";

import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import { Phone } from "lucide-react";

export default function Register() {
  const initialState = {
    name: "",
    email: "",
    phone: "",
    address: "",
    password: "",
    confirmPassword: "",
  };

  const initialErrors = {
    name: "",
    email: "",
    phone: "",
    address: "",
    password: "",
    confirmPassword: "",
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let valid = true;
    let newErrors = { ...initialErrors };

   
    if (!formData.name) {
      newErrors.name = "El nombre es obligatorio.";
      valid = false;
    }

    
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = "Por favor ingresa un correo electrónico válido.";
      valid = false;
    }

  
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = "Por favor ingresa un número de teléfono válido (10 dígitos).";
      valid = false;
    }

    
    if (!formData.address) {
      newErrors.address = "La dirección es obligatoria.";
      valid = false;
    }

   
    const passwordRegex = /^(?=.*\d)(?=.*[a-zA-Z]).{8,}$/;
    if (!passwordRegex.test(formData.password)) {
      newErrors.password = "La contraseña debe tener al menos 8 caracteres y 1 número.";
      valid = false;
    }

  
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Las contraseñas no coinciden.";
      valid = false;
    }

    setErrors(newErrors);

    if (valid) {
      console.log("Formulario enviado");
    }
  };

  return (
    <div className="relative w-full h-full bg-slate-400" style={{ background: "slate", clipPath: "polygon(0% 0%, 100% 0%, 100% 90%, 0% 100%)" }}>
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-lg p-4 bg-yellow-300 shadow-lg rounded-lg">
          <h1 className="text-center text-3xl font-outerSans text-black">Just do it</h1>
          <p className="mx-auto mt-4 max-w-md text-center text-gray-700">
            Completa el siguiente formulario para registrarte.
          </p>

          <form action="#" className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8 bg-yellow-400" onSubmit={handleSubmit}>
            <p className="text-center text-lg font-medium">Regístrate</p>

            <div>
              <label htmlFor="name" className="sr-only">Nombre</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full rounded-lg border-gray-200 p-4 text-sm shadow-sm"
                placeholder="Ingresa tu nombre"
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
            </div>

            <div>
              <label htmlFor="email" className="sr-only">Correo Electrónico</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full rounded-lg border-gray-200 p-4 text-sm shadow-sm"
                placeholder="Ingresa tu correo electrónico"
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="phone" className="sr-only">Teléfono</label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full rounded-lg border-gray-200 p-4 text-sm shadow-sm"
                placeholder="Ingresa tu teléfono"
              />
              {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
            </div>

            <div>
              <label htmlFor="address" className="sr-only">Dirección</label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full rounded-lg border-gray-200 p-4 text-sm shadow-sm"
                placeholder="Ingresa tu dirección"
              />
              {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
            </div>

            <div>
              <label htmlFor="password" className="sr-only">Contraseña</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                onFocus={() => setPasswordFocused(true)}
                onBlur={() => setPasswordFocused(false)}
                className="w-full rounded-lg border-gray-200 p-4 text-sm shadow-sm"
                placeholder="Ingresa tu contraseña"
              />
              {!errors.password && passwordFocused && (
                <p className="text-gray-500 text-sm mt-2">
                  La contraseña debe tener al menos 8 caracteres y 1 número.
                </p>
              )}
              {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
            </div>

            <div>
              <label htmlFor="confirmPassword" className="sr-only">Confirmar Contraseña</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full rounded-lg border-gray-200 p-4 text-sm shadow-sm"
                placeholder="Confirma tu contraseña"
              />
              {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
            </div>

            <div className="flex flex-col items-center gap-4 w-full">
              <button
                type="submit"
                className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm bg-white hover:bg-gray-100 focus:border-blue-600 transition duration-300 ease-in-out"
              >
                Registrarte
              </button>

              <p className="mt-6 text-sm text-gray-500 sm:mt-0 mb-6">
                ¿Ya tienes una cuenta? Puedes Ingresar
                <Link
                  href={'/login'}
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
