'use client';
import { useState } from 'react';
import Link from 'next/link';
import { RiLoginBoxLine } from 'react-icons/ri';
import { Avatar } from '@nextui-org/react'; // Para mostrar el avatar
import { signOut, useSession } from 'next-auth/react';
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
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();
  const { userSession, token, logout } = useAuth();
  const avatarUrl =
    session?.user?.image || 'https://i.pravatar.cc/150?u=a042581f4e29026704d';

    const handleLogOut = () => {
      
      signOut({ callbackUrl: '/' });  
    
      
      logout();  }

  const menuItems = [
    { label: 'INICIO', href: '/' },
    { label: 'SEDES', href: '/location' },
    { label: 'SERVICIOS', href: '/services' },
    { label: 'PLANES', href: '/planes' },
    { label: 'CONTÁCTANOS', href: '/contacto' },
  ];

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
        {session || token ? (
          // Si hay sesión, mostramos el avatar y el dropdown
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className={styles.menuButton}>
                <Avatar src={avatarUrl} size="md" />
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent>
              <DropdownMenuItem asChild>
                <Link
                  href="/userprofile"
                  className={`${styles.menuItem} flex items-center`}
                >
                  <User className="mr-2 h-4 w-4" />
                  <span>Perfil Usuario</span>
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem asChild>
                <Link
                  href="/adminprofile"
                  className={`${styles.menuItem} flex items-center`}
                >
                  <UserCog className="mr-2 h-4 w-4" />
                  <span>Perfil Admin</span>
                </Link>
              </DropdownMenuItem>

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
          // Si no hay sesión, mostramos el icono de login
          <Link href="/login" className={styles.loginIcon}>
            <RiLoginBoxLine />
          </Link>
        )}
      </div>
    </nav>
  );
};
