'use client'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, MapPin, Phone, Edit, Globe ,CheckCircle, XCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context'
import Link from 'next/link' 
import { ScheduledClasses } from "@/component/sheduleClass"
import { cn } from "@/lib/utils"
import styles from './perfilusuario.module.css'

export default function PerfilUsuario() {
  const router = useRouter()
  const { userSession } = useAuth()

  const handleEditProfile = () => {
    router.push('/userprofile-edit')
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.title}>Perfil de Usuario</h1>
          <Button 
            onClick={handleEditProfile}
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
                <AvatarImage alt="Foto de perfil" src={userSession?.image || '/default-avatar.png'} />
                <AvatarFallback>{userSession.name?.charAt(0) || 'U'}</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-2xl font-bold">{userSession.name}</h2>
                <p className="text-gray-500">@{userSession.email}</p>
              </div>
            </div>
            <div className={styles.infoContainer}>
              {[
                { icon: Mail, label: 'Email', value: userSession.email },
                { icon: Phone, label: 'Teléfono', value: userSession.phone },
                { icon: Globe, label: 'País', value: userSession.country },
                { icon: MapPin, label: 'Dirección', value: userSession.address },
              ].map(({ icon: Icon, label, value }) => (
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
                    <span className={styles.membershipStatusActive}>Tienes una membresía activa</span>
                  </>
                ) : (
                  <>
                    <XCircle className={styles.icon} aria-hidden="true" />
                    <span className={styles.membershipStatusInactive}>
                      Aún no tienes una membresía. Te invitamos a inscribirte{' '}
                      <Link href="/memberships" className={styles.membershipLink}>
                        Aquí
                      </Link>.
                    </span>
                  </>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className={styles.card}>
          <CardHeader>
            <CardTitle className={styles.scheduledClassesTitle}>Mis Clases </CardTitle>
          </CardHeader>
          <CardContent>
            <ScheduledClasses 
              classes={[
                { id: '1', title: 'Yoga para principiantes', date: 'Viernes', time: '10:00 AM', instructor: 'Ana García' },
                { id: '2', title: 'Pilates intermedio', date: 'Jueves', time: '2:00 PM', instructor: 'Carlos Rodríguez' },
                { id: '3', title: 'Zumba avanzado', date: 'Lunes', time: '6:00 PM', instructor: 'María López' },
              ]}
            />
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

