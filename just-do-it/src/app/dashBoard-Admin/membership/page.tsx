'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context';

{/*import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';*/}

import { signOut } from 'next-auth/react';

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
  const [donations, setDonations] = useState<AdminDonation[]>([]);
  const [filteredDonations, setFilteredDonations] = useState<AdminDonation[]>(
    [],
  );
  const [statusFilter, setStatusFilter] = useState<
    'todas' | 'active' | 'pending'
  >('todas');
  const [nameFilter, setNameFilter] = useState('');
  const { userSession, token, logout } = useAuth();

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
        const data = await response.json();
        setDonations(data);
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

  const handleConfirmPayment = async (id: string) => {
    try {
      const response = await fetch(
        `http://localhost:${port}/auth/payment/donation/confirm/${id}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (response.status === 441) {
        
        logout()
        signOut({ callbackUrl: '/' });
      }
      if (response.ok) {
        await fetchDonations();
        
      } else {
        console.error('Error confirming payment:', response.statusText);
      }
    } catch (error) {
      console.error('Error confirming payment:', error);
    }
  };

  const handleCancelPayment = async (id: string) => {
    try {
      const response = await fetch(
        `http://localhost:${port}/auth/payment/donation/reject/${id}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.status === 441) {
       
        logout()
        signOut({ callbackUrl: '/' });
      }

      if (response.ok) {
        await fetchDonations();
        
      } else {
        console.error('Error canceling payment:', response.statusText);
      }
    } catch (error) {
      console.error('Error canceling payment:', error);
    }
  };

  useEffect(() => {
    const filtered = donations.filter((donation) => {
      if (statusFilter === 'active') return donation.status === 'active';
      if (statusFilter === 'pending') return donation.status === 'pending';
      return true;
    });

    setFilteredDonations(filtered);
  }, [statusFilter, nameFilter, donations]);

  return (
    <div>
      <h1>Historial de pagos</h1>
    </div>
  );
}
