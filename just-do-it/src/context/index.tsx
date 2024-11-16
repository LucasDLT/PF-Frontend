'use client';

import React, { useState, createContext, useContext, useEffect } from 'react';
import { SessionProvider, useSession } from 'next-auth/react';
import { Session } from '@/types/users';

interface AuthContextProps {
  children: React.ReactNode;
}

interface SessionGoogle {
  id: string | null;
  name: string;
  email: string;
  image: string | null;
}

interface AuthContextType {
  token: string | null;
  userSession: Session; // Esta es la sesión del usuario normal (registro)
  googleSession: SessionGoogle; // Esta es la sesión de Google
  setToken: (token: string | null) => void;
  setUserSession: (userSession: Session) => void;
  setGoogleSession: (googleSession: SessionGoogle) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  token: null,
  userSession: { id: null, role: null, firstName: '', lastName: "", email: '', image: null, phone: "", address: "" },
  googleSession: { id: null, name: '', email: '', image: null },
  setToken: () => {},
  setUserSession: () => {},
  setGoogleSession: () => {},
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

const AuthProvider: React.FC<AuthContextProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [userSession, setUserSession] = useState<Session>({ id: null, role: null, firstName: '', lastName: "", email: '', image: null, phone: "", address: "" });
  const [googleSession, setGoogleSession] = useState<SessionGoogle>({ id: null, name: '', email: '', image: null });

  // Usamos el useSession de next-auth para obtener la sesión actual de Google (u otros proveedores)
  const { data: session } = useSession();

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUserSession = JSON.parse(localStorage.getItem('userSession') || 'null');
    const storedGoogleSession = JSON.parse(localStorage.getItem('googleSession') || 'null');

    if (session?.user) {
      // Si existe una sesión de Google
      setGoogleSession({
        id: session.user.id || null,
        name: session.user.name || '',
        email: session.user.email || '',
        image: session.user.image || null,
      });
      setToken(session?.accessToken || null);
    } else if (storedGoogleSession) {
      // Si existe una sesión de Google almacenada
      setGoogleSession(storedGoogleSession);
    } else if (storedUserSession && storedToken) {
      // Si existe una sesión de usuario normal almacenada
      setUserSession(storedUserSession);
      setToken(storedToken);
    } else {
      setGoogleSession({ id: null, name: '', email: '', image: null });
      setUserSession({ id: null, role: null, firstName: '', lastName: "", email: '', image: null, phone: "", address: "" });
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

  const handleSetGoogleSession = (newSession: SessionGoogle) => {
    setGoogleSession(newSession);
    if (newSession) {
      localStorage.setItem('googleSession', JSON.stringify(newSession));
    }
  };

  const logout = () => {
    setToken(null);
    setUserSession({ id: null, role: null, firstName: '', lastName: "", email: '', image: null, phone: "", address: "" });
    setGoogleSession({ id: null, name: '', email: '', image: null });
    localStorage.removeItem('token');
    localStorage.removeItem('userSession');
    localStorage.removeItem('googleSession');
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        setToken: handleSetToken,
        userSession,
        setUserSession: handleSetUserSession,
        googleSession,
        setGoogleSession: handleSetGoogleSession,
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
