'use client';

import { useState, useEffect } from 'react';


import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';


import { signOut } from 'next-auth/react';
import { useAuth } from '@/context';

interface Event {
  id: string;
  title: string;
  description: string;
  eventDate: string;
  eventAddress: string;
  eventLocation: string;
  price: number;
  stock: number;
  highlight: boolean;
  images: string[];
}

export default function EventsPage() {
 

  return (
    
   <h2>Clases</h2>
  );
}
