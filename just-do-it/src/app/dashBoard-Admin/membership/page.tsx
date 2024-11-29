"use client"

import { useState, useEffect } from "react";
import { PaymentChart } from "@/component/membershipGraf/payment-chart";
import { PaymentHistory } from "@/component/membershipGraf/payment-history";
import { PaymentPieChart } from "@/component/membershipGraf/payment-pie-chart";
import { Payment, ChartData, PieData } from "@/types/membership"; 

interface AdminDashboardProps {
  initialPayments: Payment[];
  initialChartData: ChartData[];
  initialPieData: PieData[];
}

export default function AdminDashboard({
  initialPayments,
  initialChartData,
  initialPieData
}: AdminDashboardProps) {
  const [page, setPage] = useState(1);  // Paginación inicial
  const [limit, setLimit] = useState(10); // Límite por página
  const [payments, setPayments] = useState<Payment[]>(initialPayments);
  const [chartData, setChartData] = useState<ChartData[]>(initialChartData);
  const [pieData, setPieData] = useState<PieData[]>(initialPieData);

  const API_URL = `${process.env.NEXT_PUBLIC_APP_API_DOMAIN}:${process.env.NEXT_PUBLIC_APP_API_PORT}`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_URL}/payment?page=${page}&limit=${limit}`);
        if (!response.ok) {
          throw new Error('Failed to fetch payments');
        }
        const data = await response.json();

        // Asegúrate de que los datos son válidos y son un arreglo
        if (Array.isArray(data)) {
          const chartData = data.map((payment: any) => ({
            name: new Date(payment.payment_date).toLocaleDateString(),
            amount: Number(payment.amount),
          }));

          const pieData = [
            { name: "Pagos Completados", value: data.filter((p: any) => p.status === "completed").length },
            { name: "Pagos Pendientes", value: data.filter((p: any) => p.status === "pending").length },
            { name: "Pagos Cancelados", value: data.filter((p: any) => p.status === "canceled").length },
          ];

          setPayments(data);
          setChartData(chartData);
          setPieData(pieData);
        } else {
          console.error("Data is not valid or empty");
        }
      } catch (error) {
        console.error("Error fetching payments:", error);
      }
    };

    fetchData();
  }, [page, limit]);  // Dependencias de la paginación

  // Verifica si payments es un arreglo antes de usar reduce
  const totalAmount = Array.isArray(payments) ? payments.reduce((acc, payment) => acc + payment.amount, 0) : 0;

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">Panel de Administración</h1>
      <div className="grid gap-8 mb-8 md:grid-cols-2">
        <PaymentChart data={chartData} />
        <PaymentPieChart data={pieData} />
      </div>
      <div className="grid gap-8">
        <PaymentHistory payments={payments} />
      </div>
    </div>
  );
}
