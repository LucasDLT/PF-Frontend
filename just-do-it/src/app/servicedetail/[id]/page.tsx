"use client";
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import ActivityDetail from '@/component/classDetail';
import AOS from 'aos';
import 'aos/dist/aos.css';

// Define la interfaz para la clase de gimnasio
interface GymClass {
  id: string;
  name: string;
  description: string;
  location: string;
  capacity: number;
  current_participants: number;
  trainerName: string;
  imgUrl: string;
  schedule: string; 
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
      } catch (err) {
        // Asegúrate de pasar un mensaje de error aquí
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
    <div className="flex justify-center items-center min-h-screen min-w-screen" data-aos="fade-right">
      <ActivityDetail 
        id={gymClass.id}
        name={gymClass.name}
        description={gymClass.description}
        location={gymClass.location}
        capacity={gymClass.capacity}
        current_participants={gymClass.current_participants}
        trainerName={gymClass.trainerName}
        imgUrl={gymClass.imgUrl}
        schedule={gymClass.schedule}
      />
    </div>
  );
}
