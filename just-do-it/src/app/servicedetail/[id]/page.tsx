"use client"
import { useParams } from 'next/navigation'; 
import { gymClasses } from '@/lib/utils';
import ActivityDetail from '@/component/classDetail';

export default function ClassDetailPage() {
  const { id } = useParams(); 


  const gymClass = gymClasses.find((classItem: { id: string }) => classItem.id === id);

  
  if (!gymClass) {
    return <p>Clase no encontrada</p>;
  }

 
  return (
    <div className="flex justify-center items-center min-h-screen min-w-screen ">
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
