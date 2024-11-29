import { MapPin, User, Calendar } from 'lucide-react';
import styles from './ClassPreview.module.css';  // Importa el CSS Module

interface ClassPreviewProps {
  classData: {
    name: string;
    description: string;
    image: string;
    location: string;
    trainerId: string;
    schedule: { day: string; startTime: string; endTime: string }[]; // Correcto aquí
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
          {/* Enlace a Google Maps */}
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
          {/* Aquí mapeamos schedule para mostrar el día y los horarios */}
          <span>
            {classData.schedule.length > 0
              ? classData.schedule.map((slot, index) => (
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
