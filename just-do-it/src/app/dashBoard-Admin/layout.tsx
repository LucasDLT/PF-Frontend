'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { signOut } from 'next-auth/react';
import { useAuth } from '@/context';
import styles from './Layout.module.css';
import { useRouter } from 'next/navigation';

export default function Layout({ children }: { children: React.ReactNode }) {
  const Router = useRouter();
  const { userSession, logout } = useAuth();
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize(); // Llamada inicial
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (userSession?.roles === 'user' || userSession?.roles === 'associate') {
      Router.push('/');
    } else if (!userSession) {
      Router.push('/login');
    }
  }, [userSession, Router]);

  const toggleMenu = (menuName: string) => {
    setActiveMenu((prevMenu) => (prevMenu === menuName ? null : menuName));
    // Removemos la lógica de cerrar el sidebar aquí
  };

  const handleSubMenuClick = () => {
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  };

  const handleLogOut = () => {
    signOut({ callbackUrl: '/' });
    logout();
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  };

  return (
    <div className={styles.container}>
      {isMobile && (
        <button className={styles.sidebarToggle} onClick={toggleSidebar}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={styles.icon}>
            <path fillRule="evenodd" d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z" clipRule="evenodd" />
          </svg>
        </button>
      )}
      <div className={`${styles.sidebar} ${isSidebarOpen ? styles.sidebarOpen : ''}`}>
        <div className={styles.sidebarContent}>
          <ul className={styles.menu}>
            <Link href="/dashBoard-Admin" onClick={(e) => e.stopPropagation()}>
              <li className={styles.menuItem}>PERFIL DEL ADMINISTRADOR</li>
            </Link>
            <li>
              <div>
                <button
                  onClick={() => toggleMenu('eventos')}
                  className={styles.customButton}
                >
                  <span>Clases</span>
                  <span
                    className={`${styles.transitionIcon} ${
                      activeMenu === 'eventos' ? styles.rotate180 : ''
                    }`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={styles.icon}
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                </button>
                {activeMenu === 'eventos' && (
                  <ul className={styles.subMenu}>
                    <Link href="/dashBoard-Admin/classes/currentclasses" onClick={handleSubMenuClick}>
                      <li>Crear Clase</li>
                    </Link>
                    <Link href="/dashBoard-Admin/classes/editclasses" onClick={handleSubMenuClick}>
                      <li>Ver y Editar Clases</li>
                    </Link>
                  </ul>
                )}
              </div>
            </li>

            <li>
              <div>
                <button
                  onClick={() => toggleMenu('usuarios')}
                  className={styles.customButton}
                >
                  <span>Usuarios</span>
                  <span
                    className={`${styles.transitionIcon} ${
                      activeMenu === 'usuarios' ? styles.rotate180 : ''
                    }`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={styles.icon}
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                </button>
                {activeMenu === 'usuarios' && (
                  <ul className={styles.subMenu}>
                    <Link href="/dashBoard-Admin/usercontrol" onClick={handleSubMenuClick}>
                      <li>Control de Usuarios</li>
                    </Link>
                  </ul>
                )}
              </div>
            </li>

            <li>
              <div>
                <button
                  onClick={() => toggleMenu('membresias')}
                  className={styles.customButton}
                >
                  <span>Membresías</span>
                  <span
                    className={`${styles.transitionIcon} ${
                      activeMenu === 'membresias' ? styles.rotate180 : ''
                    }`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={styles.icon}
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                </button>
                {activeMenu === 'membresias' && (
                  <ul className={styles.subMenu}>
                    <Link href="/dashBoard-Admin/membership" onClick={handleSubMenuClick}>
                      <li>Historial de pago</li>
                    </Link>
                    <Link href="/dashBoard-Admin/membership/create-membership" onClick={handleSubMenuClick}>
                      <li>Crear nueva membresia</li>
                    </Link>
                  </ul>
                )}
              </div>
            </li>
          </ul>
        </div>

        <div className={styles.logout}>
          <Button variant={'destructive'} onClick={handleLogOut}>
            Cerrar sesión
          </Button>
        </div>
      </div>

      <div className={styles.main} onClick={closeSidebar}>{children}</div>
    </div>
  );
}

