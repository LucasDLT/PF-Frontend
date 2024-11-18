import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { Class } from "@/types/class";

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
    "imgUrl": "/clases/yoga.jpg",
    "trainerName": "Jane Doe",
    id: "1"
  },
  {
    "name": "Entrenamiento Funcional",
    "description": "Circuitos intensos para mejorar fuerza, resistencia y flexibilidad.",
    "location": "Sala de pesas",
    "capacity": 15,
    "current_participants": 12,
    "schedule": "2024-11-21T08:00:00Z",
    "imgUrl": "/yoga.jpg",
    "trainerName": "John Smith",
    id: "2"
  },
  {
    "name": "Zumba Energizante",
    "description": "Baila y ejercítate al ritmo de música vibrante y divertida.",
    "location": "Sala de danza",
    "capacity": 25,
    "current_participants": 18,
    "schedule": "2024-11-22T17:30:00Z",
    "imgUrl": "/yoga.jpg",
    "trainerName": "Maria Gonzalez",
    id: "3"
  },
  {
    "name": "CrossFit de Alto Rendimiento",
    "description": "Sesiones intensas para los amantes del fitness extremo.",
    "location": "Zona de entrenamiento al aire libre",
    "capacity": 12,
    "current_participants": 8,
    "schedule": "2024-11-23T06:30:00Z",
    "imgUrl": "/yoga.jpg",
    "trainerName": "Alex Turner",
    id: "4"
  },
  {
    "name": "Pilates para Principiantes",
    "description": "Movimientos básicos para mejorar postura y flexibilidad.",
    "location": "Sala de pilates",
    "capacity": 10,
    "current_participants": 6,
    "schedule": "2024-11-24T10:00:00Z",
    "imgUrl": "/yoga.jpg",
    "trainerName": "Sofia Ruiz",
    id: "5"
  }
]