'use client'
import AOS from 'aos';
import styles from './about.module.css';  
import 'aos/dist/aos.css';
import { use, useEffect } from 'react';
export default function About() {

  useEffect(() => {
    AOS.init({});
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerText}>
          Sobre Nosotros
        </div>
      </div>

      <div className={styles.contentWrapper}>
        <div className={styles.textWrapper}>
          <div className={styles.titleText}>
            <span> EN </span>
            <span className={styles.highlightText}>JUST DO IT</span>
          </div>
          
          <div data-aos="fade-right">
          creemos que cada paso cuenta hacia una vida más activa y saludable. Somos más que un gimnasio: somos un espacio donde la motivación, el esfuerzo y los resultados se encuentran.

Nuestra misión es inspirarte a superar tus límites, ofreciendo un ambiente acogedor, equipamiento de última generación y un equipo de profesionales comprometidos con tu éxito. Ya sea que estés comenzando tu viaje fitness o buscando alcanzar nuevas metas, estamos aquí para acompañarte en cada etapa.

En Just Do It, tu meta es nuestra inspiración. 💪
          </div>
        </div>
        
        <img className={styles.image} src="/fitness-hours.png" alt="Fitness Hour" />

      </div>
    </div>
  )
}