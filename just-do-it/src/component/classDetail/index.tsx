import React, { useState } from 'react';
import styles from './ActivityDetail.module.css';

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
  location: string;
  capacity: number;
  trainerName: string;  // Ya no se necesita trainerId
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
  onScheduleClick,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState<Schedule | null>(null);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleScheduleSelect = (schedule: Schedule) => {
    setSelectedSchedule(schedule);
  };

  const handleInscription = () => {
    if (selectedSchedule) {
      console.log(`Inscripción confirmada para el horario: ${selectedSchedule.id}`);
      setIsModalOpen(false); // Cerrar el modal después de la inscripción
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
            <p className={styles.location}><strong>Ubicación:</strong> {location}</p>
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
                <button className={styles.button} onClick={() => handleScheduleSelect(schedule)}>
                  Inscribirme a este horario
                </button>
              </div>
            ))}

            <div className={styles.modalButtons}>
              <button className={styles.cancelBtn} onClick={toggleModal}>Cancelar</button>
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
