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

    if (name.length < 5 || name.length > 50) {
      errors.name = 'El nombre debe tener entre 5 y 50 caracteres';
      valid = false;
    }

    if (description.length < 10 || description.length > 150) {
      errors.description =
        'La descripción debe tener entre 10 y 150 caracteres';
      valid = false;
    }

    if (![30, 45, 60, 75, 90].includes(duration)) {
      errors.duration = 'La duración debe ser 30, 45, 60, 75 o 90 días';
      valid = false;
    }

    setFormErrors(errors);
    return valid;
  };

  const handleNameChange = (value: string) => {
    if (value.length <= 50) setName(value);
  };

  const handleDescriptionChange = (value: string) => {
    if (value.length <= 150) setDescription(value);
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    const membershipData: MembershipData = {
      name,
      price,
      duration,
      description,
    };

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

      setName('');
      setPrice(0);
      setDuration(0);
      setDescription('');
      setFormErrors({ name: '', description: '', duration: '' });

      setTimeout(() => setSuccessMessage(''), 5000);
    } catch (error) {
      setError((error as Error).message);
    }
  };

  const handleCreateClick = () => {
    setShowModal(true);
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  const handleConfirm = () => {
    handleSubmit();
    setShowModal(false);
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-6">Crear Membresía</h1>
      {error && <p className="text-red-500">{error}</p>}
      {successMessage && <p className="text-green-500">{successMessage}</p>}
      <form className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium">
            Nombre
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={e => handleNameChange(e.target.value)}
            className="w-full px-4 py-2 border rounded-md"
            placeholder="Nombre de la membresía"
          />
          <p
            className={`text-xs mt-1 ${
              formErrors.name ? 'text-red-500' : 'text-black'
            }`}
          >
            {formErrors.name || `Caracteres permitidos: ${name.length}/50`}
          </p>
        </div>

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

        <div>
          <label htmlFor="duration" className="block text-sm font-medium">
            Duración (días)
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
            <option value={75}>75 días</option>
            <option value={90}>90 días</option>
          </select>
          <p
            className={`text-xs mt-1 ${
              formErrors.duration ? 'text-red-500' : 'text-black'
            }`}
          >
            {formErrors.duration ||
              'Duraciones disponibles: 30, 45, 60, 75, 90 días'}
          </p>
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium">
            Descripción
          </label>
          <textarea
            id="description"
            value={description}
            onChange={e => handleDescriptionChange(e.target.value)}
            className="w-full px-4 py-2 border rounded-md"
            placeholder="Descripción de la membresía"
          />
          <p
            className={`text-xs mt-1 ${
              formErrors.description ? 'text-red-500' : 'text-black'
            }`}
          >
            {formErrors.description ||
              `Caracteres permitidos: ${description.length}/150`}
          </p>
        </div>

        <button
          type="button"
          onClick={handleCreateClick}
          className="w-full px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Crear Membresía
        </button>
      </form>

      {showModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg max-w-sm w-full">
            <h3 className="text-lg font-bold mb-4">
              ¿Estás seguro de crear esta membresía?
            </h3>
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
