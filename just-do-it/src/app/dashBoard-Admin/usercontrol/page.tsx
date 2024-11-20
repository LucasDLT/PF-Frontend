'use client';

import { useState, useEffect } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import { signOut } from 'next-auth/react';
import { useAuth } from '@/context';

interface User {
  id: string;
  name: string;
  email: string;
  status: 'active' | 'partialactive' | 'pending' | 'banned' | 'inactive';
  role: 'user' | 'admin' | 'superadmin';
  image: string;
  previousStatus?: string;
}

export default function AdminPanel() {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [statusFilter, setStatusFilter] = useState<
    'all' | 'active' | 'inactive'
  >('all');
  const [nameFilter, setNameFilter] = useState('');
  const { userSession, token, logout } = useAuth();

  const fetchUsers = async () => {
    try {
      console.log('Funcion fetchUsers', token);
      const response = await fetch('http://localhost:3003/auth/user/get/all', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setUsers(data);
      } else {
        console.error('Error fetching users:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    if (userSession) {
      fetchUsers();
    }
  }, [userSession]);

  const handleToggleAction = async (id: string) => {
    const currentUser = users.find((u) => u.id === id);

    if (!currentUser) {
      console.error('User not found');
      return;
    }

    const newStatus:
      | 'active'
      | 'partialactive'
      | 'pending'
      | 'banned'
      | 'inactive' =
      currentUser.status === 'banned'
        ? (currentUser.previousStatus as
            | 'active'
            | 'partialactive'
            | 'pending'
            | 'banned'
            | 'inactive')
        : 'banned';

    try {
      const response = await fetch(
        `http://localhost:3003/auth/user/ban/${id}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );

      // if (response.status === 441) {
      //   toast.error(`Su cuenta ah sido suspendida, por favor contactarse con nosotros via Email`)
      //   logout()
      //   signOut({ callbackUrl: '/' });
      // }

      if (response.ok) {
        const updatedUser = {
          ...currentUser,
          status: newStatus,
          previousStatus: currentUser.status,
        };

        setUsers((prevUsers) =>
          prevUsers.map((u) => (u.id === id ? updatedUser : u)),
        );
      } else {
        console.error('Error updating user status:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating user status:', error);
    }
  };

  const handleToggleAdminRole = async (id: string) => {
    try {
      const response = await fetch(
        `http://localhost:3003/auth/user/role/administrator/${id}`,
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
        const updatedUser = await response.json();
        setUsers((prevUsers) =>
          prevUsers.map((u) =>
            u.id === id ? { ...u, role: updatedUser.role } : u,
          ),
        );
      } else {
        console.error('Error updating user admin role:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating user admin role:', error);
    }
  };

  useEffect(() => {
    const filtered = users
      .filter((user) => {
        if (statusFilter === 'active')
          return user.status === 'active' || user.status === 'partialactive';
        if (statusFilter === 'inactive') return user.status === 'banned';
        return true;
      })
      .filter((user) =>
        user.name.toLowerCase().includes(nameFilter.toLowerCase()),
      );

    setFilteredUsers(filtered);
  }, [statusFilter, nameFilter, users]);

  return (
   <div>
    <h3>Control de usuarios</h3>
   </div>
  );
}
