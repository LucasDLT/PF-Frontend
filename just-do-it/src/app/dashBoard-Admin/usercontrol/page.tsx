'use client';

import { useState, useEffect, useMemo } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import styles from './UserList.module.css';

interface User {
  id: string;
  name: string;
  email: string;
  roles: string;
  membership_status: string;
}

interface ApiResponse {
  users: User[];
  totalElements: number;
  page: number;
  limit: number;
  totalPages: number;
}

const port = process.env.NEXT_PUBLIC_APP_API_PORT;

const fetchUsersFromAPI = async (page: number, limit: number): Promise<ApiResponse> => {
  const response = await fetch(`http://localhost:${port}/users?page=${page}&limit=${limit}`);
  if (!response.ok) {
    throw new Error('Failed to fetch users');
  }
  return await response.json();
};

export default function UserList() {
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

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const data = await fetchUsersFromAPI(1, 1000); // Fetch all users
        setAllUsers(data.users);
        setTotalPages(Math.ceil(data.users.length / ITEMS_PER_PAGE));
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

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
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Roles</TableHead>
                <TableHead>Estado</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.roles}</TableCell>
                  <TableCell>{user.membership_status}</TableCell>
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

