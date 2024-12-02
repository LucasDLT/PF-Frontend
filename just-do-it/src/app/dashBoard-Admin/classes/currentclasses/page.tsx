'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { ImageUploader } from '@/component/ClassAdmin/imageUpdate';
import MyMap from '@/component/GoogleMaps/index';
import ScheduleSelector from '@/component/ClassAdmin/shedule-selector';
import styles from './AdminClassCreator.module.css';
import { ClassPreview } from '@/component/ClassAdmin/CardPreview';
import { useAuth } from '@/context';

export default function AdminClassCreator() {
  const DOMAIN= process.env.NEXT_PUBLIC_APP_API_DOMAIN
  const PORT = process.env.NEXT_PUBLIC_APP_API_PORT;
  const API_URL = `${process.env.NEXT_PUBLIC_APP_API_DOMAIN}:${process.env.NEXT_PUBLIC_APP_API_PORT}`;
  const {userSession, token} = useAuth();
  const [classData, setClassData] = useState({
    name: '',
    description: '',
    image: '',
    location: '',
    capacity: 0,
    schedule: [] as { day: string; startTime: string; endTime: string }[],
    trainerId: '',
  });

  const [trainers, setTrainers] = useState<{ id: string; name: string }[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    const fetchTrainers = async () => {
      try {
        const response = await fetch(`${API_URL}/trainers`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, 
          },
        });
  
        if (!response.ok) {
          throw new Error('Error al obtener los entrenadores');
        }
  
        const data = await response.json();
        setTrainers(data.data);
      } catch (error) {
        console.error('Error al obtener los entrenadores:', error);
        setError('No se pudo cargar la lista de entrenadores.');
      }
    };
  
    fetchTrainers();
  }, [ token]);
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    if (name === 'capacity') {
      // Convertir capacity a número entero antes de actualizar el estado
      setClassData({
        ...classData,
        [name]: value ? parseInt(value, 10) : 0, // Convertir el valor a número
      });
    } else {
      setClassData({ ...classData, [name]: value });
    }
  };

  const handleImageUpload = (uploadedImageUrl: string) => {
    setClassData({ ...classData, image: uploadedImageUrl });
  };

  const handleScheduleChange = (
    schedule: { day: string; startTime: string; endTime: string }[],
  ) => {
    setClassData({ ...classData, schedule });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    // Asegurarse de que capacity es un número entero positivo
    const parsedCapacity = Number(classData.capacity);
    if (!Number.isInteger(parsedCapacity) || parsedCapacity <= 0) {
      setError('La capacidad debe ser un número entero positivo');
      return;
    }

    const payload = {
      name: classData.name,
      description: classData.description,
      location: classData.location,
      capacity: parsedCapacity, 
      schedule: classData.schedule,
      imgUrl: classData.image,
      trainerId: classData.trainerId,
    };

    try {
      const response = await fetch(`${API_URL}/classes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,  
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setSuccess('Clase creada exitosamente.');
        setClassData({
          name: '',
          description: '',
          image: '',
          location: '',
          capacity: 0,
          schedule: [],
          trainerId: '',
        });
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Error al crear la clase.');
      }
    } catch (error) {
      console.error('Error al enviar los datos:', error);
      setError('No se pudo enviar la solicitud. Intenta nuevamente.');
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Crear Nueva Clase</h1>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <Label htmlFor="name" className={styles.label}>
            Nombre de la Clase
          </Label>
          <Input
            id="name"
            name="name"
            value={classData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <Label htmlFor="description" className={styles.label}>
            Descripción
          </Label>
          <Textarea
            id="description"
            name="description"
            value={classData.description}
            onChange={handleInputChange}
            required
          />
        </div>
        <ImageUploader onImageUpload={handleImageUpload} />
        <div className={styles.formGroup}>
          <Label htmlFor="location" className={styles.label}>
            Ubicación
          </Label>
          <Input
            id="location"
            name="location"
            value={classData.location}
            onChange={handleInputChange}
            required
          />
        </div>
        <MyMap
          eventLocation={classData.location}
          eventAddress={classData.location}
          setEventAddress={(address) =>
            setClassData({ ...classData, location: address })
          }
          setEventLocation={(location) =>
            setClassData({ ...classData, location })
          }
        />
        <div className={styles.formGroup}>
          <Label htmlFor="trainerId" className={styles.label}>
            Profesor
          </Label>
          <select
            id="trainerId"
            name="trainerId"
            value={classData.trainerId}
            onChange={(e) =>
              setClassData({ ...classData, trainerId: e.target.value })
            }
            className={styles.select}
            required
          >
            <option value="" disabled>
              Selecciona un profesor
            </option>
            {trainers.map((trainer) => (
              <option key={trainer.id} value={trainer.id}>
                {trainer.name}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.formGroup}>
          <ScheduleSelector onScheduleChange={handleScheduleChange} />
        </div>
        <div className={styles.formGroup}>
          <Label htmlFor="capacity" className={styles.label}>
            Capacidad Máxima
          </Label>
          <Input
            id="capacity"
            name="capacity"
            type="number"
            min="1"
            value={classData.capacity}
            onChange={handleInputChange}
            required
          />
        </div>
        {error && <p className={styles.error}>{error}</p>}
        {success && <p className={styles.success}>{success}</p>}
        <Button type="submit" className={styles.submitButton}>
          Crear Clase
        </Button>
      </form>

      <div className={styles.preview}>
        <ClassPreview classData={classData} />
      </div>
    </div>
  );
}
