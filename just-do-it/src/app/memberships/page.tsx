'use client';
import { useEffect, useState } from 'react';
import AOS from 'aos';
import { Membership } from '@/types/membership';
import styles from './membership.module.css';
import { useAuth } from '@/context';

export default function MembershipsPage() {
  const PORT = process.env.NEXT_PUBLIC_APP_API_PORT;
  const [memberships, setMemberships] = useState<Membership[]>([]);
  const { userSession } = useAuth();

  useEffect(() => {
    const fetchMemberships = async () => {
      try {
        AOS.init();
        const response = await fetch(`http://localhost:${PORT}/memberships`, {
          method: 'GET',
        });
        const data = await response.json();
        setMemberships(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchMemberships();
  }, [PORT]);

  const handleClick = async (membershipId: string) => {
    const userData = {
      id: userSession?.id,
      name: userSession?.name,
      email: userSession?.email,
    };

    try {
      const response = await fetch(`http://localhost:${PORT}/payments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userData,
          membershipId,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Membresía seleccionada exitosamente', result);
      } else {
        console.error('Error al seleccionar la membresía');
      }
    } catch (error) {
      console.error('Error en la solicitud POST:', error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.cardContainer}>
        <h1 className={styles.title}>
          Selecciona el tipo de membresia que se ajuste a tus requerimientos
        </h1>
        {memberships.map((membership) => (
          <div key={membership.id} className={styles.card}>
            <h2>{membership.name}</h2>
            <p className={styles.cardPrice}>Precio: Us$ {membership.price}</p>
            <p>Duracion de: {membership.duration} dias</p>
            <p>Contaras con: {membership.description}</p>
            <button
              onClick={() => handleClick(membership.id)}
              className={styles.cardButton}
            >
              Seleccionar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
