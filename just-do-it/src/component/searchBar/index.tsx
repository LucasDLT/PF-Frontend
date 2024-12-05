'use client';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import CardClass from '../card-class';
import styles from './searchbar.module.css';
import { useAuth } from '@/context';

export default function SearchBar() {
  const { classes } = useAuth(); 
  const [searchTerm, setSearchTerm] = useState('');
  const [filterMethod, setFilterMethod] = useState('name');

  
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

      
      <Input
        type="text"
        placeholder={`Buscar por ${filterMethod === 'name' ? 'nombre de clase' : 'sala'}...`}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className={`${styles.input} mb-6`} 
      />

    
      <div className={styles.cardsContainer}>
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
