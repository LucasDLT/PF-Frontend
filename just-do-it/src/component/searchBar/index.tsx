'use client'
import { useState } from "react"
import { Input } from "@/components/ui/input"
import CardClass from "../card-class"

interface SearchBarProps{
    gymClasses: {
        
        id: string;
        name: string;
        location: string;
        img_url: string
    }[];
}

export default function SearchBar({gymClasses}:SearchBarProps) {
    const [searchTerm, setSearchTerm] = useState('')
  
    const filteredClasses = gymClasses.filter(gymClass =>
      gymClass.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Buscar Clases de Gimnasio</h1>
        <Input
          type="text"
          placeholder="Buscar por nombre de clase..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mb-6"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredClasses.map((gymClass) => (
                <CardClass key={gymClass.id} gymClass={gymClass} />
          ))}
        </div>
        {filteredClasses.length === 0 && (
          <p className="text-center text-gray-500 mt-4">No se encontraron clases que coincidan con la búsqueda.</p>
        )}
      </div>
    )
  }