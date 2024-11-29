'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Avatar } from '@nextui-org/react'; // Para mostrar el avatar
import { signOut } from 'next-auth/react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { LogOut, User, UserCog } from 'lucide-react'; // Iconos para las opciones de menú
import styles from './navlanding.module.css'; // Importar el archivo CSS Module
import { useAuth } from '@/context';

export const Navbar: React.FC = () => {
  const { userSession, token, logout } = useAuth();
  const avatarUrl =
    userSession?.image || 'https://i.pravatar.cc/150?u=a042581f4e29026704d';

  // Lógica para cerrar sesión
  const handleLogOut = () => {
    signOut({ callbackUrl: '/' });
    logout();
  };

  const menuItems = [
    { label: 'INICIO', href: '/' },
    { label: 'SEDES', href: '/location' },
    { label: 'SERVICIOS', href: '/services' },
    { label: 'PLANES', href: '/memberships' },
    { label: 'CONTÁCTANOS', href: '/contacto' },
  ];

  // Verificación de rol: Si el rol no es 'user', entonces es un admin
  const isAdmin = userSession?.roles !== 'user'; // Cambiar 'user' por el rol adecuado

  return (
    <nav className={styles.navbar}>
      <ul className={styles.navList}>
        {menuItems.map((item) => (
          <li key={item.label} className={styles.navItem}>
            <Link href={item.href}>{item.label}</Link>
          </li>
        ))}
      </ul>

      {/* Aquí empieza el Dropdown del avatar o login */}
      <div className={styles.iconLink}>
        {token ? (
          // Si hay sesión, mostramos el avatar y el dropdown
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className={styles.menuButton}>
                <Avatar src={avatarUrl} size="md" />
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent>
              {/* Mostrar solo el perfil de usuario si el rol es 'user' */}
              {userSession?.roles === 'user' && (
                <DropdownMenuItem asChild>
                  <Link
                    href="/userprofile"
                    className={`${styles.menuItem} flex items-center`}
                  >
                    <User className="mr-2 h-4 w-4" />
                    <span>Perfil Usuario</span>
                  </Link>
                </DropdownMenuItem>
              )}

              {/* Mostrar solo el perfil de admin si el rol no es 'user' */}
              {isAdmin && (
                <DropdownMenuItem asChild>
                  <Link
                    href="/dashBoard-Admin"
                    className={`${styles.menuItem} flex items-center`}
                  >
                    <UserCog className="mr-2 h-4 w-4" />
                    <span>Perfil Admin</span>
                  </Link>
                </DropdownMenuItem>
              )}

              {/* Opción para cerrar sesión */}
              <DropdownMenuItem asChild>
                <div
                  className={`${styles.menuItem} flex items-center cursor-pointer`} // Aplica el mismo estilo
                  onClick={handleLogOut}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Cerrar Sesión</span>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Link href="/login">
            <button className={styles.botonLed}>
              INICIAR SESIÓN
            </button>
          </Link>
        )}
      </div>
    </nav>
  );
};
