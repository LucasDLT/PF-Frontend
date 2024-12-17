'use client';
import ActivityCarousel from '@/component/activity-carousel';
import { Navbar } from '@/component/navbar-landing';
import Link from 'next/link';
import styles from './page.module.css';
import HoursAttention from '@/component/hours-attention';
import About from '@/component/about';
import About2 from '@/component/about2';

const Home: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.hero}>
        <div className={styles.heroTextWrapper}>
          <h1 className={styles.heroText}>
            <span className={styles.heroTextYellow}>AGENDA TU SESIÓN </span>
            <span className={styles.heroTextYellow}>GRATUITA</span>
            <span> HOY</span>
          </h1>
          <Link href={'/memberships'}>
            <div className={styles.heroButton}>INSCRIBETE</div>
          </Link>
        </div>
        <Navbar />
      </div>

      <ActivityCarousel />
      <HoursAttention />
      <About />
      <About2 />
    </div>
  );
};

export default Home;

