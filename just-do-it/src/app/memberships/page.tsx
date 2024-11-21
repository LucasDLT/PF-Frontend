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
    // Verificar si los datos de la sesión del usuario están correctamente definidos
    if (!userSession?.name || !userSession?.email) {
      console.error('La sesión del usuario está incompleta. Nombre o correo no definidos.');
      return;
    }

    const userData = {
      userEmail: userSession?.email,
      userName: userSession?.name,
      stripePriceId: stripePriceId,
    };

    console.log('Datos a enviar al backend:', userData); 

    try {
      const response = await fetch(`http://localhost:${PORT}/payment/create-customer`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify( userData ),
      });

      console.log(response);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error en la solicitud POST:', errorText); 

        throw new Error(`Error al crear la membresía: ${response.statusText}`);
      }

      const result = await response.json();
      console.log('Membresía seleccionada exitosamente', result);
      
      if (result?.url) {
        console.log('Redirigiendo a Stripe Checkout:', result.url);
        
        window.location.href = result.url; 
      } else {
        console.error('La respuesta no contiene la URL de checkout');
      }

    } catch (error) {
      console.error('Error en la solicitud POST:', error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.cardContainer}>
        <h1 className={styles.title}>
          Selecciona el tipo de membresía que se ajuste a tus requerimientos
        </h1>
        {memberships.map((membership) => (
          <div key={membership.id} className={styles.card}>
            <h2>{membership.name}</h2>
            <p className={styles.cardPrice}>Precio: Us$ {membership.price}</p>
            <p>Duración de: {membership.duration} días</p>
            <p>Contarás con: {membership.description}</p>
            <button
              onClick={() => handleClick(membership.stripePriceId)}
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
