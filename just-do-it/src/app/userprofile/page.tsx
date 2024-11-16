"use client";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Mail, MapPin, Phone, User, Edit } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import styles from './perfilusuario.module.css'; // Importar el archivo CSS Module

export default function PerfilUsuario() {
  const route = useRouter();
  const { data: session } = useSession();

  const handleEdit = () => {
    route.push('/userprofile-edit');
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.title}>Perfil de Usuario</h1>
          <Button
            onClick={handleEdit}
            className={styles.buttonEdit}
          >
            <Edit className="mr-2 h-4 w-4" /> Editar Perfil
          </Button>
        </div>
      </div>
      <div className="max-w-4xl mx-auto mt-8 p-4">
        <Card className="shadow-lg">
          <CardContent className="p-6">
            <div className={styles.avatarWrapper}>
              <Avatar className={styles.avatar}>
                <AvatarImage alt="Foto de perfil" src={session?.user.image} />
                <AvatarFallback className={styles.avatarFallback}>UN</AvatarFallback>
              </Avatar>
              <div className={styles.infoWrapper}>
                <h2 className={styles.userName}>{session?.user.name}</h2>
                <p className={styles.userEmail}>{session?.user.email}</p>
              </div>
            </div>
            <div className={styles.details}>
              <div className={styles.detailsItem}>
                <Mail className={`h-5 w-5 ${styles.icon}`} />
                <span>{session?.user.email}</span>
              </div>
              <div className={styles.detailsItem}>
                <Phone className={`h-5 w-5 ${styles.icon}`} />
                <span>+1 234 567 890</span>
              </div>
              <div className={styles.detailsItem}>
                <MapPin className={`h-5 w-5 ${styles.icon}`} />
                <span>Ciudad, País</span>
              </div>
              <div className={`${styles.detailsItem} ${styles.userDescription}`}>
                <User className={`h-5 w-5 ${styles.icon} mt-1`} />
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
