'use client';
import Link from 'next/link';
import {
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import styles from './succes.module.css';
import { useEffect } from 'react';
import { useAuth } from '@/context';

export default function SubscriptionSuccess() {
  const { setSession, userSession } = useAuth();
  const PORT = process.env.NEXT_PUBLIC_APP_API_PORT;

  const checkPaymentStatus = async () => {
    if (userSession?.id) {
      try {
        const response = await fetch(
          `http://localhost:${PORT}/users/profile/${userSession?.id}`,

          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );
        const data = await response.json();
        console.log('datos del pago', data);

        if (response.ok) {
          const data = await response.json();
          setSession(data.userData);
        } else {
          console.error('Error registering user');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  // Usamos useEffect para ejecutar la función solo cuando el componente se monta
  useEffect(() => {
    checkPaymentStatus(); // Llamamos la función asincrónica al montar el componente
  }, [userSession]); // Dependemos de userSession para ejecutarse correctamente

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
