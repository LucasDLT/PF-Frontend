import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { Class } from "@/types/class";
import { Membership } from "@/types/membership";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

//lista de practica de clases del gimnasio 
export const gymClasses: Class[] = [
  {
    "name": "Yoga al Atardecer",
    "description": "Una clase relajante para terminar el día con vistas al atardecer.",
    "location": "Terraza del gimnasio",
    "capacity": 20,
    "current_participants": 10,
    "schedule": "2024-11-20T19:00:00Z",
    "imgUrl": "/yoga.jpg",
    "trainerName": "Jane Doe",
    "id": "7b8a1f3e-8be9-4bfe-a8bc-11c77e4b7769"
  },
  {
    "name": "Entrenamiento Funcional",
    "description": "Circuitos intensos para mejorar fuerza, resistencia y flexibilidad.",
    "location": "Sala de pesas",
    "capacity": 15,
    "current_participants": 12,
    "schedule": "2024-11-21T08:00:00Z",
    "imgUrl": "/funcional.jpg",
    "trainerName": "John Smith",
    "id": "8d456b7e-423a-4a4a-a9b9-d72ea491bcbb"
  },
  {
    "name": "Zumba Energizante",
    "description": "Baila y ejercítate al ritmo de música vibrante y divertida.",
    "location": "Sala de danza",
    "capacity": 25,
    "current_participants": 18,
    "schedule": "2024-11-22T17:30:00Z",
    "imgUrl": "/zumba.jpg",
    "trainerName": "Maria Gonzalez",
    "id": "5d1b1f3a-967e-46a0-b52a-fcfed1de84a3"
  },
  {
    "name": "CrossFit de Alto Rendimiento",
    "description": "Sesiones intensas para los amantes del fitness extremo.",
    "location": "Zona de entrenamiento al aire libre",
    "capacity": 12,
    "current_participants": 8,
    "schedule": "2024-11-23T06:30:00Z",
    "imgUrl": "/crossfit.jpg",
    "trainerName": "Alex Turner",
    "id": "a32f8d7d-c9f1-47c7-9b9f-47a9d0f65a60"
  },
  {
    "name": "Pilates para Principiantes",
    "description": "Movimientos básicos para mejorar postura y flexibilidad.",
    "location": "Sala de pilates",
    "capacity": 10,
    "current_participants": 6,
    "schedule": "2024-11-24T10:00:00Z",
    "imgUrl": "/pilates.jpeg",
    "trainerName": "Sofia Ruiz",
    "id": "f8d67e89-3b92-4a0c-ae5e-bb8a567c9d34"
  }
]
/* lista de membresias de practrica */

export const memberships: Membership[] = [
  {
    id: '1',
    name: 'Premium',
    price: 29.99,
    duration: 30,
    description: 'Membresía premium con acceso completo a todos los servicios y contenido exclusivo.',
    created_at: new Date('2024-01-01')
  },
  {
    id: '2',
    name: 'Standard',
    price: 9.99,
    duration: 30, 
    description: 'Membresía estándar con acceso limitado a contenido básico.',
    created_at: new Date('2024-01-01')
  }
];
