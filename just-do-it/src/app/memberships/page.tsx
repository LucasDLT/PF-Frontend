'use client';
import { useEffect, useState } from 'react';
import { Membership } from '@/types/membership';
import styles from './membership.module.css';
import { useAuth } from '@/context';
import { Fade } from 'react-awesome-reveal';

export default function MembershipsPage() {
  const PORT = process.env.NEXT_PUBLIC_APP_API_PORT;
  const DOMAIN= process.env.NEXT_PUBLIC_APP_API_DOMAIN
  const API_URL = `${process.env.NEXT_PUBLIC_APP_API_DOMAIN}:${process.env.NEXT_PUBLIC_APP_API_PORT}`;

  const [memberships, setMemberships] = useState<Membership[]>([]);
  const { userSession , token } = useAuth();

  useEffect(() => {
    const fetchMemberships = async () => {
      try {
        const response = await fetch(`${DOMAIN}/memberships`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error(`Error fetching memberships: ${response.statusText}`);
        }
        const data = await response.json();
        setMemberships(data);
        console.log('Data que llega de membresias:', data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchMemberships();
  }, [PORT]);

  const handleClick = async (stripePriceId: string) => {
    if (!userSession?.name || !userSession?.email) {
      console.error(
        'La sesión del usuario está incompleta. Nombre o correo no definidos.',
      );
      return;
    }

    const userData = {
      userEmail: userSession?.email,
      userName: userSession?.name,
      stripePriceId: stripePriceId,
    };

    console.log('Datos a enviar al backend:', userData);

    try {
      const response = await fetch(
        `${DOMAIN}/payment/create-customer`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(userData),
        },
      );
      console.log(token);
      
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error en la solicitud POST Para crear Comprador:!!!!!', errorText);
        
        throw new Error(`Error al crear la membresía: ${response.statusText}`);
      }
      
      const result = await response.json();
      console.log('Membresía seleccionada exitosamente', result);
      console.log('respuesta del back',result);

      if (result?.sessionUrl) {
        console.log('Redirigiendo a Stripe Checkout:', result.sessionUrl);

        window.location.href = result.sessionUrl;
      } else {
        console.error('La respuesta no contiene la URL de checkout');
      }
    } catch (error) {
      console.error('Error en la solicitud POST:', error);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        Selecciona el tipo de membresía que se ajuste a tus requerimientos
      </h1>
      <Fade>
        <div className={styles.cardContainer}>
          {memberships.map((membership) => (
            <div key={membership.id} className={styles.card}>
              <h2>{membership.name}</h2>
              <p className={styles.cardPrice}>Us$ {membership.price}</p>
              <p>DURACION DE: {membership.duration} días</p>
              <p>CONTARAS CON: {membership.description}</p>
              <button
                onClick={() => handleClick(membership.stripePriceId)}
                className={styles.cardButton}
              >
                Seleccionar
              </button>
            </div>
          ))}
        </div>
      </Fade>
    </div>
  );
}
