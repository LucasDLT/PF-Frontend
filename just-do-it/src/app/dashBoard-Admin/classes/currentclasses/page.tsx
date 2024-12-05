'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
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
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from 'lucide-react';
import { Badge } from "@/components/ui/badge";

export default function AdminClassCreator() {
  const DOMAIN = process.env.NEXT_PUBLIC_APP_API_DOMAIN;
  const PORT = process.env.NEXT_PUBLIC_APP_API_PORT;
  const API_URL = `${DOMAIN}:${PORT}`;
  const { userSession, token } = useAuth();

  const [classData, setClassData] = useState({
    name: '',
    description: '',
    image: '',
    location: '',
    capacity: 0,
    schedules: [] as { day: string; startTime: string; endTime: string }[],
    trainerId: '',
  });

  const [trainers, setTrainers] = useState<{ id: string; name: string }[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [eventAddress, setEventAddress] = useState<string>('');
  const [eventLocation, setEventLocation] = useState<string>('');

  useEffect(() => {
    let isMounted = true;
    const fetchTrainers = async () => {
      try {
        const response = await fetch(`${DOMAIN}/trainers`, {
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
        if (isMounted) {
          setTrainers(data.data);
        }
      } catch (error) {
        console.error('Error al obtener los entrenadores:', error);
        if (isMounted) {
          setError('No se pudo cargar la lista de entrenadores.');
        }
      }
    };

    fetchTrainers();

    return () => {
      isMounted = false;
    };
  }, [DOMAIN, token]);

  const handleInputChange = useCallback((
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if ((name === 'name' && value.length <= 50) || (name === 'description' && value.length <= 150) || name === 'capacity') {
      setClassData(prevData => ({
        ...prevData,
        [name]: name === 'capacity' ? (value ? parseInt(value, 10) : 0) : value,
      }));
    }
  }, []);

  const handleImageUpload = useCallback((uploadedImageUrl: string) => {
    setClassData(prevData => ({ ...prevData, image: uploadedImageUrl }));
  }, []);

  const handleScheduleChange = useCallback((schedules: { day: string; startTime: string; endTime: string }[]) => {
    setClassData(prevData => ({ ...prevData, schedules }));
  }, []);

  const handleSetEventAddress = useCallback((address: string) => {
    setEventAddress(address);
  }, []);

  const handleSetEventLocation = useCallback((location: string) => {
    setEventLocation(location);
    setClassData(prevData => ({ ...prevData, location }));
  }, []);

  const validateForm = () => {
    if (!classData.name || !classData.description || !classData.image || 
        !classData.location || classData.capacity <= 0 || 
        classData.schedules.length === 0 || !classData.trainerId) {
      setError('Todos los campos son obligatorios');
      return false;
    }
    if (classData.name.length < 10 || classData.name.length > 50) {
      setError('El nombre debe tener entre 10 y 50 caracteres.');
      return false;
    }
    if (classData.description.length < 10 || classData.description.length > 150) {
      setError('La descripción debe tener entre 10 y 150 caracteres.');
      return false;
    }
    return true;
  };

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!validateForm()) {
      return;
    }

    const confirmCreate = window.confirm('¿Estás seguro de crear esta clase?');
    if (!confirmCreate) {
      return;
    }

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
      schedules: classData.schedules,
      imgUrl: classData.image,
      trainerId: classData.trainerId,
    };

    try {
      const response = await fetch(`${DOMAIN}/classes`, {
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
          schedules: [],
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
  }, [DOMAIN, token, classData]);

  const getCharacterCount = useMemo(() => (field: 'name' | 'description') => classData[field].length, [classData]);

  const getCharacterCountColor = useMemo(() => (field: 'name' | 'description') => {
    const count = getCharacterCount(field);
    const limit = field === 'name' ? 50 : 150;
    return count > limit ? 'text-red-500' : 'text-gray-500';
  }, [getCharacterCount]);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Crear Nueva Clase</h1>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert>
          <AlertTitle>Éxito</AlertTitle>
          <AlertDescription>{success}</AlertDescription>
        </Alert>
      )}

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
            minLength={10}
            maxLength={50}
          />
          <Badge variant={getCharacterCount('name') > 50 ? "destructive" : "outline"} className={getCharacterCountColor('name')}>
            {getCharacterCount('name')}/50
          </Badge>
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
            minLength={10}
            maxLength={150}
          />
          <Badge variant={getCharacterCount('description') > 150 ? "destructive" : "outline"} className={getCharacterCountColor('description')}>
            {getCharacterCount('description')}/150
          </Badge>
        </div>
        <div className={styles.formGroup}>
          <Label htmlFor="capacity" className={styles.label}>
            Capacidad
          </Label>
          <Input
            id="capacity"
            name="capacity"
            type="number"
            value={classData.capacity}
            onChange={handleInputChange}
            required
            min="1"
          />
        </div>
        <ImageUploader onImageUpload={handleImageUpload} />
        <MyMap
          eventLocation={eventLocation}
          eventAddress={eventAddress}
          setEventAddress={handleSetEventAddress}
          setEventLocation={handleSetEventLocation}
        />
        <ScheduleSelector 
          onScheduleChange={handleScheduleChange}
          initialSchedule={classData.schedules}
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
              setClassData(prevData => ({ ...prevData, trainerId: e.target.value }))}
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
        <Button type="submit" className={styles.submitButton}>
          Crear Clase
        </Button>
      </form>
      <ClassPreview classData={classData} />
    </div>
  );
}
