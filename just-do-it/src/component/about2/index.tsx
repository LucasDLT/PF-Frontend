import React from 'react'
import styles from './about2.module.css'
export default function About2() {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.headerText}>
            Sobre Nosotros
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
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna. 
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            </div>
          </div>
  
        </div>
      </div>
    )
  }