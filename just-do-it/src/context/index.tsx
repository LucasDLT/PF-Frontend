"use client"
import React, { useState, useEffect, createContext, useContext } from 'react';
import { SessionProvider } from 'next-auth/react';

// Definición de la sesión
interface Session {
  id: string | null;
  name: string;
  email: string;
  image: string | null;
  phone: string;
  address: string;
  country: string;
  roles: string[];
  membership_status: string;
}

// Definición del contexto
interface AuthContextType {
  token: string | null;
  userSession: Session;
  setToken: (token: string | null) => void;
  setSession: (userSession: Session) => void;
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

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userSession, setSessionState] = useState<Session>({
    id: null,
    name: '',
    email: '',
    image: null,
    phone: '',
    address: '',
    country: '',
    roles: [],
    membership_status: '',
  });
  const [token, setTokenState] = useState<string | null>(null);

  // Lógica para obtener datos de la sesión y el token
  useEffect(() => {
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
        roles: [],
        membership_status: '',
      });
      setTokenState(null);
    }
  }, []);

  // Función para establecer el token
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
        roles: [],
        membership_status: '',
      });
      localStorage.removeItem('token');
      localStorage.removeItem('userSession');
    } else {
      localStorage.setItem('token', newToken);
    }
  };

  // Función para manejar los datos de sesión
  const handleUserData = (userSession: Session) => {
    setSessionState(userSession);
    if (!userSession) {
      setTokenState(null);
      localStorage.removeItem('token');
      localStorage.removeItem('userSession');
    } else {
      localStorage.setItem('userSession', JSON.stringify(userSession));
    }
  };

  // Función para cerrar sesión
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
      roles: [],
      membership_status: '',
    });
    localStorage.removeItem('token');
    localStorage.removeItem('userSession');
  };

  return (
    <SessionProvider>
      <AuthContext.Provider
        value={{
          token,
          userSession,
          setToken: handleSetToken,
          setSession: handleUserData,
          logout,
        }}
      >
        {children}
      </AuthContext.Provider>
    </SessionProvider>
  );
};

export default AuthProvider;
