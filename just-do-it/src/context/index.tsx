'use client';

import React, { useState, createContext, useContext, useEffect } from 'react';

interface AuthContextProps {
  children: React.ReactNode;
}

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

interface AuthContextType {
  token: string | null;
  userSession: Session;
  setToken: (token: string | null) => void;
  setUserSession: (userSession: Session) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  token: null,
  userSession: {
    id: null,
    name: '',
    email: '',
    image: null,
    phone: '',
    address: '',
    country: '',
    roles: [],
    membership_status: ''
  },
  setToken: () => {},
  setUserSession: () => {},
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

const AuthProvider: React.FC<AuthContextProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [userSession, setUserSession] = useState<Session>({
    id: null,
    name: '',
    email: '',
    image: null,
    phone: '',
    address: '',
    country: '',
    roles: [],
    membership_status: ''
  });

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUserSession = JSON.parse(localStorage.getItem('userSession') || 'null');

    if (storedUserSession && storedToken) {
      setUserSession(storedUserSession);
      setToken(storedToken);
    } else {
      setUserSession({
        id: null,
        name: '',
        email: '',
        image: null,
        phone: '',
        address: '',
        country: '',
        roles: [],
        membership_status: ''
      });
      setToken(null);
    }
  }, []);

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
    setUserSession({
      id: null,
      name: '',
      email: '',
      image: null,
      phone: '',
      address: '',
      country: '',
      roles: [],
      membership_status: ''
    });
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

export default AuthProvider;
