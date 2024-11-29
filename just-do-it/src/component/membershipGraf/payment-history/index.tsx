"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface Payment {
    id: string;  
    payment_date: string;
    amount: number;
    user: { name: string };
  }
  
  interface PaymentHistoryProps {
    payments: Payment[]; 
  }
  
  export function PaymentHistory({ payments }: PaymentHistoryProps) {
    const [sortBy, setSortBy] = useState("date");
  
    const sortedPayments = [...payments].sort((a, b) => {
      if (sortBy === "date") {
        return new Date(b.payment_date).getTime() - new Date(a.payment_date).getTime();
      } else if (sortBy === "amount") {
        return b.amount - a.amount;
      } else {
        return a.user.name.localeCompare(b.user.name);
      }
    });
  
    return (
      <Card>
        <CardHeader>
          <CardTitle>Historial de Pagos</CardTitle>
          <CardDescription>Listado de pagos realizados</CardDescription>
        </CardHeader>
        <CardContent>
          <div>
            <Select onValueChange={setSortBy} defaultValue={sortBy}>
              <SelectTrigger>
                <SelectValue placeholder="Ordenar por" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date">Fecha</SelectItem>
                <SelectItem value="amount">Monto</SelectItem>
                <SelectItem value="name">Nombre</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Fecha</TableHead>
                <TableHead>Nombre</TableHead>
                <TableHead>Monto</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedPayments.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell>{new Date(payment.payment_date).toLocaleDateString()}</TableCell>
                  <TableCell>{payment.user.name}</TableCell>
                  <TableCell>${payment.amount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    );
  }