'use client';
import React from 'react';
import styles from './carousel.module.css';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import Link from 'next/link';
import { useAuth } from '@/context';

export default function ActivityCarousel() {
  const { classes } = useAuth();

  if (!classes || classes.length === 0) {
    return <p>No hay clases disponibles en este momento.</p>;
  }

  return (
    <Carousel>
      {/* Contenido del carrusel */}
      <CarouselContent className={styles.carouselContent}>
        {classes.map((activity) => (
          <CarouselItem key={activity.id} className={styles.carouselItem}>
            <Card className={styles.cardContent}>
              <Link href={`/servicedetail/${activity.id}`}>
                <CardContent className={styles.cardContent}>
                  {/* Imagen */}
                  <div className={styles.imageContainer}>
                    <Image
                      src={activity.imgUrl}
                      alt={`Imagen de ${activity.name}`}
                      className={styles.image}
                      width={500} // Ajustar según sea necesario
                      height={200} // Ajustar altura según la imagen
                    />
                  </div>
                  {/* Contenido del Card */}
                  <div className={styles.cardBody}>
                    <h3 className={styles.cardTitle}>{activity.name}</h3>
                    <p className={styles.cardDescription}>{activity.description}</p>
                  </div>
                </CardContent>
              </Link>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>

      {/* Controles del carrusel */}
      <CarouselPrevious className={styles.carouselPrevious} />
      <CarouselNext className={styles.carouselNext} />
    </Carousel>
  );
}
