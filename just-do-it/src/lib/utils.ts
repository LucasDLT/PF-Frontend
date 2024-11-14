import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { Class } from "@/types/class";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

//lista de practica de clases del gimnasio 
export const gymClasses: Class[] = [
  {
    id: '1',
    name: 'Yoga Básico',
    description: 'Clase de yoga para principiantes. Se enfoca en respiración y posturas básicas.',
    location: 'Sala 1',
    capacity: 20,
    current_participant: 15,
    trainner: 'Ana Martínez',
    img_url: '/crossfit.jpg',
  },
  {
    id: '2',
    name: 'Entrenamiento Funcional',
    description: 'Entrenamiento intensivo que combina fuerza, resistencia y agilidad.',
    location: 'Sala 2',
    capacity: 25,
    current_participant: 20,
    trainner: 'Carlos Gómez',
    img_url: '/crossfit.jpg',
  },
  {
    id: '3',
    name: 'Pilates',
    description: 'Clase enfocada en la tonificación muscular y el estiramiento.',
    location: 'Sala 3',
    capacity: 15,
    current_participant: 10,
    trainner: 'Lucía Fernández',
    img_url: '/crossfit.jpg',
  },
  {
    id: '4',
    name: 'Spinning',
    description: 'Clase de ciclismo indoor que mejora la resistencia cardiovascular.',
    location: 'Sala 4',
    capacity: 30,
    current_participant: 28,
    trainner: 'Marcos Rodríguez',
    img_url: '/crossfit.jpg',
  },
  {
    id: '5',
    name: 'Zumba',
    description: 'Clase de baile con música latina para mejorar la condición física.',
    location: 'Sala 5',
    capacity: 20,
    current_participant: 18,
    trainner: 'Sofía Pérez',
    img_url: '/crossfit.jpg'
  }
];