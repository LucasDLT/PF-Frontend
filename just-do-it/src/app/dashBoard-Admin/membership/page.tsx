'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context';

type AdminDonation = {
  id: string;
  email: string;
  amount: number;
  date: string;
  status: 'active' | 'pending';
  createdAt: string;
};

const port = process.env.NEXT_PUBLIC_APP_API_PORT;

export default function AdminDonaciones() {


  const { userSession, token,  } = useAuth();

  const fetchDonations = async (): Promise<void> => {
    if (!userSession) return;

    try {
      const response = await fetch(`http://localhost:${port}/auth/donations`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        
      } else {
        console.error('Error fetching donations:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching donations:', error);
    }
  };

  useEffect(() => {
    fetchDonations();
  }, [userSession]);

  


  return (
    <div>
      <h1>Historial de pagos</h1>
    </div>
  );
}
