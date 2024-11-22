'use client';
import Link from 'next/link';
import AOS from 'aos';
import {
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import styles from './error.module.css';
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
            ¡Ups, ha ocurrido un error!
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className={styles.cardContent}>
            No fue posible procesar el pago. Verifique sus datos e intente de
            nuevo.
          </p>
        </CardContent>
        <CardFooter className={styles.cardFooter}>
          <div className={styles.buttonContainer} >
            <button className={styles.button}>
              <Link href="/">página principal</Link>
            </button>
            <button className={styles.button}>
              <Link href="/memberships">suscripciones</Link>
            </button>
          </div>
        </CardFooter>
      </div>
    </div>
  );
}
