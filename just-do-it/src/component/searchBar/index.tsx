'use client';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import CardClass from '../card-class';
import styled from 'styled-components';

interface SearchBarProps {
  gymClasses: {
    id: string;
    name: string;
    location: string;
    img_url: string;
  }[];
}

export default function SearchBar({ gymClasses }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterMethod, setFilterMethod] = useState('name');

  const filteredClasses = gymClasses.filter((gymClass) => {
    if (filterMethod === 'name') {
      return gymClass.name.toLowerCase().includes(searchTerm.toLowerCase());
    } else if (filterMethod === 'location') {
      return gymClass.location.toLowerCase().includes(searchTerm.toLowerCase());
    }
    return true;
  });

  return (
    <SearchBarContainer className="container mx-auto px-4 py-8 text-white text-5xl ">
      <TitleSearchBar className="text-2xl font-bold mb-4 textalign-center">
        Buscar Clases de Gimnasio
      </TitleSearchBar>

      <div className="mb-4 bg-black align-center justify-center content-center">
        <label htmlFor="filter" className="mr-2 text-white">
          Filtrar por:
        </label>
        <Select
          id="filter"
          value={filterMethod}
          onChange={(e) => setFilterMethod(e.target.value)}
          className="bg-black text-white px-4 py-2 rounded-md focus:outline-none appearance-none"
        >
          <option value="name" className="bg-black text-white">
            Nombre de la clase
          </option>
          <option value="location" className="bg-black text-white">
            Sala
          </option>
        </Select>
      </div>

      <Input
        type="text"
        placeholder={`Buscar por ${
          filterMethod === 'name' ? 'nombre de clase' : 'sala'
        }...`}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-6 textalign-center justify-center content-center border-black"
      >
      </Input >

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
    </SearchBarContainer>
  );
}

export const Select = styled.select`
  padding: 0.5rem 1rem;
  border-radius: 0.2rem;
  font-size: 1rem;
  background-color: #4a4848;
`;

export const TitleSearchBar = styled.h1`
  font-size: 2rem;
  color: #fff;
  text-align: center;
`;

export const SearchBarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 2rem;
`;

export const SearchBarInput = styled.input`
  padding: 0.5rem 1rem;
  border-radius: 0.2rem;
  font-size: 1rem;
  background-color: #4a4848;
  max-width: 1;
`;