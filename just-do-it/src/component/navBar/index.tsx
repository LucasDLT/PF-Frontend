'use client';

import { useEffect, useState } from 'react';
import { Menu, X, User, UserCog, LogOut } from 'lucide-react';
import styles from './Navbar.module.css';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import { useAuth } from '@/context';

export default function NavbarApp() {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession(); // Obtiene la sesión del usuario
  const { userSession } = useAuth(); // Obtener la sesión del contexto

  // useEffect para verificar si el usuario está logueado y loguear la sesión
  useEffect(() => {
    if (session?.user) {
      console.log('Usuario logueado (desde useSession):', session.user);
    } else {
      console.log('No hay usuario logueado (desde useSession)');
    }

    // Alternativa con el contexto `useAuth`
    if (userSession?.id) {
      console.log('Usuario logueado (desde context):', userSession);
    } else {
      console.log('No hay usuario logueado (desde context)');
    }
  }, [session, userSession]); // Dependencia de cambios en session y userSession

  const handleLogOut = () => {
    signOut({ callbackUrl: '/' });
  };

  const menuItems = [
    { label: 'INICIO', href: '/' },
    { label: 'SEDES', href: '/sede' },
    { label: 'SERVICIOS', href: '/services' },
    { label: 'PLANES', href: '#' },
    { label: 'CONTÁCTANOS', href: '#' },
  ];

  const NavMenu = ({ isMobile = false }) => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={styles.menuButton}
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="sr-only">Open main menu</span>
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align={isMobile ? 'end' : 'start'} className={styles.menuContent}>
        {menuItems.map((item) => (
          <DropdownMenuItem key={item.label} className={styles.menuItem} asChild>
            <Link href={item.href}>{item.label}</Link>
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator className={styles.menuSeparator} />
        {!session ? (
          // Si no hay sesión, muestra solo la opción de iniciar sesión
          <DropdownMenuItem className={styles.menuItem} asChild>
            <Link href="/login">
              <div className="flex items-center">
                <User className="mr-2 h-4 w-4" />
                <span>Iniciar sesión</span>
              </div>
            </Link>
          </DropdownMenuItem>
        ) : (
          // Si hay sesión, muestra las opciones de usuario
          <>
            <DropdownMenuItem className={styles.menuItem} asChild>
              <Link href="/userprofile">
                <div className="flex items-center">
                  <User className="mr-2 h-4 w-4" />
                  <span>Perfil Usuario</span>
                </div>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem className={styles.menuItem} asChild>
              <a href="#">
                <div className="flex items-center">
                  <UserCog className="mr-2 h-4 w-4" />
                  <span>Perfil Admin</span>
                </div>
              </a>
            </DropdownMenuItem>
            <DropdownMenuItem className={styles.menuItem} asChild>
              <div
                className="flex items-center cursor-pointer"
                onClick={handleLogOut}
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Cerrar Sesión</span>
              </div>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );

  return (
    <nav className={styles.navbarWrapper}>
      <div className={styles.navContainer}>
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <span className={styles.logo}>Logo</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <NavMenu />
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <NavMenu isMobile={true} />
          </div>
        </div>
      </div>
    </nav>
  );
}
