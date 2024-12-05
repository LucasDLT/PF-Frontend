import React, { useState, useEffect } from 'react';
import styles from './ActivityDetail.module.css';
import { useAuth } from '@/context';
import { z } from 'zod';
import { toast } from 'react-hot-toast';

interface Schedule {
  id: string;
  day: string;
  startTime: string;
  endTime: string;
  remainingCapacity: number;
  currentParticipants: number;
}

interface Class {
  name: string;
  schedule: Schedule;
}

interface ScheduledClassApiResponse {
  id: string;
  class: Class;
  schedule: Schedule;
}

interface ActivityDetailProps {
  id: string;
  name: string;
  description: string;
  location: string;
  capacity: number;
  trainerName: string;
  imgUrl: string;
  schedules: Schedule[];
  onScheduleClick?: (scheduleId: string) => void;
  onClassUpdate: () => Promise<void>;
}

const bookingSchema = z.object({
  userId: z.string(),
  classId: z.string(),
  scheduleId: z.string(),
});

const ActivityDetail: React.FC<ActivityDetailProps> = ({
  id,
  name,
  description,
  location,
  capacity,
  trainerName,
  imgUrl,
  schedules,
  onScheduleClick = () => {},
  onClassUpdate,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userBookedSchedules, setUserBookedSchedules] = useState<string[]>([]);
  const [isConfirming, setIsConfirming] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState<Schedule | null>(null);
  const { userSession, token } = useAuth();
  const DOMAIN = process.env.NEXT_PUBLIC_APP_API_DOMAIN;

  useEffect(() => {
    if (userSession) {
      fetchUserBookings();
    }
  }, [userSession, id]);

  const fetchUserBookings = async () => {
    if (!userSession) return;

    try {
      const response = await fetch(
        `${DOMAIN}/booked-classes/user/${userSession.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.ok) {
        const bookedClasses: ScheduledClassApiResponse[] = await response.json();
        const bookedSchedules = bookedClasses
          .filter(booking => booking.class.name === name)
          .map(booking => booking.schedule.id);
        setUserBookedSchedules(bookedSchedules);
      }
    } catch (error) {
      console.error('Error al obtener las clases reservadas:', error);
      toast.error('Error al verificar las inscripciones');
    }
  };

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const handleScheduleSelect = (schedule: Schedule) => {
    setSelectedSchedule(schedule);
    setIsConfirming(true);
  };

  const handleConfirmation = (confirmed: boolean) => {
    if (confirmed && selectedSchedule) {
      if (userBookedSchedules.includes(selectedSchedule.id)) {
        handleUnsubscribe(selectedSchedule.id);
      } else {
        handleInscription(selectedSchedule);
      }
    }
    setIsConfirming(false);
    setSelectedSchedule(null);
  };

  const handleInscription = async (schedule: Schedule) => {
    if (!userSession) {
      toast.error('El usuario no está autenticado.');
      return;
    }

    const payload = {
      userId: userSession.id,
      classId: id,
      scheduleId: schedule.id,
    };

    try {
      bookingSchema.parse(payload);

      const response = await fetch(`${DOMAIN}/booked-classes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Error en la solicitud: ${response.statusText}`);
      }

      setUserBookedSchedules(prev => [...prev, schedule.id]);
      toast.success('Inscripción exitosa');
      await onClassUpdate();
      await fetchUserBookings();
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast.error(
          'Error de validación: ' + error.errors.map(e => e.message).join(', '),
        );
      } else {
        console.error('Error al inscribirse:', error);
        toast.error('Error al inscribirse');
      }
    }
  };

  const handleUnsubscribe = async (scheduleId: string) => {
    if (!userSession) {
      toast.error('El usuario no está autenticado.');
      return;
    }

    try {
      const response = await fetch(`${DOMAIN}/booked-classes/${scheduleId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Error en la solicitud: ${response.statusText}`);
      }

      setUserBookedSchedules(prev => prev.filter(id => id !== scheduleId));
      toast.success('Inscripción cancelada exitosamente');
      await onClassUpdate();
      await fetchUserBookings();
    } catch (error) {
      console.error('Error al cancelar la inscripción:', error);
      toast.error('Error al cancelar la inscripción');
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
              <a
                className={styles.locationLink}
                href={`https://www.google.com/maps?q=${location}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {location}
              </a>
            </p>
            <p className={styles.capacity}>
              <strong>Capacidad total:</strong> {capacity}
            </p>
            <p className={styles.trainer}>
              <strong>Entrenador:</strong> {trainerName}
            </p>

            <button className={styles.button} onClick={toggleModal}>
              Gestionar Inscripciones
            </button>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h2 className={styles.modalTitle}>Selecciona un Horario</h2>
            <div className={styles.scheduleList}>
              {schedules.map(schedule => {
                const isUserBooked = userBookedSchedules.includes(schedule.id);

                return (
                  <div key={schedule.id} className={styles.scheduleItem}>
                    <div className={styles.scheduleInfo}>
                      <h4>{schedule.day}</h4>
                      <p>
                        {schedule.startTime} - {schedule.endTime}
                      </p>
                      <p>Capacidad restante: {schedule.remainingCapacity}</p>
                      <p>Participantes actuales: {schedule.currentParticipants}</p>
                    </div>

                    <div className={styles.scheduleActions}>
                      <button
                        className={styles.button}
                        onClick={() =>
                          isUserBooked
                            ? handleUnsubscribe(schedule.id)
                            : handleScheduleSelect(schedule)
                        }
                        disabled={schedule.remainingCapacity === 0 && !isUserBooked}
                      >
                        {isUserBooked
                          ? 'Cancelar inscripción'
                          : schedule.remainingCapacity === 0
                          ? 'Clase llena'
                          : 'Inscribirme'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className={styles.modalButtons}>
              <button className={styles.cancelBtn} onClick={toggleModal}>
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      {isConfirming && selectedSchedule && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h2 className={styles.modalTitle}>
              {userBookedSchedules.includes(selectedSchedule.id)
                ? 'Confirmar Cancelación'
                : 'Confirmar Inscripción'}
            </h2>
            <p>
              {userBookedSchedules.includes(selectedSchedule.id)
                ? '¿Estás seguro que deseas cancelar tu inscripción en este horario?'
                : '¿Estás seguro que deseas inscribirte en este horario?'}
            </p>
            <div className={styles.modalButtons}>
              <button
                className={styles.confirmBtn}
                onClick={() => handleConfirmation(true)}
              >
                Confirmar
              </button>
              <button
                className={styles.cancelBtn}
                onClick={() => handleConfirmation(false)}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActivityDetail;
