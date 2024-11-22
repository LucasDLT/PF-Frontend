'use client';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import CardClass from '../card-class';
import styles from './searchbar.module.css';
import { useAuth } from '@/context';

export default function SearchBar() {
  const { classes } = useAuth(); // Obtener las clases del contexto
  const [searchTerm, setSearchTerm] = useState('');
  const [filterMethod, setFilterMethod] = useState('name');

  // Filtrar las clases según el criterio seleccionado
  const filteredClasses = classes?.filter((gymClass) => {
    if (filterMethod === 'name') {
      return gymClass.name.toLowerCase().includes(searchTerm.toLowerCase());
    } else if (filterMethod === 'location') {
      return gymClass.location.toLowerCase().includes(searchTerm.toLowerCase());
    }
    return true;
  }) || [];

  return (
    <div className={styles.searchBarContainer}>
      <h1 className={styles.titleSearchBar}>Buscar Clases de Gimnasio</h1>

      <div className="mb-4 bg-black align-center justify-center content-center">
        <label htmlFor="filter" className="mr-2 text-white">
          Filtrar por:
        </label>
        <select
          id="filter"
          value={filterMethod}
          onChange={(e) => setFilterMethod(e.target.value)}
          className={styles.select}
        >
          <option value="name" className="bg-black text-white">
            Nombre de la clase
          </option>
          <option value="location" className="bg-black text-white">
            Sala
          </option>
        </select>
      </div>

      <Input
        type="text"
        placeholder={`Buscar por ${filterMethod === 'name' ? 'nombre de clase' : 'sala'}...`}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className={`${styles.input} mb-6`} // Usamos la clase del CSS Module
      />

      {/* Contenedor con scroll solo para las tarjetas */}
      <div className={styles.cardsContainer}>
        <div className="grid grid-cols-4 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredClasses.map((gymClass) => (
            <CardClass key={gymClass.id} gymClass={gymClass} />
          ))}
        </div>
      </div>

      {filteredClasses.length === 0 && (
        <p className="text-center text-gray-500 mt-4">
          No se encontraron clases que coincidan con la búsqueda.
        </p>
      )}
    </div>
  );
}
