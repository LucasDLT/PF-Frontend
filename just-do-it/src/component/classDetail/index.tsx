import React, { useState } from 'react';
import styles from './ActivityDetail.module.css';
import { useAuth } from '@/context';

interface Schedule {
  id: string;
  day: string;
  startTime: string;
  endTime: string;
  remainingCapacity: number;
  currentParticipants: number;
}

interface ActivityDetailProps {
  id: string;
  name: string;
  description: string;
  location: string; // Ahora location es un string
  capacity: number;
  trainerName: string; 
  imgUrl: string;
  schedules: Schedule[];
  onScheduleClick: (scheduleId: string) => void;
}

const ActivityDetail: React.FC<ActivityDetailProps> = ({
  id,
  name,
  description,
  location,
  capacity,
  trainerName,
  imgUrl,
  schedules,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState<Schedule | null>(null);
  const { userSession, token } = useAuth();
  const DOMAIN = process.env.NEXT_PUBLIC_APP_API_DOMAIN;

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleScheduleSelect = (schedule: Schedule) => {
    setSelectedSchedule(schedule);
  };

  const handleInscription = async () => {
    if (!selectedSchedule || !userSession) {
      console.error('No hay horario seleccionado o el usuario no está autenticado.');
      return;
    }

    const payload = {
      userId: userSession.id, 
      classId: id,
      scheduleId: selectedSchedule.id, 
    };

    try {
      const response = await fetch(`${DOMAIN}/booked-classes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Error en la solicitud: ${response.statusText}`);
      }

      window.alert('Inscripción exitosa:');
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error al realizar la inscripción:', error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.cardContent}>
          <div className={styles.leftSection}>
            <img src={imgUrl} alt={name} className={styles.image} />
          </div>
          <div className={styles.rightSection}>
            <h1 className={styles.title}>{name}</h1>
            <p className={styles.description}>{description}</p>
            <p className={styles.location}>
              <strong>Ubicación: </strong>
              {/* Aquí envolvemos la ubicación en un enlace */}
              <a className={styles.locationLink} href={`https://www.google.com/maps?q=${location}`} target="_blank" rel="noopener noreferrer">
                {location}
              </a>
            </p>
            <p className={styles.capacity}><strong>Capacidad total:</strong> {capacity}</p>
            <p className={styles.trainer}><strong>Entrenador:</strong> {trainerName}</p>

            <button className={styles.button} onClick={toggleModal}>
              Agendar Clase
            </button>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h2 className={styles.modalTitle}>Selecciona un Horario</h2>
            {schedules.map((schedule) => (
              <div key={schedule.id} className={styles.scheduleItem}>
                <h4>{schedule.day}</h4>
                <p>{schedule.startTime} - {schedule.endTime}</p>
                <p>Capacidad restante: {schedule.remainingCapacity}</p>
                <p>Participantes actuales: {schedule.currentParticipants}</p>
                <button
                  className={styles.button}
                  onClick={() => handleScheduleSelect(schedule)}
                >
                  Inscribirme a este horario
                </button>
              </div>
            ))}

            <div className={styles.modalButtons}>
              <button className={styles.cancelBtn} onClick={toggleModal}>
                Cancelar
              </button>
              {selectedSchedule && (
                <button className={styles.confirmBtn} onClick={handleInscription}>
                  Inscribirme
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActivityDetail;
