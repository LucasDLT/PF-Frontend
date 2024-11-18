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
            <span>LOS PROGRAMAS FITNESS EN </span>
            <span className={styles.highlightText}>JUST DO IT</span>
          </div>
          
          <div data-aos="fade-right">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna. 
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
          </div>
        </div>
        
        <img className={styles.image} src="/fitness-hours.png" alt="Fitness Hour" />

      </div>
    </div>
  )
}