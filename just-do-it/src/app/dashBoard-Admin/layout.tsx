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
  const { userSession, token, logout } = useAuth();

  useEffect(() => {
    
    if (!userSession || !token) {
      Router.push('/login');
    } 
    
    else if (userSession.roles === 'user' || userSession.roles === 'associate') {
      Router.push('/');
    }
  }, [userSession, token, Router]); 

  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const toggleMenu = (menuName: string) => {
    setActiveMenu((prevMenu) => (prevMenu === menuName ? null : menuName));
  };

  const handleLogOut = () => {
    signOut({ callbackUrl: '/' });
    logout();
  };

  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <div className="flex-1 px-4 py-6">
          <ul className="mt-6 space-y-1">
            <Link href="/dashBoard-Admin">
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
                      className="size-5"
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
                    <li>
                      <Link href="/dashBoard-Admin/classes/currentclasses">
                        Crear Clase
                      </Link>
                    </li>
                    <li>
                      <Link href="/dashBoard-Admin/classes/editclasses">
                        Ver y Editar Clases
                      </Link>
                    </li>
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
                      className="size-5"
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
                    <li>
                      <Link href="/dashBoard-Admin/usercontrol">
                        Control de Usuarios
                      </Link>
                    </li>
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
                      className="size-5"
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
                    <li>
                      <Link href="/dashBoard-Admin/membership">
                        Historial de pago
                      </Link>
                    </li>
                    <li>
                      <Link href="/dashBoard-Admin/membership/create-membership">
                        Crear nueva membresia
                      </Link>
                    </li>
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

      <div className={styles.main}>{children}</div>
    </div>
  );
}
