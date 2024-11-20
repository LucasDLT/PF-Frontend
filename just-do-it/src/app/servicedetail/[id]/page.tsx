"use client"
import { useParams } from 'next/navigation'; 
import { gymClasses } from '@/lib/utils';
import ActivityDetail from '@/component/classDetail';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';

export default function ClassDetailPage() {
  const { id } = useParams(); 


  const gymClass = gymClasses.find((classItem: { id: string }) => classItem.id === id);

  
  if (!gymClass) {
    return <p>Clase no encontrada</p>;
  }

 
  useEffect(() => {
    AOS.init({});
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen min-w-screen" 
   
    data-aos="fade-right"
>
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
