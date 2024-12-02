'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { ImageUploader } from '@/component/ClassAdmin/imageUpdate';
import MyMap from '@/component/GoogleMaps/index';
import ScheduleSelector from '@/component/ClassAdmin/shedule-selector';
import { ClassPreview } from '@/component/ClassAdmin/CardPreview';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import styles from './editclasses.module.css';
import { useAuth } from '@/context';

interface Schedule {
  day: string;
  startTime: string;
  endTime: string;
}

interface Class {
  id: string;
  name: string;
  description: string;
  location: string;
  capacity: number;
  schedule: Schedule[];
  image: string;
  trainerId: string | null;
}

export default function AdminClassManager() {
  const API_URL = `${process.env.NEXT_PUBLIC_APP_API_DOMAIN}:${process.env.NEXT_PUBLIC_APP_API_PORT}`;
  const DOMAIN= process.env.NEXT_PUBLIC_APP_API_DOMAIN
  const {token , userSession}=useAuth();
  const [classes, setClasses] = useState<Class[]>([]);
  const [selectedClassId, setSelectedClassId] = useState<string>('');
  const [classData, setClassData] = useState<Class>({
    id: '',
    name: '',
    description: '',
    location: '',
    capacity: 0,
    schedule: [],
    image: '',
    trainerId: null,
  });
  const [trainers, setTrainers] = useState<{ id: string; name: string }[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [classDropdownOpen, setClassDropdownOpen] = useState(false);
  const [trainerDropdownOpen, setTrainerDropdownOpen] = useState(false);

  useEffect(() => {
    fetchClasses();
    fetchTrainers();
  }, []);

  const fetchClasses = async () => {
    try {
      const response = await fetch(`${DOMAIN}/classes`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, 
        },
      });
  
      if (response.ok) {
        const [data] = await response.json();
        const formattedClasses = data.map((cls: any) => ({
          id: cls.id,
          name: cls.name,
          description: cls.description,
          location: cls.location,
          capacity: cls.capacity,
          schedule: cls.schedules.map((schedule: any) => ({
            day: schedule.day,
            startTime: schedule.startTime,
            endTime: schedule.endTime,
          })),
          imgUrl: cls.imgUrl,
          trainerId: cls.trainer?.id || null,
        }));
        setClasses(formattedClasses);
      } else {
        console.error('Error fetching classes:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching classes:', error);
    }
  };
  

  const fetchTrainers = async () => {
    try {
      const response = await fetch(`${DOMAIN}/trainers`);
      const data = await response.json();
      setTrainers(data.data);
    } catch (error) {
      console.error('Error al obtener los entrenadores:', error);
    }
  };

  const handleClassSelect = (value: string) => {
    setSelectedClassId(value);
    if (value) {
      const selectedClass = classes.find(c => c.id === value);
      if (selectedClass) {
        setClassData(selectedClass);
      }
    } else {
      setClassData({
        id: '',
        name: '',
        description: '',
        location: '',
        capacity: 0,
        schedule: [],
        image: '',
        trainerId: null,
      });
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    if (name === 'capacity') {
      setClassData({
        ...classData,
        [name]: value ? parseInt(value, 10) : 0,
      });
    } else {
      setClassData({ ...classData, [name]: value });
    }
  };

  const handleImageUpload = (uploadedImageUrl: string) => {
    setClassData({ ...classData, image: uploadedImageUrl });
  };

  const handleScheduleChange = (schedule: Schedule[]) => {
    setClassData({ ...classData, schedule });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

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
      const method = selectedClassId ? 'PUT' : 'POST';
      const url = selectedClassId ? `${API_URL}/classes/${selectedClassId}` : `${API_URL}/classes`;
      
      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setSuccess(selectedClassId ? 'Clase actualizada exitosamente.' : 'Clase creada exitosamente.');
        fetchClasses(); 
        if (!selectedClassId) {
          setClassData({
            id: '',
            name: '',
            description: '',
            location: '',
            capacity: 0,
            schedule: [],
            image: '',
            trainerId: null,
          });
          setSelectedClassId('');
        }
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Error al procesar la clase.');
      }
    } catch (error) {
      console.error('Error al enviar los datos:', error);
      setError('No se pudo enviar la solicitud. Intenta nuevamente.');
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Gestionar Clases</h1>

      <Card className={styles.card}>
        <CardHeader>
          <CardTitle>Seleccionar Clase</CardTitle>
        </CardHeader>
        <CardContent>
          <div className={styles.dropdown}>
            <button
              onClick={() => setClassDropdownOpen(!classDropdownOpen)}
              className={styles.selectTrigger}
            >
              {selectedClassId ? classes.find(cls => cls.id === selectedClassId)?.name : "Seleccionar clase para editar"}
            </button>
            {classDropdownOpen && (
              <div className={styles.dropdownMenu}>
                <button className={styles.dropdownItem} onClick={() => handleClassSelect('new')}>
                  Crear Nueva Clase
                </button>
                {classes.map((cls) => (
                  <button
                    key={cls.id}
                    className={styles.dropdownItem}
                    onClick={() => handleClassSelect(cls.id)}
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
        <ImageUploader onImageUpload={handleImageUpload} initialImage={classData.image} />
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
          <div className={styles.dropdown}>
            <button
              onClick={() => setTrainerDropdownOpen(!trainerDropdownOpen)}
              className={styles.selectTrigger}
            >
              {classData.trainerId ? trainers.find(trainer => trainer.id === classData.trainerId)?.name : "Selecciona un profesor"}
            </button>
            {trainerDropdownOpen && (
              <div className={styles.dropdownMenu}>
                {trainers.map((trainer) => (
                  <button
                    key={trainer.id}
                    className={styles.dropdownItem}
                    onClick={() => setClassData({ ...classData, trainerId: trainer.id })}
                  >
                    {trainer.name}
                  </button>
                ))}
              </div>
            )}
          </div>
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
          />
        </div>
        <ScheduleSelector onScheduleChange={handleScheduleChange} initialSchedule={classData.schedule} />
        <div className={styles.formActions}>
          <Button type="submit">Guardar</Button>
        </div>
        {error && <div className={styles.error}>{error}</div>}
        {success && <div className={styles.success}>{success}</div>}
      </form>

      {classData.id && (
        <ClassPreview
         
          classData={classData}
        />
      )}
    </div>
  );
}
