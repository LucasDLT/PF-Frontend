'use client';

import { useEffect, useState } from 'react';
import { Menu, X, User, LogOut } from 'lucide-react';
import styles from './Navbar.module.css';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Link from 'next/link';
import Image from 'next/image';
import { signOut } from 'next-auth/react';
import { useAuth } from '@/context';

import { Avatar } from '@nextui-org/react';
import { toast } from 'sonner';

export default function NavbarApp() {
  const [isOpen, setIsOpen] = useState(false);
  const { userSession, token, logout } = useAuth();

  const handleLogOut = () => {
toast.success(`Cerrando sesión, hasta pronto ${userSession?.name}`)
      logout();
      signOut({ callbackUrl: '/' });
  };

  const menuItems = [
    { label: 'INICIO', href: '/' },
    ...(userSession?.membership_status === 'active'
      ? [{ label: 'PREMIUM', href: '/premiumContent' }]
      : []),
    { label: 'SERVICIOS', href: '/services' },
    { label: 'PLANES', href: '/memberships' },
  ];

  const isUserLoggedIn = userSession && token;

  useEffect(() => {
    console.log('--- Verificando estado de sesión ---');
    console.log('User Session:', userSession);
    console.log('Imagen del usuario:', userSession?.image);
  }, [userSession]);

  const NavMenu = ({ isMobile = false }) => {
    const showAvatar = userSession?.image && isUserLoggedIn;

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            className={styles.menuButton}
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className="sr-only">Open main menu</span>
            {isOpen ? (
              <X className="h-6 w-6" />
            ) : showAvatar ? (
              <Avatar src={userSession.image} size="lg" className="h-8 w-8" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align={isMobile ? 'end' : 'start'}
          className={styles.menuContent}
        >
          {menuItems.map(item => (
            <DropdownMenuItem
              key={item.label}
              className={styles.menuItem}
              asChild
            >
              <Link href={item.href}>{item.label}</Link>
            </DropdownMenuItem>
          ))}
          <DropdownMenuSeparator className={styles.menuSeparator} />
          {isUserLoggedIn ? (
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
                <div
                  className="flex items-center cursor-pointer"
                  onClick={handleLogOut}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Cerrar Sesión</span>
                </div>
              </DropdownMenuItem>
            </>
          ) : (
            <DropdownMenuItem className={styles.menuItem} asChild>
              <Link href="/login">
                <div className="flex items-center">
                  <User className="mr-2 h-4 w-4" />
                  <span>Iniciar sesión</span>
                </div>
              </Link>
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };

  return (
    <nav className={styles.navbarWrapper}>
      <div className={styles.navContainer}>
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Image
              src="/justDoItGym-logo.png"
              alt="Logo"
              width={120}
              height={120}
              className={styles.logo}
            ></Image>
          </div>
          <div className="hidden md:block">
            <NavMenu />
          </div>
          <div className="md:hidden">
            <NavMenu isMobile={true} />
          </div>
        </div>
      </div>
    </nav>
  );
}
