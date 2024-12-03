import { MapPin, User, Calendar } from 'lucide-react';
import styles from './ClassPreview.module.css';

interface ClassPreviewProps {
  classData: {
    name: string;
    description: string;
    image: string;
    location: string;
    trainerId: string | null;
    schedules: { day: string; startTime: string; endTime: string }[];
    capacity: number;
  };
}

export function ClassPreview({ classData }: ClassPreviewProps) {
  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <h3 className={styles.cardTitle}>{classData.name}</h3>
        <p className={styles.cardDescription}>{classData.description}</p>
      </div>
      <div className={styles.cardContent}>
        {classData.image && (
          <img src={classData.image} alt={classData.name} className={styles.cardImage} />
        )}
        <div className={styles.flexRow}>
          <MapPin className={styles.icon} />
          <a
            href={`https://www.google.com/maps/search/?q=${encodeURIComponent(classData.location)}`}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.locationLink}
          >
            <span>{classData.location}</span>
          </a>
        </div>
        <div className={styles.flexRow}>
          <User className={styles.icon} />
          <span>{classData.trainerId || 'No asignado'}</span>
        </div>
        <div className={styles.flexRow}>
          <Calendar className={styles.icon} />
          <span>
            {classData.schedules.length > 0
              ? classData.schedules.map((slot, index) => (
                  <div key={index}>
                    {slot.day}, {slot.startTime} - {slot.endTime}
                  </div>
                ))
              : 'No hay horarios seleccionados'}
          </span>
        </div>
      </div>
      <div className={styles.cardFooter}>
        <p>Capacidad máxima: {classData.capacity} estudiantes</p>
      </div>
    </div>
  );
}
