'use client'

import { useState, useEffect } from 'react'
import styles from './UserList.module.css'

interface Session {
  id: string | null;
  name: string | null;
  email: string;
  image: string | null;
  phone: string;
  address: string;
  country: string;
  roles: string[];
  membership_status: string;
}

interface ApiResponse {
  users: Session[];
  total: number;
}

const PORT = process.env.NEXT_PUBLIC_APP_API_PORT
const fetchUsers = async (page: number, filters: any): Promise<ApiResponse> => {
  const queryParams = new URLSearchParams({
    page: page.toString(),
    ...filters
  }).toString()

  const response = await fetch(`http://localhost:${PORT}}/users`)
  if (!response.ok) {
    throw new Error('Failed to fetch users')
  }
  return response.json()
}

export default function UserList() {
  const [users, setUsers] = useState<Session[]>([])
  const [page, setPage] = useState(1)
  const [totalUsers, setTotalUsers] = useState(0)
  const [filters, setFilters] = useState({
    name: '',
    country: '',
    role: '',
    status: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchData = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const { users, total } = await fetchUsers(page, filters)
      setUsers(users)
      setTotalUsers(total)
    } catch (error) {
      console.error('Error fetching users:', error)
      setError('Failed to fetch users. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [page, filters])

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: value === 'all' ? '' : value
    }))
    setPage(1) // Reset to first page when filters change
  }

  const totalPages = Math.ceil(totalUsers / 10)

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>User List</h1>
      
      {error && (
        <div className={styles.alert}>
          <strong>Error:</strong> {error}
        </div>
      )}
      
      <div className={styles.filters}>
        <input
          type="text"
          placeholder="Filter by name"
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
          <option value="">All Roles</option>
          <option value="user">User</option>
          <option value="admin">Admin</option>
          <option value="moderator">Moderator</option>
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
              <th>Name</th>
              <th>Email</th>
              <th>Country</th>
              <th>Roles</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.country}</td>
                <td>{user.roles.join(', ')}</td>
                <td>{user.membership_status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div className={styles.pagination}>
        <button 
          onClick={() => setPage(prev => Math.max(prev - 1, 1))}
          disabled={page === 1 || isLoading}
          className={styles.paginationButton}
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
          <button
            key={pageNum}
            onClick={() => setPage(pageNum)}
            disabled={isLoading}
            className={`${styles.paginationButton} ${pageNum === page ? styles.activePage : ''}`}
          >
            {pageNum}
          </button>
        ))}
        <button 
          onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages || isLoading}
          className={styles.paginationButton}
        >
          Next
        </button>
      </div>
    </div>
  )
}