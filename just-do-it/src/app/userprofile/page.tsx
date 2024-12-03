'use client';
import { useEffect, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Mail,
  MapPin,
  Phone,
  Edit,
  Globe,
  CheckCircle,
  XCircle,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context';
import Link from 'next/link';
import { ScheduledClasses } from '@/component/sheduleClass'; // Asegúrate de que este componente reciba las props adecuadas
import styles from './perfilusuario.module.css';

interface Schedule {
  day: string;
  startTime: string;
  endTime: string;
}

interface Class {
  name: string;
  schedule: Schedule;
}

interface ScheduledClassApiResponse {
  id: string;
  class: Class;
  schedule: Schedule;
}

export default function PerfilUsuario() {
  const router = useRouter();
  const PORT = process.env.NEXT_PUBLIC_APP_API_PORT;
  const DOMAIN = process.env.NEXT_PUBLIC_APP_API_DOMAIN;
  const API_URL = `${DOMAIN}:${PORT}`;
  const { userSession, token } = useAuth();

  // Usar la interfaz en el estado para las clases programadas
  const [scheduledClasses, setScheduledClasses] = useState<ScheduledClassApiResponse[]>([]);

  useEffect(() => {
    const fetchScheduledClasses = async () => {
      try {
        console.log("Fetching scheduled classes...");
        const response = await fetch(
          `${DOMAIN}/booked-classes/user/${userSession.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("Response status:", response.status);
        
        if (!response.ok) {
          throw new Error('Error al obtener los datos de clases programadas');
        }

        const data: ScheduledClassApiResponse[] = await response.json();
        console.log("Scheduled classes data:", data);

        // Guardar los datos en el estado
        setScheduledClasses(data);
      } catch (error) {
        console.error("Error fetching scheduled classes:", error);
      }
    };

    if (userSession?.id) {
      fetchScheduledClasses();
    }
  }, [userSession?.id, token]);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.title}>Perfil de Usuario</h1>
          <Button
            onClick={() => router.push('/userprofile-edit')}
            className={styles.editButton}
          >
            <Edit className="mr-2 h-4 w-4" /> Editar Perfil
          </Button>
        </div>
      </header>

      <main className={styles.main}>
        <Card className={styles.card}>
          <CardHeader>
            <CardTitle className="sr-only">Información del Usuario</CardTitle>
          </CardHeader>
          <CardContent>
            <div className={styles.avatarContainer}>
              <Avatar className={styles.avatar}>
                <AvatarImage
                  alt="Foto de perfil"
                  src={userSession?.image || '/default-avatar.png'}
                />
                <AvatarFallback>
                  {userSession.name?.charAt(0) || 'U'}
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-2xl font-bold">{userSession.name}</h2>
                <p className="text-gray-500">@{userSession.email}</p>
              </div>
            </div>
            <div className={styles.infoContainer}>
              {[{ icon: Mail, label: 'Email', value: userSession.email }, { icon: Phone, label: 'Teléfono', value: userSession.phone }, { icon: Globe, label: 'País', value: userSession.country }, { icon: MapPin, label: 'Dirección', value: userSession.address }].map(({ icon: Icon, label, value }) => (
                <div key={label} className={styles.infoItem}>
                  <Icon className={styles.icon} aria-hidden="true" />
                  <span className="sr-only">{label}:</span>
                  <span>{value}</span>
                </div>
              ))}
              <div className={styles.infoItem}>
                {userSession.membership_status === 'active' ? (
                  <>
                    <CheckCircle className={styles.icon} aria-hidden="true" />
                    <span className={styles.membershipStatusActive}>
                      Tienes una membresía activa
                    </span>
                  </>
                ) : (
                  <>
                    <XCircle className={styles.icon} aria-hidden="true" />
                    <span className={styles.membershipStatusInactive}>
                      Aún no tienes una membresía. Te invitamos a inscribirte{' '}
                      <Link href="/memberships" className={styles.membershipLink}>
                        Aquí
                      </Link>
                      .
                    </span>
                  </>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className={styles.card}>
          <CardHeader>
            <CardTitle className={styles.scheduledClassesTitle}>
              Mis Clases Programadas
            </CardTitle>
          </CardHeader>
          <CardContent>
            
            <ScheduledClasses
              classes={scheduledClasses.map((item) => ({
                id: item.id,
                name: item.class.name, 
                day: item.schedule.day,
                startTime: item.schedule.startTime,
                endTime: item.schedule.endTime,
              }))}
            />
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
