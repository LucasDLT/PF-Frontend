'use client'

import { useEffect, useState } from 'react';
import { useAuth } from '@/context';
import { Loader2 } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function LoadingView() {
  const PORT = process.env.NEXT_PUBLIC_APP_API_PORT;
  const { setToken, setSession } = useAuth();
  const { data: session } = useSession();
  const Router = useRouter();

  const [isRegistered, setIsRegistered] = useState(false); // Estado para evitar re-registros

  useEffect(() => {
    const registerUser = async () => {
      if (session && session.user && !isRegistered) { // Solo ejecutar si no se ha registrado
        try {
          const response = await fetch(`http://localhost:${PORT}/auth/signup/third/`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              name: session.user.name,
              email: session.user.email,
              image: session.user.image,
            }),
          });

          if (response.ok) {
            const data = await response.json();
            setSession(data.userData);
            setToken(data.token);
            setIsRegistered(true); // Marcar como registrado para evitar el bucle
            Router.push("/");
          } else {
            console.error('Error registering user');
          }
        } catch (error) {
          console.error('Error:', error);
        }
      }
    };

    if (session && session.user && !isRegistered) {
      registerUser();
    }
  }, [session, PORT, setToken, setSession, isRegistered, Router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded-lg shadow-md">
        <Loader2 className="w-12 h-12 text-blue-500 animate-spin" aria-hidden="true" />
        <p className="mt-4 text-lg font-semibold text-gray-700" aria-live="polite">Cargando...</p>
      </div>
    </div>
  );
}
