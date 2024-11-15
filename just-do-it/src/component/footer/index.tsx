'use client';

import styles from './footer.module.css'; 

export default function Footer() {
  return (
    <div className={styles.footer}>
      <div className={styles.footerContainer}>
        <div className={styles.footerColumn}>
          <div className={styles.footerLink}>Contactanos</div>
          <div className={styles.footerLink}>Nuestros Desarrolladores</div>
          <div className={styles.footerLink}>Nuestras Redes</div>
          <div className={styles.footerLink}>Nuestras sedes</div>
        </div>

        <div className={styles.footerColumn}>
          <div className={styles.footerLink}>+54(000)000-000</div>
          <div className={styles.footerLink}>Example@gmail.com</div>
        </div>

        <div className={styles.footerColumn}>
          <div className={styles.footerLink}>Street 123</div>
          <div className={styles.footerLink}>Street 122</div>
        </div>
      </div>
      <p className={styles.footerTitle}>&copy; 2025 Todos los derechos reservados. Página desarrolada por el grupo nro 2 PF Henry</p>
    </div>
  );
}
