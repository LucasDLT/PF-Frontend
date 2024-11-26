'use client';
import Link from 'next/link';
import {
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import styles from './succes.module.css';
import { useEffect, useState } from 'react';
import { useAuth } from '@/context';
import { log } from 'console';

export default function SubscriptionSuccess() {
  const { setSession, userSession } = useAuth();
  const [paymentStatus, setPaymentStatus] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const PORT = process.env.NEXT_PUBLIC_APP_API_PORT;

  const checkPaymentStatus = async (sessionId: string) => {
    try {
      const response = await fetch(
        `http://localhost:${PORT}/payment/success?session_id=${sessionId}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      const data = await response.json();
      

      if (response.ok) {
        setSession(data.userData);
        setPaymentStatus('success');
      } else {
        setPaymentStatus('error');
        setErrorMessage(
          'Hubo un problema al registrar tu suscripción. Intenta nuevamente.',
        );
      }
    } catch (error) {
      console.error('Error:', error);
      setPaymentStatus('error');
      setErrorMessage('Hubo un error de conexión. Intenta nuevamente.');
    }
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const sessionId = urlParams.get('session_id');

    if (sessionId) {
      checkPaymentStatus(sessionId);
    } else {
      setPaymentStatus('error');
      setErrorMessage('No se pudo completar el pago');
    }
  }, []);

  return (
    <div className={styles.container} data-aos="fade-right">
      <div className={styles.card}>
        <CardHeader>
          <CardTitle className={styles.cardTitle}>
            {paymentStatus === 'success'
              ? '¡Suscripción Exitosa!'
              : 'Error en la Suscripción'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className={styles.cardContent}>
            {paymentStatus === 'success'
              ? 'Gracias por suscribirte. Ahora formas parte de nuestra comunidad.'
              : errorMessage}
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
