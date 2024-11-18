'use client';

import { usePathname } from 'next/navigation';
import React from 'react';

const ShowComponent = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  // Ocultar el componente solo en la página principal ("/") y en las rutas que elijas
  if (
    pathname === '/' || // Ruta principal
    pathname.includes('dashBoard-Admin') || // Otras rutas específicas
    pathname.includes('login') ||
    pathname.includes('register') ||
    pathname.includes('formpage')
  ) {
    return null; // Oculta el componente en las rutas especificadas
  }

  return <div>{children}</div>; // Muestra el componente en todas las demás rutas
};

export default ShowComponent;
