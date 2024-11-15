"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import CardClass from "../card-class";

interface SearchBarProps {
  gymClasses: {
    id: string;
    name: string;
    location: string;
    img_url: string;
  }[];
}

export default function SearchBar({ gymClasses }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterMethod, setFilterMethod] = useState("name"); 

  const filteredClasses = gymClasses.filter((gymClass) => {
    if (filterMethod === "name") {
      return gymClass.name.toLowerCase().includes(searchTerm.toLowerCase());
    } else if (filterMethod === "location") {
      return gymClass.location.toLowerCase().includes(searchTerm.toLowerCase());
    }
    return true;
  });

  return (
    <div className="container mx-auto px-4 py-8 text-white bg-grey-900 backdrop-blur">
      <h1 className="text-2xl font-bold mb-4">Buscar Clases de Gimnasio</h1>

      <div className="mb-4 bg-black" >
        <label htmlFor="filter" className="mr-2 bg-black ">Filtrar por:</label>
        <select
          id="filter"
          value={filterMethod}
          onChange={(e) => setFilterMethod(e.target.value)}
          className="bg-black text-white px-4 py-2 rounded-md"
        >
          <option value="name" className="bg-black">Nombre de la clase </option>
          <option value="location">Sala</option>
        </select>
      </div>

      <Input
        type="text"
        placeholder={`Buscar por ${filterMethod === "name" ? "nombre de clase" : "sala"}...`}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-6 "
      />

      <div className="grid grid-cols-4 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredClasses.map((gymClass) => (
          <CardClass key={gymClass.id} gymClass={gymClass} />
        ))}
      </div>

      {filteredClasses.length === 0 && (
        <p className="text-center text-gray-500 mt-4">
          No se encontraron clases que coincidan con la búsqueda.
        </p>
      )}
    </div>
  );
}
