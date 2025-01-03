'use client';

import { useState, useEffect, useMemo } from 'react';
import styles from './UserList.module.css';
import { useAuth } from '@/context';
import { toast } from 'sonner';
import { ConfirmDialog } from '@/component/customConfirm';

interface User {
  id: string;
  name: string;
  email: string;
  roles: string;
  membership_status: string;
  banned: boolean;
}

interface ApiResponse {
  users: User[];
  totalElements: number;
  page: number;
  limit: number;
  totalPages: number;
}

const DOMAIN = process.env.NEXT_PUBLIC_APP_API_DOMAIN;

export default function UserList() {
  const { userSession, token } = useAuth();

  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [filters, setFilters] = useState({
    search: '',
    status: 'all',
    role: 'all',
  });
  const [isLoading, setIsLoading] = useState(false);
  const ITEMS_PER_PAGE = 5;
  
  // Confirmation dialog state
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [actionType, setActionType] = useState<'ban' | 'unban' | null>(null);

  const fetchUsersFromAPI = async (page: number, limit: number): Promise<ApiResponse> => {
    const response = await fetch(`${DOMAIN}/users?page=${page}&limit=${limit}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }

    return await response.json();
  };

  const banUser = async (userId: string) => {
    try {
      const response = await fetch(`${DOMAIN}/users/ban/${userId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to ban user');
      }

      setAllUsers(prevUsers =>
        prevUsers.map(user =>
          user.id === userId ? { ...user, banned: true } : user
        )
      );
      toast.success('Usuario baneado con éxito');
    } catch (error) {
      console.error('Error banning user:', error);
    }
  };

  const unbanUser = async (userId: string) => {
    try {
      const response = await fetch(`${DOMAIN}/users/unban/${userId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to unban user');
      }

      setAllUsers(prevUsers =>
        prevUsers.map(user =>
          user.id === userId ? { ...user, banned: false } : user
        )
      );
      toast.success('Usuario desbaneado con éxito');
    } catch (error) {
      console.error('Error unbanning user:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const data = await fetchUsersFromAPI(1, 1000);
        setAllUsers(data.users);
        setTotalPages(Math.ceil(data.users.length / ITEMS_PER_PAGE));
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [token]);

  const filteredUsers = useMemo(() => {
    return allUsers.filter(user => {
      const matchesSearch = user.name.toLowerCase().includes(filters.search.toLowerCase()) ||
                            user.email.toLowerCase().includes(filters.search.toLowerCase());
      const matchesStatus = filters.status === 'all' || user.membership_status === filters.status;
      const matchesRole = filters.role === 'all' || user.roles === filters.role;
      return matchesSearch && matchesStatus && matchesRole;
    });
  }, [allUsers, filters]);

  const paginatedUsers = useMemo(() => {
    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    return filteredUsers.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredUsers, page]);

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: value,
    }));
    setPage(1);
  };

  useEffect(() => {
    setTotalPages(Math.ceil(filteredUsers.length / ITEMS_PER_PAGE));
  }, [filteredUsers]);

  const handleBanUserConfirmation = (userId: string) => {
    setSelectedUserId(userId);
    setActionType('ban');
    setIsConfirmDialogOpen(true);
  };

  const handleUnbanUserConfirmation = (userId: string) => {
    setSelectedUserId(userId);
    setActionType('unban');
    setIsConfirmDialogOpen(true);
  };

  const handleConfirmAction = () => {
    if (actionType === 'ban' && selectedUserId) {
      banUser(selectedUserId);
    } else if (actionType === 'unban' && selectedUserId) {
      unbanUser(selectedUserId);
    }
    setIsConfirmDialogOpen(false);
    setActionType(null);
    setSelectedUserId(null);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Lista de Usuarios</h1>

      <div className={styles.filters}>
        <input
          type="text"
          placeholder="Buscar por nombre o email"
          value={filters.search}
          onChange={(e) => handleFilterChange('search', e.target.value)}
          className={styles.filterInput}
          aria-label="Buscar por nombre o email"
        />
        <select
          onChange={(e) => handleFilterChange('status', e.target.value)}
          value={filters.status}
          className={styles.filterSelect}
          aria-label="Filtrar por estado"
        >
          <option value="all">Todos los estados</option>
          <option value="active">Activo</option>
          <option value="inactive">Inactivo</option>
        </select>
        <select
          onChange={(e) => handleFilterChange('role', e.target.value)}
          value={filters.role}
          className={styles.filterSelect}
          aria-label="Filtrar por rol"
        >
          <option value="all">Todos los roles</option>
          <option value="super">Super</option>
          <option value="admin">Admin</option>
          <option value="trainer">Trainer</option>
        </select>
      </div>

      {isLoading ? (
        <div className={styles.loading} aria-live="polite">Cargando...</div>
      ) : (
        <>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.tableHeader}>Nombre</th>
                <th className={styles.tableHeader}>Email</th>
                <th className={styles.tableHeader}>Roles</th>
                <th className={styles.tableHeader}>Estado</th>
                <th className={styles.tableHeader}>Baneado</th>
                <th className={styles.tableHeader}>Acciones</th>
              </tr>
            </thead>
            <tbody className={styles.tableBody}>
              {paginatedUsers.map((user) => (
                <tr key={user.id} className={styles.tableRow}>
                  <td className={styles.tableCell}>{user.name}</td>
                  <td className={styles.tableCell}>{user.email}</td>
                  <td className={styles.tableCell}>{user.roles}</td>
                  <td className={styles.tableCell}>{user.membership_status}</td>
                  <td className={styles.tableCell}>{user.banned ? 'Sí' : 'No'}</td>
                  <td className={styles.tableCell}>
                    {!['admin', 'super', 'trainer'].includes(user.roles) && (
                      <button
                        onClick={() => user.banned ? handleUnbanUserConfirmation(user.id) : handleBanUserConfirmation(user.id)}
                        className={`${styles.button} ${styles.buttonOutline}`}
                      >
                        {user.banned ? 'Desbanear' : 'Banear'}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className={styles.pagination}>
            <button
              className={`${styles.button} ${styles.buttonOutline}`}
              onClick={handlePreviousPage}
              disabled={page === 1}
            >
              Anterior
            </button>
            <span>{`Página ${page} de ${totalPages}`}</span>
            <button
              className={`${styles.button} ${styles.buttonOutline}`}
              onClick={handleNextPage}
              disabled={page === totalPages}
            >
              Siguiente
            </button>
          </div>
        </>
      )}

      {/* Confirm Dialog for ban/unban */}
      <ConfirmDialog
        isOpen={isConfirmDialogOpen}
        onClose={() => setIsConfirmDialogOpen(false)}
        onConfirm={handleConfirmAction}
        description={`¿Estás seguro de que quieres ${actionType === 'ban' ? 'banear' : 'desbanear'} a este usuario?`} title={''}      />
    </div>
  );
}
