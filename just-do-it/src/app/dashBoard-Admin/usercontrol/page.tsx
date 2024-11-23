'use client'

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
  roles: string[] | string;
  membership_status: string;
}

const PORT = process.env.NEXT_PUBLIC_APP_API_PORT;

const fetchUsers = async (page: number, limit: number): Promise<Session[]> => {
  const queryParams = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
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

  return response.json();
};

export default function UserList() {
  const [users, setUsers] = useState<Session[]>([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(10); // Cantidad de usuarios por página
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchUsers(page, limit);
      setUsers(data);
    } catch (error: any) {
      console.error('Error fetching users:', error);
      setError('Error al buscar usuarios, intente de nuevo');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  const totalPages = Math.ceil(users.length / limit); // Esto depende de cuántos usuarios totales tengas.

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Lista de usuarios</h1>

      {error && (
        <div className={styles.alert}>
          <strong>Error:</strong> {error}
        </div>
      )}

      {isLoading ? (
        <div className={styles.loading}>Loading...</div>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Correo electrónico</th>
              <th>Dirección</th>
              <th>Roles</th>
              <th>Subscripción</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.address}</td>
                <td>
                  {Array.isArray(user.roles)
                    ? user.roles.join(', ')
                    : user.roles}
                </td>
                <td>{user.membership_status}</td>
              </tr>
            ))}
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
          onClick={() => setPage((prev) => prev + 1)}
          disabled={isLoading}
          className={styles.paginationButton}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}
