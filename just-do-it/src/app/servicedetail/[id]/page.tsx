"use client"
import { useParams } from 'next/navigation'; 
import { gymClasses } from '@/lib/utils';
import ActivityDetail from '@/component/classDetail';

export default function ClassDetailPage() {
  const { id } = useParams(); // Obtiene el `id` de la URL como parámetro dinámico

  // Busca la clase en el array gymClasses usando el id de la URL
  const gymClass = gymClasses.find((classItem: { id: string }) => classItem.id === id);

  // Si no se encuentra la clase, muestra un mensaje
  if (!gymClass) {
    return <p>Clase no encontrada</p>;
  }

  // Renderiza el componente ActivityDetail con los datos de la clase encontrada
  return (
    <div className="flex justify-center items-center min-h-screen nim-w-screen ">
    <ActivityDetail 
      id={gymClass.id}
      name={gymClass.name}
      description={gymClass.description}
      location={gymClass.location}
      capacity={gymClass.capacity}
      current_participant={gymClass.current_participant}
      trainner={gymClass.trainner}
      img_url={gymClass.img_url}
    />
    </div>
  );
}
