'use client';
import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { ImageUploader } from '@/component/ClassAdmin/imageUpdate';
import EditScheduleDisplay from '@/component/ClassAdmin/shedule-selector-edit';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import styles from './editclasses.module.css';
import { useAuth } from '@/context';
import MyMaps from '@/component/GoogleMaps';

interface Schedule {
  id: string;
  day: string;
  startTime: string;
  endTime: string;
}

interface Trainer {
  id: string;
  name: string;
  // Otros campos del entrenador si son necesarios
}

interface Class {
  id: string;
  name: string;
  description: string;
  location: string;
  capacity: number;
  schedules: Schedule[];
  imgUrl: string;
  trainer: Trainer | null;
}

export default function AdminClassEditor() {
  const { token, classes, fetchClasses } = useAuth();
  const [selectedClassId, setSelectedClassId] = useState<string>('');
  const [classData, setClassData] = useState<Class>({
    id: '',
    name: '',
    description: '',
    location: '',
    capacity: 0,
    schedules: [],
    imgUrl: '',
    trainer: null,
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [classDropdownOpen, setClassDropdownOpen] = useState(false);

  useEffect(() => {
    if (classes?.length === 0) {
      fetchClasses();
    }
  }, [classes, fetchClasses]);

  useEffect(() => {
    if (selectedClassId) {
      const selectedClass = classes?.find(c => c.id === selectedClassId);
      if (selectedClass) {
        setClassData({
          ...selectedClass,
          schedules: selectedClass.schedules || [],
          trainer: selectedClass.trainer || null,
        });
      }
      setClassDropdownOpen(false);
    }
  }, [selectedClassId, classes]);

  const handleClassSelect = useCallback((value: string) => {
    setSelectedClassId(value);
  }, []);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setClassData(prev => ({
        ...prev,
        [name]: name === 'capacity' ? (value ? parseInt(value, 10) : 0) : value,
      }));
    },
    [],
  );

  const handleImageUpload = useCallback((uploadedImageUrl: string) => {
    setClassData(prev => ({ ...prev, imgUrl: uploadedImageUrl }));
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setError(null);
      setSuccess(null);

      if (!selectedClassId) {
        setError('Por favor, selecciona una clase para editar.');
        return;
      }

      const parsedCapacity = Number(classData.capacity);
      if (!Number.isInteger(parsedCapacity) || parsedCapacity <= 0) {
        setError('La capacidad debe ser un número entero positivo');
        return;
      }

      if (!window.confirm('¿Estás seguro de editar esta clase?')) {
        return;
      }

      const classPayload = {
        name: classData.name,
        description: classData.description,
        location: classData.location,
        capacity: parsedCapacity,
        imgUrl: classData.imgUrl,
        trainerId: classData.trainer?.id || null,
        schedules: classData.schedules,
      };

      try {
        const classResponse = await fetch(
          `${process.env.NEXT_PUBLIC_APP_API_DOMAIN}/classes/${selectedClassId}`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(classPayload),
          },
        );

        if (!classResponse.ok) {
          throw new Error('Error al actualizar la clase');
        }

        setSuccess('Clase actualizada exitosamente.');
        fetchClasses(); // Refrescar las clases después de actualizar
      } catch (error) {
        console.error('Error al enviar los datos:', error);
        setError('No se pudo actualizar la clase. Intenta nuevamente.');
      }
    },
    [token, selectedClassId, classData, fetchClasses],
  );

  const handleScheduleChange = (updatedSchedule: Schedule[]) => {
    setClassData(prev => ({ ...prev, schedules: updatedSchedule }));
  };

  const handleLocationChange = (newLocation: string) => {
    setClassData(prev => ({ ...prev, location: newLocation }));
  };

  const updateSchedule = async (
    classId: string,
    scheduleId: string,
    updatedSchedule: Schedule,
  ) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_APP_API_DOMAIN}/schedule/${classId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            scheduleId,
            day: updatedSchedule.day,
            startTime: updatedSchedule.startTime,
            endTime: updatedSchedule.endTime,
          }),
        },
      );

      if (!response.ok) {
        throw new Error('Error al actualizar el horario');
      }

      const data = await response.json();
      setSuccess('Horario actualizado exitosamente.');
    } catch (error) {
      console.error('Error al actualizar el horario:', error);
      setError('No se pudo actualizar el horario. Intenta nuevamente.');
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Editar Clase</h1>

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

      <Card className={styles.card}>
        <CardHeader>
          <CardTitle>Seleccionar Clase para Editar</CardTitle>
        </CardHeader>
        <CardContent>
          <div className={styles.dropdown}>
            <button
              type="button"
              onClick={() => setClassDropdownOpen(!classDropdownOpen)}
              className={styles.selectTrigger}
            >
              {selectedClassId
                ? classes?.find(cls => cls.id === selectedClassId)?.name
                : 'Seleccionar clase'}
            </button>

            {classDropdownOpen && (
              <div className={styles.dropdownMenu}>
                {classes?.map(cls => (
                  <button
                    key={cls.id}
                    type="button"
                    onClick={() => handleClassSelect(cls.id)}
                    className={styles.dropdownItem}
                  >
                    {cls.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <form onSubmit={handleSubmit} className={styles.form}>
        <Label htmlFor="name">Nombre de la Clase</Label>
        <Input
          id="name"
          name="name"
          type="text"
          value={classData.name}
          onChange={handleInputChange}
        />

        <Label htmlFor="description">Descripción</Label>
        <Textarea
          id="description"
          name="description"
          value={classData.description}
          onChange={handleInputChange}
        />

        <Label htmlFor="location">Ubicación</Label>
        <Input
          id="location"
          name="location"
          type="text"
          value={classData.location}
          onChange={handleInputChange}
        />

        <MyMaps
          defaultLocation={classData.location}
          onLocationChange={handleLocationChange}
        />

        <Label htmlFor="capacity">Capacidad</Label>
        <Input
          id="capacity"
          name="capacity"
          type="number"
          value={classData.capacity}
          onChange={handleInputChange}
        />

        <ImageUploader onImageUpload={handleImageUpload} />

        <Label htmlFor="trainer">Entrenador</Label>
        <Input
          id="trainer"
          name="trainer"
          type="text"
          value={classData.trainer?.name || 'No asignado'}
          readOnly
          disabled
        />

        <div className={styles.scheduleEditor}>
          <EditScheduleDisplay
            schedules={classData.schedules}
            onScheduleChange={handleScheduleChange}
            updateSchedule={updateSchedule} 
          />
        </div>

        <Button type="submit">Guardar Cambios</Button>
      </form>
    </div>
  );
}

