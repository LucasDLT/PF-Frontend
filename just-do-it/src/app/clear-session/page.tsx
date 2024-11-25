'use client';

;
import { useAuth } from '@/context';
import { signOut } from 'next-auth/react';

import { useEffect } from 'react';

function ClearSession() {
  const { logout } = useAuth();

  useEffect(() => {
    logout();
    signOut({ callbackUrl: '/' });
  }),
    [];

  return <div></div>;
}

export default ClearSession;
