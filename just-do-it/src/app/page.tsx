'use client'
import ActivityCarousel from "@/component/activity-carousel";
import { Navbar } from "@/component/navbar-landing";
import Footer from "@/component/footer";
import Link from "next/link";
import styles from './page.module.css'; // Importar el archivo de estilos

export const Home: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.hero}>
        <div className={styles.heroTextWrapper}>
          <span className={`${styles.heroText} ${styles.heroTextYellow}`}>
            AGENDA TU SESIÓN{" "}
          </span>
          <span className={`${styles.heroText} ${styles.heroTextYellow}`}>
            GRATUITA
          </span>
          <span className={styles.heroText}> HOY</span>
          <div className={styles.heroButton}>
            <Link href="/planes" className={styles.heroButtonLink}>
              INSCRIBETE
            </Link>
          </div>
        </div>
        <Navbar />
      </div>

      <ActivityCarousel />

    </div>
  );
};

export default Home;
