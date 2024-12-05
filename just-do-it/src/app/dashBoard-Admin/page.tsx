'use client'

import { useAuth } from '@/context'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CalendarDays, Mail, MapPin, Phone, Flag, Users, BarChart, PieChart, TrendingUp } from 'lucide-react'
import styles from './PanelAdmin.module.css'

export default function AdminDashboard() {
  const { userSession } = useAuth()

  if (!userSession) {
    return <div>Cargando...</div>
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Panel de Administración</h1>
      
      <div className={`${styles.grid} ${styles.gridCols1} ${styles.mdGridCols3} ${styles.gap6} ${styles.mb8}`}>
        <Card className={styles.card}>
          <CardHeader>
            <CardTitle>Bienvenido, {userSession.name}</CardTitle>
            <CardDescription>
              Este es tu panel de control. Aquí encontrarás un resumen de la actividad del sistema y tus datos personales.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4">
              <Avatar className={styles.avatar}>
                <AvatarImage src={userSession.image} alt={userSession.name || ''} />
                <AvatarFallback>{userSession.name?.charAt(0) || 'A'}</AvatarFallback>
              </Avatar>
              <div>
                <h2 className={styles.userName}>{userSession.name}</h2>
                <p className={styles.userEmail}>{userSession.email}</p>
                <Badge variant="secondary" className={styles.badgeSecondary}>{userSession.roles}</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className={styles.card}>
          <CardHeader>
            <CardTitle>Información de Contacto</CardTitle>
          </CardHeader>
          <CardContent className={styles.spaceY2}>
            <div className="flex items-center space-x-2">
              <Phone className="text-muted-foreground" />
              <span>{userSession.phone}</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="text-muted-foreground" />
              <span>{userSession.address}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Flag className="text-muted-foreground" />
              <span>{userSession.country}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className={`${styles.grid} ${styles.gridCols1} ${styles.mdGridCols3} ${styles.gap6} ${styles.mb8}`}>
        <Card className={styles.card}>
          <CardHeader>
            <CardTitle>Resumen de Actividades</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className={styles.spaceY4}>
              <li>
                <div className="flex items-center justify-between mb-1">
                  <span>Usuarios Activos</span>
                  <Badge>120</Badge>
                </div>
                <Progress value={75} className={styles.progress} />
              </li>
              <li>
                <div className="flex items-center justify-between mb-1">
                  <span>Eventos Programados</span>
                  <Badge>8</Badge>
                </div>
                <Progress value={40} className={styles.progress} />
              </li>
              <li>
                <div className="flex items-center justify-between mb-1">
                  <span>Tareas Pendientes</span>
                  <Badge variant="destructive">3</Badge>
                </div>
                <Progress value={15} className={styles.progress} />
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card className={styles.card}>
          <CardHeader>
            <CardTitle>Próximos Eventos</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className={styles.spaceY4}>
              <li className="flex items-start space-x-2">
                <CalendarDays className="text-muted-foreground mt-0.5" />
                <div>
                  <p className="font-medium">Reunión de Equipo</p>
                  <p className="text-sm text-muted-foreground">15 de Mayo, 10:00 AM</p>
                  <Badge variant="outline" className={styles.badgeOutline}>Virtual</Badge>
                </div>
              </li>
              <li className="flex items-start space-x-2">
                <CalendarDays className="text-muted-foreground mt-0.5" />
                <div>
                  <p className="font-medium">Lanzamiento de Producto</p>
                  <p className="text-sm text-muted-foreground">22 de Mayo, 2:00 PM</p>
                  <Badge variant="outline" className={styles.badgeOutline}>Presencial</Badge>
                </div>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card className={styles.card}>
          <CardHeader>
            <CardTitle>Estadísticas del Sistema</CardTitle>
          </CardHeader>
          <CardContent>
            <div className={styles.spaceY4}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <BarChart className="text-muted-foreground" />
                  <span>Tráfico Diario</span>
                </div>
                <span className="font-semibold">1,234</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <PieChart className="text-muted-foreground" />
                  <span>Uso de Recursos</span>
                </div>
                <span className="font-semibold">68%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="text-muted-foreground" />
                  <span>Crecimiento Mensual</span>
                </div>
                <span className="font-semibold">+5.2%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className={styles.card}>
        <CardHeader>
          <CardTitle>Actividad Reciente</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className={styles.spaceY4}>
            {[ 
              { action: "Nuevo usuario registrado", time: "Hace 2 horas", icon: <Users className="text-green-500" /> },
              { action: "Actualización de sistema completada", time: "Hace 1 día", icon: <TrendingUp className="text-blue-500" /> },
              { action: "Reporte mensual generado", time: "Hace 3 días", icon: <BarChart className="text-purple-500" /> },
              { action: "Backup del sistema realizado", time: "Hace 1 semana", icon: <PieChart className="text-yellow-500" /> },
            ].map((item, index) => (
              <li key={index} className={styles.activityItem}>
                <div className={styles.iconWrapper}>{item.icon}</div>
                <div>
                  <p className={styles.activityAction}>{item.action}</p>
                  <p className={styles.activityTime}>{item.time}</p>
                </div>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
