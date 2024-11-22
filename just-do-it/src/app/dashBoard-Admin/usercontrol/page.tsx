'use client';

import { useState, useEffect } from 'react';
import styles from './UserList.module.css';

interface Session {
  id: string | null;
  name: string | null;
  email: string;
  image: string | null;
  phone: string;
  address: string;
  country: string;
  roles: string; 
  membership_status: string;
}

interface ApiResponse {
  users: Session[];
  total: number;
}

const PORT = process.env.NEXT_PUBLIC_APP_API_PORT;

const RoleDescriptions: Record<string, string> = {
  ADMIN: 'Administrador',
  USER: 'Usuario',
  MODERATOR: 'Entrenador',
};

export default function UserList() {
  const [users, setUsers] = useState<Session[]>([]);
  const [page, setPage] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);
  const [filters, setFilters] = useState({
    name: '',
    country: '',
    role: '',
    status: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = async (page: number, filters: any): Promise<ApiResponse> => {
    const queryParams = new URLSearchParams({
      page: page.toString(),
      ...filters,
    }).toString();

    if (!PORT) {
      throw new Error(
        'El puerto de la API no está configurado. Verifica la variable NEXT_PUBLIC_APP_API_PORT'
      );
    }

    const response = await fetch(`http://localhost:${PORT}/users?${queryParams}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch users. Status: ${response.status}`);
    }

    const data: Session[] = await response.json();
    return { users: data, total: data.length };
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const { users, total } = await fetchUsers(page, filters);
        setUsers(users);
        setTotalUsers(total);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [page, filters]);

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value === 'all' ? '' : value,
    }));
    setPage(1);
  };

  const totalPages = Math.ceil(totalUsers / 10);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Lista de usuarios</h1>

      {error && (
        <div className={styles.alert}>
          <strong>Error:</strong> {error}
        </div>
      )}

      <div className={styles.filters}>
        <input
          type="text"
          placeholder="Filtrar por nombre"
          value={filters.name}
          onChange={(e) => handleFilterChange('name', e.target.value)}
          className={styles.input}
        />
        <select
          onChange={(e) => handleFilterChange('country', e.target.value)}
          className={styles.select}
        >
          <option value="">All Countries</option>
          <option value="USA">USA</option>
          <option value="Canada">Canada</option>
          <option value="Mexico">Mexico</option>
          <option value="UK">UK</option>
          <option value="France">France</option>
        </select>
        <select
          onChange={(e) => handleFilterChange('role', e.target.value)}
          className={styles.select}
        >
          <option value="">Todos los usuarios</option>
          <option value="USER">Usuario</option>
          <option value="ADMIN">Administrador</option>
          <option value="MODERATOR">Entrenador</option>
        </select>
        <select
          onChange={(e) => handleFilterChange('status', e.target.value)}
          className={styles.select}
        >
          <option value="">All Statuses</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="pending">Pending</option>
        </select>
      </div>

      {isLoading ? (
        <div className={styles.loading}>Loading...</div>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Correo electronico</th>
              <th>Direccion</th>
              <th>Roles</th>
              <th>Subscripcion</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user.id}>
                  <td>{user.name || 'Sin nombre'}</td>
                  <td>{user.email || 'Sin correo'}</td>
                  <td>{user.address || 'Sin dirección'}</td>
                  <td>
                    {RoleDescriptions[user.roles as keyof typeof RoleDescriptions] ||
                      'Rol desconocido'}
                  </td>
                  <td>{user.membership_status || 'Sin estado'}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5}>No se encontraron usuarios.</td>
              </tr>
            )}
          </tbody>
        </table>
      )}

      <div className={styles.pagination}>
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1 || isLoading}
          className={styles.paginationButton}
        >
          Anterior
        </button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
          <button
            key={pageNum}
            onClick={() => setPage(pageNum)}
            disabled={isLoading}
            className={`${styles.paginationButton} ${
              pageNum === page ? styles.activePage : ''
            }`}
          >
            {pageNum}
          </button>
        ))}
        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages || isLoading}
          className={styles.paginationButton}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}
