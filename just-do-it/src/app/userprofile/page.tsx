'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Mail, MapPin, PhoneCall, UserCircle, Edit } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import styles from './perfilusuario.module.css';
import { useAuth } from '@/context';

export default function PerfilUsuario() {
  const route = useRouter();
  const { userSession } = useAuth();

  const handleEdit = () => {
    route.push('/userprofile-edit');
  };

 
  const membershipActive =
    userSession?.membership_status === 'active' 
    
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.title}>Perfil de Usuario</h1>
          <Button onClick={handleEdit} className={styles.buttonEdit}>
            <Edit className="mr-2 h-4 w-4" /> Editar Perfil
          </Button>
        </div>
      </div>
      <div className="max-w-4xl mx-auto mt-8 p-4">
        <Card className="shadow-lg">
          <CardContent className="p-8 space-y-6">
            {' '}
            {/* Espaciado mejorado */}
            <div className="flex items-center gap-6">
              <Avatar className={styles.avatar}>
                <AvatarImage
                  alt="Foto de perfil"
                  src={
                    userSession?.image ??
                    '/default-avatar.png'
                  }
                />
                <AvatarFallback className={styles.avatarFallback}>
                  UN
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-2xl font-bold">
                  { userSession?.name}
                </h2>
                <p className="text-gray-500">
                  {userSession?.email}
                </p>
              </div>
            </div>
            <div className="space-y-4">
              {' '}
              {/* Espaciado entre detalles */}
              <div className="flex items-center gap-4">
                <Mail className="h-5 w-5 text-blue-500" />
                <span>{ userSession?.email}</span>
              </div>
              <div className="flex items-center gap-4">
                <PhoneCall className="h-5 w-5 text-blue-500" />
                <span>{userSession?.phone}</span>
              </div>
              <div className="flex items-center gap-4">
                <MapPin className="h-5 w-5 text-blue-500" />
                <span>{userSession?.country}</span>
              </div>
              <div className="flex items-center gap-4">
                <MapPin className="h-5 w-5 text-blue-500" />
                <span>{userSession?.address}</span>
              </div>
              {membershipActive ? (
                <div className="flex items-center gap-4">
                  <UserCircle className="h-5 w-5 text-blue-500" />
                  <span>{userSession?.membership_status}</span>
                </div>
              ) : (
                <h1>No tienes membresía activa</h1>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
