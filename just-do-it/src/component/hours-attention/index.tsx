import styles from "./hours-attenntion.module.css"

export default function HoursAttention() {
    return (
<div className={styles.container}>
    <h1 className={styles.title}> Horarios de Atencion</h1>
      <div className={styles.scheduleBox}>
        <div className={styles.daysColumn}>
          <div>Domingo</div>
          <div>Lunes</div>
          <div>Martes</div>
          <div>Miércoles</div>
          <div>Jueves</div>
          <div>Viernes</div>
          <div>Sábado</div>
        </div>
        <div className={styles.hoursColumn}>
          <div>Cerrado</div>
          <div>08:00 - 22:00</div>
          <div>08:00 - 22:00</div>
          <div>08:00 - 22:00</div>
          <div>08:00 - 22:00</div>
          <div>08:00 - 22:00</div>
          <div>Cerrado</div>
        </div>
        <div className={styles.hoursColumn}>
          <div>Cerrado</div>
          <div>22:00</div>
          <div>22:00</div>
          <div>22:00</div>
          <div>22:00</div>
          <div>22:00</div>
          <div>Cerrado</div>
        </div>
      </div>
    </div>

    )
}