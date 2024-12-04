'use client';

import { useState, useEffect, useMemo } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import styles from './editclasses.module.css';
import { useAuth } from '@/context';

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
        method: 'POST',
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
    } catch (error) {
      console.error('Error banning user:', error);
    }
  };

  const unbanUser = async (userId: string) => {
    try {
      const response = await fetch(`${DOMAIN}/users/unban/${userId}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to unban user');
      }

      // Update the user's banned status in the local state
      setAllUsers(prevUsers =>
        prevUsers.map(user =>
          user.id === userId ? { ...user, banned: false } : user
        )
      );
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
          <option value="all">Membresia</option>
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
          <Table className={styles.table}>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Roles</TableHead>
                <TableHead>Membresia</TableHead>
                <TableHead>Baneado</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.roles}</TableCell>
                  <TableCell>{user.membership_status}</TableCell>
                  <TableCell>{user.banned ? 'Sí' : 'No'}</TableCell>
                  <TableCell>
                    {!['admin', 'super', 'trainer'].includes(user.roles) && (
                      <Button
                        onClick={() => user.banned ? unbanUser(user.id) : banUser(user.id)}
                        variant="outline"
                      >
                        {user.banned ? 'Desbanear' : 'Banear'}
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className={styles.paginationInfo} aria-live="polite">
            Mostrando {paginatedUsers.length} de {filteredUsers.length} usuarios
          </div>

          <Pagination className={styles.pagination}>
            <PaginationContent>
              <PaginationItem>
                <Button
                  onClick={handlePreviousPage}
                  disabled={page === 1}
                  variant="outline"
                  aria-label="Página anterior"
                >
                  Anterior
                </Button>
              </PaginationItem>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                <PaginationItem key={pageNum}>
                  <PaginationLink
                    onClick={() => setPage(pageNum)}
                    isActive={pageNum === page}
                    aria-label={`Ir a la página ${pageNum}`}
                    aria-current={pageNum === page ? 'page' : undefined}
                  >
                    {pageNum}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <Button
                  onClick={handleNextPage}
                  disabled={page === totalPages}
                  variant="outline"
                  aria-label="Página siguiente"
                >
                  Siguiente
                </Button>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </>
      )}
    </div>
  );
}

