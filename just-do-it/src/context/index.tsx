'use client';

import React, { useState, createContext, useContext, useEffect } from 'react';
import { SessionProvider, useSession } from 'next-auth/react';

interface AuthContextProps {
  children: React.ReactNode;
}

interface Session {
  id: string | null;
  name: string;
  email: string;
  image: string | null;
}

interface AuthContextType {
  token: string | null;
  userSession: Session;
  setToken: (token: string | null) => void;
  setUserSession: (userSession: Session) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  token: null,
  userSession: { id: null, name: '', email: '', image: null },
  setToken: () => {},
  setUserSession: () => {},
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

const AuthProvider: React.FC<AuthContextProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [userSession, setUserSession] = useState<Session>({ id: null, name: '', email: '', image: null });

  // Usamos el useSession de next-auth para obtener la sesión actual de Google (u otros proveedores)
  const { data: session } = useSession();

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedSession = JSON.parse(localStorage.getItem('userSession') || 'null');

    if (session?.user) {
      setUserSession({
        id: session.user.id || null,
        name: session.user.name || '',
        email: session.user.email || '',
        image: session.user.image || null,
      });
      setToken(session?.accessToken || null);
    } else if (storedSession && storedToken) {
      setUserSession(storedSession);
      setToken(storedToken);
    } else {
      setUserSession({ id: null, name: '', email: '', image: null });
      setToken(null);
    }
  }, [session]);

  const handleSetToken = (newToken: string | null) => {
    setToken(newToken);
    if (newToken) {
      localStorage.setItem('token', newToken);
    } else {
      localStorage.removeItem('token');
    }
  };

  const handleSetUserSession = (newSession: Session) => {
    setUserSession(newSession);
    if (newSession) {
      localStorage.setItem('userSession', JSON.stringify(newSession));
    }
  };

  const logout = () => {
    setToken(null);
    setUserSession({ id: null, name: '', email: '', image: null });
    localStorage.removeItem('token');
    localStorage.removeItem('userSession');
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        setToken: handleSetToken,
        userSession,
        setUserSession: handleSetUserSession,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Este es el componente que envolvería tu aplicación con el `SessionProvider` de next-auth
const AppProvider: React.FC<AuthContextProps> = ({ children }) => {
  return (
    <SessionProvider>
      <AuthProvider>{children}</AuthProvider>
    </SessionProvider>
  );
};

export default AppProvider;
