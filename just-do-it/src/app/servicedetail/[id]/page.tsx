'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAuth } from '@/context';
import ActivityDetail from '@/component/classDetail';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Reviews from '@/component/reviews';
import { toast, Toaster } from 'react-hot-toast';

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
  const API_URL = `${DOMAIN}:${PORT}`;

  const { id } = useParams();
  const [gymClass, setGymClass] = useState<GymClass | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { userSession, token } = useAuth();

  const [placeName, setPlaceName] = useState<string>('');
  const membershipStatus = userSession?.membership_status;

  const fetchPlaceName = async (coordinates: string) => {
    const [lat, lng] = coordinates.split(',');
    const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${API_KEY}`
      );
      const data = await response.json();

      if (data.results && data.results.length > 0) {
        setPlaceName(data.results[0].formatted_address);
      } else {
        setPlaceName('Ubicación desconocida');
      }
    } catch (err) {
      console.error('Error al obtener el nombre del lugar:', err);
      setPlaceName('Error al cargar la ubicación');
    }
  };

  const onSubmitRating = async (rating: number, reviewText: string) => {
    if (!userSession?.id) {
      toast.error('No estás autenticado');
      return;
    }

    try {
      const response = await fetch(`${DOMAIN}/reviews`, {
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

      if (!response.ok) {
        const errorDetails = await response.text();
        throw new Error(errorDetails);
      }

      setGymClass((prev) => {
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
      toast.success('Reseña enviada con éxito');
    } catch (error) {
      console.error('Error al enviar la reseña:', error);
      toast.error('Error al enviar la reseña');
    }
  };

  const fetchClassData = async () => {
    try {
      const response = await fetch(`${DOMAIN}/classes/${id}`);
      if (!response.ok) {
        throw new Error('Clase no encontrada');
      }
      const data: GymClass = await response.json();
      setGymClass(data);

      if (data.location) {
        await fetchPlaceName(data.location);
      }
    } catch (error) {
      setError((error as Error).message);
      toast.error('Error al cargar los datos de la clase');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClassData();
  }, [id]);

  useEffect(() => {
    AOS.init({});
  }, []);

  const handleClassUpdate = async () => {
    try {
      const response = await fetch(`${DOMAIN}/classes/${id}`);
      if (!response.ok) {
        throw new Error('Clase no encontrada');
      }
      const data: GymClass = await response.json();
      setGymClass(data);

      if (data.location) {
        await fetchPlaceName(data.location);
      }
    } catch (error) {
      console.error('Error al actualizar los datos de la clase:', error);
      toast.error('Error al actualizar la información de la clase');
    }
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

  const googleMapsUrl = `https://www.google.com/maps?q=${gymClass.location}`;

  return (
    <div
      className="flex flex-col justify-center items-center min-h-screen min-w-screen"
      data-aos="fade-right"
    >
      <ActivityDetail
        id={gymClass.id}
        name={gymClass.name}
        description={gymClass.description}
        location={placeName ? placeName : 'Ubicación no disponible'}
        capacity={gymClass.capacity}
        trainerName={gymClass.trainer?.name || 'No asignado'}
        imgUrl={gymClass.imgUrl}
        schedules={gymClass.schedules}
        onClassUpdate={handleClassUpdate}
        onScheduleClick={(scheduleId) => console.log(`Horario seleccionado: ${scheduleId}`)}
      />
      {gymClass.schedules.length === 0 && (
        <p>No hay horarios disponibles para esta clase.</p>
      )}
      <Reviews
        reviews={gymClass.reviews}
        onSubmitRating={onSubmitRating}
        membershipStatus={membershipStatus}
      />
      <Toaster />
    </div>
  );
}

