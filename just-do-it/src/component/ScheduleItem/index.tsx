import React from 'react';
import styles from './ActivityDetail.module.css';

interface Schedule {
    id: string;
    day: string;
    startTime: string;
    endTime: string;
    remainingCapacity: number;
    currentParticipants: number;
  }

interface ScheduleItemProps {
  schedule: Schedule;
  isUserBooked: boolean;
  onScheduleSelect: (schedule: Schedule) => void;
  onUnsubscribe: (scheduleId: string) => void;
}

const ScheduleItem: React.FC<ScheduleItemProps> = ({
  schedule,
  isUserBooked,
  onScheduleSelect,
  onUnsubscribe,
}) => {
  return (
    <div className={styles.scheduleItem}>
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
              ? onUnsubscribe(schedule.id)
              : onScheduleSelect(schedule)
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
};

export default ScheduleItem;

