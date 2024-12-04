'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Avatar } from '@nextui-org/react';
import { signOut } from 'next-auth/react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { LogOut, User } from 'lucide-react';
import styles from './navlanding.module.css';
import { useAuth } from '@/context';

export const Navbar: React.FC = () => {
  const { userSession, token, logout } = useAuth();
  const [isSessionLoaded, setIsSessionLoaded] = useState(false);

  // Verificar si el userSession está cargado
  if (!isSessionLoaded && userSession) {
    setIsSessionLoaded(true);
  }

  const avatarUrl = userSession?.image
    ? userSession.image
    : 'https://i.pravatar.cc/150?u=a042581f4e29026704d';

  const handleLogOut = () => {
    signOut({ callbackUrl: '/' });
    logout();
  };

  const menuItems = [
    { label: 'INICIO', href: '/' },
    ...(userSession?.membership_status === 'active'
      ? [{ label: 'PREMIUM', href: '/premiumContent' }]
      : []),
    { label: 'SERVICIOS', href: '/services' },
    { label: 'PLANES', href: '/memberships' },
  ];

  return (
    <nav className={styles.navbar}>
      <Image
        src="/justDoItGym-logo.png"
        alt="Logo"
        width={120}
        height={120}
        className={styles.logo}
      ></Image>
      <ul className={styles.navList}>
        {menuItems.map(item => (
          <li key={item.label} className={styles.navItem}>
            <Link href={item.href}>{item.label}</Link>
          </li>
        ))}
      </ul>

      <div className={styles.iconLink}>
        {token ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className={styles.menuButton}>
                {isSessionLoaded ? (
                  <Avatar src={avatarUrl} size="md" />
                ) : (
                  <Avatar size="md" className="bg-gray-300" />
                )}
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
                <div
                  className={`${styles.menuItem} flex items-center cursor-pointer`}
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
            <button className={styles.botonLed}>INICIAR SESIÓN</button>
          </Link>
        )}
      </div>
    </nav>
  );
};
