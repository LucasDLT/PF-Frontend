import Image from 'next/image'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import styles from "./succes.module.css"

export default function SubscriptionSuccess() {
  return (
    <div className={styles.container}>
      {/* Imagen de fondo */}
      <Image
        src="/placeholder.svg?height=1080&width=1920"
        alt="Background"
        layout="fill"
        className={styles.backgroundImage}
      />
      
      {/* Overlay para mejorar la legibilidad */}
      <div className={styles.overlay}></div>
      
      {/* Contenido principal */}
      <Card className={styles.card}>
        <CardHeader>
          <CardTitle className={styles.cardTitle}>¡Suscripción Exitosa!</CardTitle>
        </CardHeader>
        <CardContent>
          <p className={styles.cardContent}>
            Gracias por suscribirte. Ahora formas parte de nuestra comunidad.
          </p>
        </CardContent>
        <CardFooter className={styles.cardFooter}>
          <Button asChild>
            <Link href="/">
              Volver a la página principal
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
