'use client'
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Actividad {
  imagen: string;
  nombre: string;
  descripcion: string;
  sede: string;
}

const actividades: Actividad[] = [
  {
    imagen: "/sala_musculacion.jpg",
    nombre: "Musculacion",
    descripcion: "",
    sede: "Gimnasio Central",
  },
  {
    imagen: "/spinning.jpg",
    nombre: "Spinning",
    descripcion: "",
    sede: "Centro Fitness Norte",
  },
  {
    imagen: "/natacion.jpg",
    nombre: "Natacion",
    descripcion:
      "Entrenamiento cardiovascular sobre bicicletas estáticas. Ayuda a quemar calorías y mejorar la resistencia física.",
    sede: "Gimnasio Central",
  },
  {
    imagen: "/crossfit.jpg",
    nombre: "Crossfit",
    descripcion:
      "Práctica de posturas y técnicas de respiración que ayudan a reducir el estrés, mejorar la flexibilidad y promover la relajación.",
    sede: "Centro Fitness Sur",
  },
];

export default function ActivityCarousel() {
  return (
    <Carousel>
      <CarouselContent>
        {actividades.map((actividad, index) => (
          <CarouselItem key={index}>
            <Card className="border-none bg-black flex items-center justify-center h-full">
              <CardContent className="p-0">
                <div className="relative h-64 md:h-96 overflow-hidden rounded-t-lg	">
                  <Image
                    src={actividad.imagen}
                    alt={`Imagen de ${actividad.nombre}`}
                    className="object-cover"
                    width={500}
                    height={100}
                  />
                </div>
                <div className="p-4 bg-white dark:bg-gray-800 rounded-b-lg">
                  <h3 className="text-xl font-bold mb-2">{actividad.nombre}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                    {actividad.descripcion}
                  </p>
                  <Badge variant="secondary">{actividad.sede}</Badge>
                </div>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-2" />
      <CarouselNext className="right-2" />
    </Carousel>
  );
}
