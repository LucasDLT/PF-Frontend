'use client';
import React, { useState, useEffect, createContext, useContext } from 'react';
import { SessionProvider } from 'next-auth/react';
import { Session } from '@/types/users';

export interface Class {
  id: string;
  name: string;
  description: string;
  location: string;
  capacity: number;
  current_participants: number;
  schedule: string;
  imgUrl: string;
  trainerName: string;
}

// Definición del contexto
interface AuthContextType {
  token: string | null;
  userSession: Session;
  classes: Class[] | null;
  setToken: (token: string | null) => void;
  setSession: (userSession: Session) => void;
  setClasses: (classes: Class[] | null) => void;
  fetchClasses: () => Promise<void>;
  logout: () => void;
}

// Creación del contexto
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const PORT = process.env.NEXT_PUBLIC_APP_API_PORT;
  const [userSession, setSessionState] = useState<Session>({
    id: null,
    name: '',
    email: '',
    image: null,
    phone: '',
    address: '',
    country: '',
    roles: '',
    membership_status: '',
    auth:""
  });
  const [token, setTokenState] = useState<string | null>(null);
  const [classes, setClasses] = useState<Class[] | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedToken = localStorage.getItem('token');
      const storedSession = localStorage.getItem('userSession');

      if (storedToken && storedSession) {
        try {
          const parsedSession = JSON.parse(storedSession);
          setSessionState(parsedSession);
          setTokenState(storedToken);
        } catch (error) {
          console.error('Error al parsear la sesión almacenada:', error);
        }
      } else {
        setSessionState({
          id: null,
          name: '',
          email: '',
          image: null,
          phone: '',
          address: '',
          country: '',
          roles: '',
          membership_status: '',
          auth:""
        });
        setTokenState(null);
      }
    }
  }, []);

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    try {
      const response = await fetch(`http://localhost:${PORT}/classes`, {
        method: 'GET',
      });
      if (response.ok) {
        const data: Class[] = await response.json();
        setClasses(data);
      } else {
        console.error('Error fetching classes:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching classes:', error);
    }
  };

  const handleSetToken = (newToken: string | null) => {
    setTokenState(newToken);
    if (!newToken) {
      setSessionState({
        id: null,
        name: '',
        email: '',
        image: null,
        phone: '',
        address: '',
        country: '',
        roles: '',
        membership_status: '',
        auth:""
      });
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
        localStorage.removeItem('userSession');
      }
    } else {
      if (typeof window !== 'undefined') {
        localStorage.setItem('token', newToken);
      }
    }
  };

  const handleUserData = (userSession: Session) => {
    setSessionState(userSession);
    if (!userSession) {
      setTokenState(null);
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
        localStorage.removeItem('userSession');
      }
    } else {
      if (typeof window !== 'undefined') {
        localStorage.setItem('userSession', JSON.stringify(userSession));
      }
    }
  };

  const logout = () => {
    setTokenState(null);
    setSessionState({
      id: null,
      name: '',
      email: '',
      image: null,
      phone: '',
      address: '',
      country: '',
      roles: '',
      membership_status: '',
      auth:""
    });

    setClasses(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      localStorage.removeItem('userSession');
    }
  };

  return (
    <SessionProvider>
      <AuthContext.Provider
        value={{
          token,
          userSession,
          classes,
          setToken: handleSetToken,
          setSession: handleUserData,
          setClasses,
          fetchClasses,
          logout,
        }}
      >
        {children}
      </AuthContext.Provider>
    </SessionProvider>
  );
};

export default AuthProvider;
