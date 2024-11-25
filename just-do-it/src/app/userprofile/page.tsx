"use client";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Mail, MapPin, PhoneCall, Edit } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import styles from './perfilusuario.module.css'; 
import { useAuth } from '@/context';

export default function PerfilUsuario() {
  const route = useRouter();
  const { data: session } = useSession();
  const { userSession } = useAuth();

  const handleEdit = () => {
    route.push('/userprofile-edit');
  };

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
      <div className={styles.card}>
        <CardContent className={styles.cardContent}>
          <div className={`${styles.flex} ${styles.gap6}`}>
            <Avatar className={styles.avatar}>
              <AvatarImage
                alt="Foto de perfil"
                src={session?.user?.image ?? userSession?.image ?? '/default-avatar.png'}
              />
              <AvatarFallback className={styles.avatarFallback}>UN</AvatarFallback>
            </Avatar>
            <div>
              <h2 className={styles.userName}>{session?.user.name || userSession?.name}</h2>
              <p className={styles.textGray700}>{session?.user.email || userSession?.email}</p>
            </div>
          </div>
          <div className={styles.details}>
            <div className={`${styles.flex} ${styles.gap4}`}>
              <Mail className={`${styles.textBlue500} h-5 w-5`} />
              <span>{session?.user.email || userSession?.email}</span>
            </div>
            <div className={`${styles.flex} ${styles.gap4}`}>
              <PhoneCall className={`${styles.textBlue500} h-5 w-5`} />
              <span>{userSession?.phone}</span>
            </div>
            <div className={`${styles.flex} ${styles.gap4}`}>
              <MapPin className={`${styles.textBlue500} h-5 w-5`} />
              <span>{userSession?.country}</span>
            </div>
            <div className={`${styles.flex} ${styles.gap4}`}>
              <MapPin className={`${styles.textBlue500} h-5 w-5`} />
              <span>{userSession?.address}</span>
            </div>
          </div>
        </CardContent>
      </div>
    </div>
  );
}
