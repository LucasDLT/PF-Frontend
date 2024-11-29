'use client';



import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import ActivityDetail from '@/component/classDetail';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Reviews from '@/component/reviews';

interface Schedule {
  id: string;
  day: string;
  startTime: string;
  endTime: string;
  currentParticipants: number;
  remainingCapacity: number;
}

interface Trainer {
  id: string;
  name: string;
  bio?: string; // Detalles adicionales según tu respuesta del backend
  specialties?: string;
  experience_years?: number;
}

interface GymClass {
  id: string;
  name: string;
  description: string;
  location: string;
  capacity: number;
  current_participants?: number;
  trainer: Trainer | null;
  imgUrl: string;
  schedules: Schedule[];
  created_at?: string;
  update_at?: string;
  }

export default function ClassDetailPage() {
  const PORT = process.env.NEXT_PUBLIC_APP_API_PORT;
  const { id } = useParams();
  const [gymClass, setGymClass] = useState<GymClass | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  
  useEffect(() => {
    const fetchClass = async () => {
      try {
        const response = await fetch(`http://localhost:${PORT}/classes/${id}`);
        if (!response.ok) {
          throw new Error('Clase no encontrada');
        }
        const data: GymClass = await response.json();
        setGymClass(data);
      } catch (error) {
        setError('Hubo un problema al cargar la clase');
      } finally {
        setLoading(false);
      }
    };

    fetchClass();
  }, [id]);

  useEffect(() => {
    AOS.init({});
  }, []);

  const handleScheduleClick = (scheduleId: string) => {
    console.log(`Horario con ID ${scheduleId} clickeado`);
  };

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!gymClass) {
    return <p>Clase no encontrada</p>;
  }

  return (
    <div
      className="flex flex-col justify-center items-center min-h-screen min-w-screen"
      data-aos="fade-right"
    >

      <ActivityDetail
        id={gymClass.id}
        name={gymClass.name}
        description={gymClass.description}
        location={gymClass.location}
        capacity={gymClass.capacity}
        trainerName={gymClass.trainer?.name || 'No asignado'}
        imgUrl={gymClass.imgUrl}
        schedules={gymClass.schedules}
        onScheduleClick={handleScheduleClick}
      />
      {gymClass.schedules.length === 0 && (
        
        <p>No hay horarios disponibles para esta clase.</p>
      )}
      <Reviews class_id={gymClass.id}/>
   </div>
  );
}

