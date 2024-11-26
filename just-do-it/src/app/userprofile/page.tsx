'use client'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Mail, MapPin, Phone, Edit, Globe } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context'
import styles from './perfilusuario.module.css'
import Link from 'next/link' 

export default function PerfilUsuario() {
  const router = useRouter()
  const { userSession } = useAuth()

  const handleEditProfile = () => {
    router.push('/userprofile-edit')
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.title}>Perfil de Usuario</h1>
          <Button 
            onClick={handleEditProfile}
            className={styles.editButton}
          >
            <Edit className="mr-2 h-4 w-4" /> Editar Perfil
          </Button>
        </div>
      </div>
      <div className={styles.cardContainer}>
        <Card className={styles.card}>
          <CardContent className={styles.cardContent}>
            <div className={styles.avatarContainer}>
              <Avatar className={styles.avatar}>
                <AvatarImage alt="Foto de perfil" src={userSession?.image || '/default-avatar.png'} />
                <AvatarFallback className={styles.avatarFallback}>JDI</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-2xl font-bold">{userSession.name}</h2>
                <p className="text-gray-500">@{userSession.email}</p>
              </div>
            </div>
            <div className={styles.infoContainer}>
              <div className={styles.infoItem}>
                <Mail className={styles.icon} />
                <span>{userSession.email}</span>
              </div>
              <div className={styles.infoItem}>
                <Phone className={styles.icon} />
                <span>{userSession.phone}</span>
              </div>
              <div className={styles.infoItem}>
                <Globe className={styles.icon} />
                <span>{userSession.country}</span>
              </div>
              <div className={styles.infoItem}>
                <MapPin className={styles.icon} />
                <span>{userSession.address}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      
      <div className="text-center mt-6">
        {userSession.membership_status === 'active' ? (
          <p className="text-lg font-medium text-green-500">Tienes una membresía activa</p>
        ) : (
          <p className="text-lg font-medium text-gray-700">
            Aún no tienes una membresía. Te invitamos a inscribirte{' '}
            <Link href="/memberships" className="text-blue-800">
              Aquí
            </Link>.
          </p>
        )}
      </div>
    </div>
  )
}
