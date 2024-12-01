'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

interface Payment {
  payment_method: string;
}

export function PaymentPieChart() {
  const [chartData, setChartData] = useState({
    labels: [] as string[],
    datasets: [
      {
        label: 'Métodos de Pago',
        data: [] as number[],
        backgroundColor: ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'],
        borderWidth: 1,
      },
    ],
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_APP_API_DOMAIN}:${process.env.NEXT_PUBLIC_APP_API_PORT}/payment`);
        if (!response.ok) {
          throw new Error('Error al obtener los datos de pago');
        }
        const data = await response.json();
        const payments = data.data;

        const methodCounts = payments.reduce((acc: Record<string, number>, payment: Payment) => {
          acc[payment.payment_method] = (acc[payment.payment_method] || 0) + 1;
          return acc;
        }, {});

        setChartData({
          labels: Object.keys(methodCounts),
          datasets: [
            {
              label: 'Métodos de Pago',
              data: Object.values(methodCounts),
              backgroundColor: ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'],
              borderWidth: 1,
            },
          ],
        });
        setLoading(false);
      } catch (error) {
        console.error('Error fetching payment methods:', error);
        setError('Error al cargar los datos de los métodos de pago');
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  if (loading) {
    return <p>Cargando datos...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Distribución de Métodos de Pago</CardTitle>
        <CardDescription>Visualización de los métodos de pago utilizados</CardDescription>
      </CardHeader>
      <CardContent className="w-full">
        <Pie data={chartData} />
      </CardContent>
    </Card>
  );
}
