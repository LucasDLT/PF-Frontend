'use client';
import { useAuth } from '@/context';
import React, { useState } from 'react';

const CreateMembershipPage = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [formErrors, setFormErrors] = useState({
    name: '',
    description: '',
    duration: '',
  });
  const [showModal, setShowModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const { token } = useAuth();
  const DOMAIN = process.env.NEXT_PUBLIC_APP_API_DOMAIN;

  // Definir la interfaz para los datos que se enviarán
  interface MembershipData {
    name: string;
    price: number;
    duration: number;
    description: string;
  }

  const validateForm = (): boolean => {
    let valid = true;
    const errors = {
      name: '',
      description: '',
      duration: '',
    };

    if (name.length < 10) {
      errors.name = 'El nombre debe tener al menos 10 caracteres';
      valid = false;
    }

    if (description.length < 10) {
      errors.description = 'La descripción debe tener al menos 10 caracteres';
      valid = false;
    }

    if (![30, 45, 60, 75, 90].includes(duration)) {
      errors.duration = 'La duración debe ser 30, 45, 60, 75 o 90 días';
      valid = false;
    }

    setFormErrors(errors);
    return valid;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    // Crear el objeto con el tipo MembershipData
    const membershipData: MembershipData = { name, price, duration, description };

    try {
      const response = await fetch(`${DOMAIN}/memberships/create-product`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(membershipData),
      });

      if (!response.ok) {
        throw new Error('Error al crear la membresía');
      }

      const data = await response.json();
      setSuccessMessage('Membresía creada exitosamente!');
      setTimeout(() => setSuccessMessage(''), 5000); // Limpiar el mensaje de éxito después de 5 segundos
    } catch (error) {
      setError((error as Error).message);
    }
  };

  const handleCreateClick = () => {
    setShowModal(true); // Muestra el modal de confirmación
  };

  const handleCancel = () => {
    setShowModal(false); // Cierra el modal sin hacer nada
  };

  const handleConfirm = () => {
    handleSubmit();
    setShowModal(false); // Cierra el modal después de confirmar
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-6">Crear Membresía</h1>
      {error && <p className="text-red-500">{error}</p>}
      {successMessage && <p className="text-green-500">{successMessage}</p>}
      <form className="space-y-4">
        {/* Nombre */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium">
            Nombre
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={e => setName(e.target.value)}
            className="w-full px-4 py-2 border rounded-md"
            placeholder="Nombre de la membresía"
          />
          <p className={`text-xs mt-1 ${formErrors.name ? 'text-red-500' : 'text-black'}`}>
            El nombre debe tener al menos 10 caracteres
          </p>
          {formErrors.name && (
            <p className="text-xs text-red-500 mt-1">{formErrors.name}</p>
          )}
        </div>

        {/* Precio */}
        <div>
          <label htmlFor="price" className="block text-sm font-medium">
            Precio
          </label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={e => setPrice(Number(e.target.value))}
            className="w-full px-4 py-2 border rounded-md"
            placeholder="Precio de la membresía"
          />
        </div>

        {/* Duración */}
        <div>
          <label htmlFor="duration" className="block text-sm font-medium">
            Duración (dias)
          </label>
          <select
            id="duration"
            value={duration}
            onChange={e => setDuration(Number(e.target.value))}
            className="w-full px-4 py-2 border rounded-md"
          >
            <option value="">Seleccione una duración</option>
            <option value={30}>30 días</option>
            <option value={45}>45 días</option>
            <option value={60}>60 días</option>
            
          </select>
          <p className={`text-xs mt-1 ${formErrors.duration ? 'text-red-500' : 'text-black'}`}>
            La duración debe ser 30, 45, 60, 75 o 90 días
          </p>
          {formErrors.duration && (
            <p className="text-xs text-red-500 mt-1">{formErrors.duration}</p>
          )}
        </div>

        {/* Descripción */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium">
            Descripción
          </label>
          <textarea
            id="description"
            value={description}
            onChange={e => setDescription(e.target.value)}
            className="w-full px-4 py-2 border rounded-md"
            placeholder="Descripción de la membresía"
          />
          <p className={`text-xs mt-1 ${formErrors.description ? 'text-red-500' : 'text-black'}`}>
            La descripción debe tener al menos 10 caracteres
          </p>
          {formErrors.description && (
            <p className="text-xs text-red-500 mt-1">{formErrors.description}</p>
          )}
        </div>

        <button
          type="button"
          onClick={handleCreateClick}
          className="w-full px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Crear Membresía
        </button>
      </form>

      {/* Modal de Confirmación */}
      {showModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg max-w-sm w-full">
            <h3 className="text-lg font-bold mb-4">¿Estás seguro de crear esta membresía?</h3>
            <div className="flex justify-between">
              <button
                onClick={handleCancel}
                className="px-4 py-2 bg-gray-300 text-black rounded-md"
              >
                Cancelar
              </button>
              <button
                onClick={handleConfirm}
                className="px-4 py-2 bg-blue-500 text-white rounded-md"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateMembershipPage;
