'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { fetchPayments } from "@/lib/api"
import styles from './PaymentHistory.module.css'

interface Payment {
  id: string;
  user_id: string;
  membership_id: string;
  payment_date: string;
  amount: string;
  payment_method: string;
  status: string;
  transaction_id: string;
  created_at: string;
}

export function PaymentHistory() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [sortBy, setSortBy] = useState<'payment_date' | 'amount'>('payment_date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const loadPayments = async () => {
      try {
        const data = await fetchPayments(currentPage);
        console.log(data);
        setPayments(data.payments || []);
        setTotalPages(data.totalPages || 1);
      } catch (error) {
        console.error("Error al cargar los pagos:", error);
      }
    };

    loadPayments();
  }, [currentPage]);

  const sortedPayments = [...payments].sort((a, b) => {
    const aValue = sortBy === 'payment_date' ? new Date(a.payment_date).getTime() : parseFloat(a.amount || '0');
    const bValue = sortBy === 'payment_date' ? new Date(b.payment_date).getTime() : parseFloat(b.amount || '0');

    if (sortOrder === 'asc') {
      return aValue - bValue;
    }
    return bValue - aValue;
  });

  const handleSort = (column: 'payment_date' | 'amount') => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('desc'); // default to descending order when changing columns
    }
  };

  return (
    <Card className={styles.card}>
      <CardHeader className={styles.cardHeader}>
        <CardTitle className={styles.cardTitle}>Historial de Pagos</CardTitle>
        <CardDescription className={styles.cardDescription}>Listado de pagos realizados</CardDescription>
      </CardHeader>
      <CardContent className={styles.cardContent}>
        <Table className={styles.table}>
          <TableHeader>
            <TableRow>
              <TableHead
                className={styles.tableHead}
                onClick={() => handleSort('payment_date')}
              >
                Fecha {sortBy === 'payment_date' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
              </TableHead>
              <TableHead
                className={styles.tableHead}
                onClick={() => handleSort('amount')}
              >
                Monto {sortBy === 'amount' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
              </TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Método de Pago</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedPayments.length > 0 ? (
              sortedPayments.map((payment) => (
                <TableRow key={payment.id} className={styles.tableRow}>
                  <TableCell className={styles.tableCell}>{new Date(payment.payment_date).toLocaleDateString()}</TableCell>
                  <TableCell className={`${styles.tableCell} ${styles.tableCellAmount}`}>${parseFloat(payment.amount).toFixed(2)}</TableCell>
                  <TableCell className={styles.tableCell}>{payment.status}</TableCell>
                  <TableCell className={styles.tableCell}>{payment.payment_method}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className={styles.tableCell}>No se encontraron pagos</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <div className="flex justify-between mt-4">
          <Button 
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={styles.paginationButton}
          >
            Anterior
          </Button>
          <span>Página {currentPage} de {totalPages}</span>
          <Button 
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className={styles.paginationButton}
          >
            Siguiente
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
