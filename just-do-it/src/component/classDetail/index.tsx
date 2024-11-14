'use client'

import React from 'react'
import { Calendar, Clock, Users, ChevronRight } from 'lucide-react'
import { Button } from "@/components/ui/button"

interface ActivityDetailProps {
  name: string
  description: string
  imageUrl: string
  schedule?: string[]
  capacity: number
}

export default function ActivityDetail({ name, description, imageUrl, schedule = [], capacity }: ActivityDetailProps) {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen p-8">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden">
        <div className="md:flex">
          <div className="md:flex-shrink-0">
            <img className="h-96 w-full object-cover md:w-96" src={imageUrl} alt={name} />
          </div>
          <div className="p-8 w-full">
            <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{name} Nombre:</div>
            <p className="mt-2 text-gray-500">{description} Descripcion:</p>
            <p className="mt-2 text-gray-500">{description} Profesor a cargo:</p>

            <div className="mt-4">
              <h3 className="text-lg font-medium text-gray-900">Horarios:</h3>
              <div className="mt-2 flex flex-wrap gap-2">
                {schedule.length > 0 ? (
                  schedule.map((time, index) => (
                    <span key={index} className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                      <Clock className="mr-1 h-4 w-4" />
                      {time}
                    </span>
                  ))
                ) : (
                  <span className="text-gray-500">No hay horarios disponibles</span>
                )}
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <Users className="h-5 w-5 text-gray-400" />
              <span className="ml-2 text-gray-600">Capacidad: {capacity} personas por turno</span>
            </div>
            <div className="mt-8">
            <Button className="w-full bg-amber-400 text-slate-900 font-bold py-2 px-3 rounded-md hover:bg-yellow-600 transition duration-300 ease-in-out transform hover:-translate-y-1">
  Generar Cita
  <ChevronRight className="ml-2 h-4 w-4" />
</Button>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
