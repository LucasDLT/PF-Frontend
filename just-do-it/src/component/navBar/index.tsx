'use client';

import { useState } from 'react';
import { Menu, X, User, UserCog, LogOut } from 'lucide-react';
import styles from './Navbar.module.css'; // Importa el CSS Module
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function NavbarApp() {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { label: 'INICIO', href: '#' },
    { label: 'SEDES', href: '#' },
    { label: 'SERVICIOS', href: '#' },
    { label: 'PLANES', href: '#' },
    { label: 'CONTÁCTANOS', href: '#' },
  ];

  const NavMenu = ({ isMobile = false }) => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={styles.menuButton} // Usa la clase del CSS Module
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="sr-only">Open main menu</span>
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align={isMobile ? 'end' : 'start'} className={styles.menuContent}>
        {menuItems.map((item) => (
          <DropdownMenuItem key={item.label} className={styles.menuItem} asChild>
            <a href={item.href}>{item.label}</a>
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator className={styles.menuSeparator} />
        <DropdownMenuItem className={styles.menuItem} asChild>
          <a href="#">
            <User className="mr-2 h-4 w-4" />
            <span>Perfil Usuario</span>
          </a>
        </DropdownMenuItem>
        <DropdownMenuItem className={styles.menuItem} asChild>
          <a href="#">
            <UserCog className="mr-2 h-4 w-4" />
            <span>Perfil Admin</span>
          </a>
        </DropdownMenuItem>
        <DropdownMenuItem className={styles.menuItem} asChild>
          <a href="#">
            <LogOut className="mr-2 h-4 w-4" />
            <span>Cerrar Sesión</span>
          </a>
        </DropdownMenuItem>
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
