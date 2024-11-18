import React from 'react'
import styles from './about2.module.css'
export default function About2() {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.headerText}>
            Por que elegirnos
          </div>
        </div>
  
        <div className={styles.contentWrapper}>
          <img className={styles.image} src="/about-2.jpg" alt="about2" />
          <div className={styles.textWrapper}>
            <div className={styles.titleText}>
              <span>LOS PROGRAMAS FITNESS EN </span>
              <span className={styles.highlightText}>JUST DO IT</span>
            </div>
            
            <div data-aos="fade-left">
            En nuestro gimnasio, tu bienestar es nuestra prioridad. No somos solo un lugar para entrenar, somos una comunidad dedicada a ayudarte a alcanzar tus objetivos.

Lo que nos hace diferentes:
Equipamiento moderno y áreas diseñadas para todo tipo de entrenamiento.
Planes personalizados adaptados a tus metas y necesidades.
Horarios flexibles que se ajustan a tu estilo de vida.
Clases grupales dinámicas como yoga, spinning y HIIT.
Asesoría integral para equilibrar tu entrenamiento con una buena alimentación.
Ven y empieza a construir una mejor versión de ti mismo hoy mismo! 💪
            </div>
          </div>
  
        </div>
      </div>
    )
  }