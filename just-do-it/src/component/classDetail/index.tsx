'use client'

import React from 'react'
import { Button } from "@/components/ui/button"
import { Class } from '@/types/class'

export default function ActivityDetail({ id, name, description, location, capacity, trainner, img_url, }: Class) {
  return (
<div className="bg-gray-100 min-h-screen p-4">
  <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
    <div className="flex flex-col md:flex-row">
      {/* Imagen a la izquierda */}
      <div className="md:w-1/3">
        <img className="h-36 w-full object-cover" src={img_url} alt={name} />
      </div>

      {/* Contenido a la derecha */}
      <div className="p-6 md:w-2/3">
        <h2 className="text-xl font-semibold text-red-700">{name}</h2>
        <p className="mt-2 text-gray-600">{description}</p>
        <p className="mt-2 text-gray-600">{location}</p>
        <p className="mt-2 text-gray-600">{trainner}</p>

        <div className="mt-4 text-gray-600">
          <span>Capacidad: {capacity} personas por turno</span>
        </div>

        <div className="mt-6">
         <button className="w-full bg-yellow-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-yellow-600">
         Generar Cita</button>
        </div>
      </div>
    </div>
  </div>
</div>




  )
}
