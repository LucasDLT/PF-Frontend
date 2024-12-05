'use client';

import styles from './footer.module.css'; 
import Link from 'next/link'; // Importamos Link para el enrutamiento interno

export default function Footer() {
  return (
    <div className={styles.footer}>
      <div className={styles.footerContainer}>
        <div className={styles.footerColumn}>
          <Link href="/Devs" className={styles.footerLink}>Nuestros Desarrolladores</Link> {/* Enlace interno para la página de desarrolladores */}
        
        </div>

        <div className={styles.footerColumn}>
          <div className={styles.footerLink}>Contactanos</div>
          <div className={styles.footerLink}>+54(261)5485145</div>
          <div className={styles.footerLink}>jusdoitgym@gmail.com</div>
        </div>

        <div className={styles.footerColumn}>
          <a href="https://www.google.com.ar/maps/place/Gimnasio+Do+It!/@37.1706154,-3.604124,17z/data=!3m1!4b1!4m6!3m5!1s0xd71fc96282d3239:0x963ffacecfa270c!8m2!3d37.1706154!4d-3.6015491!16s%2Fg%2F11xg0j71p?entry=ttu&g_ep=EgoyMDI0MTIwMy4wIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noopener noreferrer" className={styles.footerLink}>
            Conoce nuestra ubicación
          </a> 
        </div>
      </div>
      <p className={styles.footerTitle}>&copy; 2025 Todos los derechos reservados. Página desarrollada por el grupo nro 2 PF Henry</p>
    </div>
  );
}
