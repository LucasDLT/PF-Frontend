'use client'

import React from 'react'
import styles from './ActivityDetail.module.css'  // Importamos el archivo CSS Module
import { Class } from '@/types/class'

export default function ActivityDetail({ id, name, description, location, capacity, trainner, img_url }: Class) {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.cardContent}>
          <div className={styles.leftSection}>
            <img className="h-36 w-full object-cover" src={img_url} alt={name} />
          </div>

          <div className={styles.rightSection}>
            <h2 className={styles.title}>{name}</h2>
            <p className={styles.description}>Descripcion</p>
            <p className={styles.description}>{description}</p>
            <p className={styles.description}>Ubicacion</p>
            <p className={styles.location}>{location}</p>
            <p className={styles.trainer}>Entrenador : {trainner}</p>

            <div className={styles.capacity}>
              <span>Capacidad: {capacity} personas por turno</span>
            </div>

            <div className="mt-6">
              <button className={styles.button}>Agenda tu clase</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
