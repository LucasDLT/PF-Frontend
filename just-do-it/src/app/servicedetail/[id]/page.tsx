'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAuth } from '@/context';
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
  bio?: string; 
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
  bookedClasses?: any[];
  reviews: ReviewProps[];
}
export interface ReviewProps {
  user_id: string;
  comment: string | undefined;
  rating: number | undefined;
  class_id: string | undefined;
  onSubmitRating: (rating: number, reviewText: string) => void;
}

export default function ClassDetailPage() {
  const PORT = process.env.NEXT_PUBLIC_APP_API_PORT;
  const DOMAIN = process.env.NEXT_PUBLIC_APP_API_DOMAIN;
  const API_URL = `${process.env.NEXT_PUBLIC_APP_API_DOMAIN}:${process.env.NEXT_PUBLIC_APP_API_PORT}`;

  const { id } = useParams();
  const [gymClass, setGymClass] = useState<GymClass | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { userSession , token } = useAuth();

  const membershipStatus = userSession?.membership_status;

  const onSubmitRating = async (rating: number, reviewText: string) => {
    if (!userSession?.id) {
      alert('No estás autenticado');
      return;
    }

    console.log('Datos a enviar:');
    console.log('Rating:', rating);
    console.log('Review Text:', reviewText);
    console.log('User ID:', userSession.id);
    console.log('Class ID:', id);

    try {
      const response = await fetch(`${API_URL}/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          rating,
          comment: reviewText,
          user_id: userSession.id,
          class_id: id,
        }),
      });

      console.log('Respuesta de la API:', response);

      if (!response.ok) {
        const errorDetails = await response.text();
        console.error('Error al enviar la reseña:', errorDetails);
        throw new Error('Error al enviar la reseña');
      }

      console.log('Reseña enviada exitosamente');

      setGymClass(prev => {
        if (!prev) return prev;
        return {
          ...prev,
          reviews: [
            ...(prev.reviews ?? []),
            {
              rating,
              comment: reviewText,
              user_id: userSession.id ?? '',
              class_id: id,
            },
          ] as ReviewProps[],
        };
      });
    } catch (error) {
      console.error('Error al enviar la reseña:', error);
    }
  };

  useEffect(() => {
    const fetchClass = async () => {
      try {
        const response = await fetch(`${API_URL}/classes/${id}`);
        
        if (!response.ok) {
          throw new Error('Clase no encontrada');
        }
        const data: GymClass = await response.json();
        setGymClass(data);
      } catch (error) {
        setError(error as string);
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
      <Reviews
        reviews={gymClass.reviews}
        onSubmitRating={onSubmitRating}
        membershipStatus={membershipStatus}
      />
    </div>
  );
}
