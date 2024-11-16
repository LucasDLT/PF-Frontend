'use client';
import React from 'react';
import styles from './carousel.module.css'; // Importar el archivo CSS Module

import Image from 'next/image';
import { gymClasses } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import Link from 'next/link';

export default function ActivityCarousel() {
  return (
    <Carousel>
      {/* Contenido del carrusel */}
      <CarouselContent className={styles.carouselContent}>
        {gymClasses.map((activity, index) => (
          <CarouselItem key={index} className={styles.carouselItem}>
            <Card className={styles.cardContent}>
              <Link href={`/servicedetail/${activity.id}`}>
              <CardContent className={styles.cardContent}>
                {/* Imagen */}
                <div >
                  <Image
                    src={activity.img_url}
                    alt={`Imagen de ${activity.name}`}
                    className={styles.image}
                    width={500}
                    height={100}
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
