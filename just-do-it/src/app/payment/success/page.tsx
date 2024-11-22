'use client';
import Link from 'next/link';
import AOS from 'aos';
import { Button } from '@/components/ui/button';
import {
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import styles from './succes.module.css';
import { useEffect } from 'react';

export default function SubscriptionSuccess() {
  useEffect(() => {
    AOS.init({});
  }, []);

  return (
    <div className={styles.container} data-aos="fade-right">
      <div className={styles.card}>
        <CardHeader>
          <CardTitle className={styles.cardTitle}>
            ¡Suscripción Exitosa!
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className={styles.cardContent}>
            Gracias por suscribirte. Ahora formas parte de nuestra comunidad.
          </p>
        </CardContent>
        <CardFooter className={styles.cardFooter}>
          <button className={styles.button}>
            <Link href="/">Volver a la página principal</Link>
          </button>
        </CardFooter>
      </div>
    </div>
  );
}
