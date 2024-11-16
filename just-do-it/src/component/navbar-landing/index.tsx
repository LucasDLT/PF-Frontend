'use client';
import Link from 'next/link';
import { RiLoginBoxLine } from 'react-icons/ri';
import styles from './navlanding.module.css';  // Importar el archivo CSS Module

export const Navbar: React.FC = () => {
  return (
    <nav className={styles.navbar}>
      <ul className={styles.navList}>
        <li className={styles.navItem}>
          <Link href={'/'}>INICIO</Link>
        </li>
        <li className={styles.navItem}>
          <Link href={'/location'}>SEDES</Link>
        </li>
        <li className={styles.navItem}>
          <Link href={'/services'}>SERVICIOS</Link>
        </li>
        <li className={styles.navItem}>
          <Link href={'/planes'}>PLANES</Link>
        </li>
        <li className={styles.navItem}>
          <Link href={'/contacto'}>CONTÁCTANOS</Link>
        </li>
      </ul>
        <div className={styles.iconLink}>
          <Link href={'/login'}>
            <RiLoginBoxLine />
          </Link>
        </div>
    </nav>
  );
};
