import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, Title, Tooltip, Legend, LineElement, PointElement } from 'chart.js';
import { ChartData, TooltipItem, ChartOptions } from 'chart.js';

// Registrar todos los elementos necesarios
ChartJS.register(CategoryScale, LinearScale, Title, Tooltip, Legend, LineElement, PointElement);

interface Payment {
  payment_date: string;
  amount: string;
}

interface ChartDataFormatted {
  date: string;
  amount: number;
}

export function PaymentChart() {
  const [chartData, setChartData] = useState<ChartDataFormatted[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPayments = async (page = 1, limit = 100) => {
      const API_URL = `${process.env.NEXT_PUBLIC_APP_API_DOMAIN}:${process.env.NEXT_PUBLIC_APP_API_PORT}`;
      try {
        const response = await fetch(`${API_URL}/payment?page=${page}&limit=${limit}`);
        if (!response.ok) {
          throw new Error('Failed to fetch payments');
        }
        const data = await response.json();
        const payments = data.payments;

        const processedData = payments.reduce(
          (acc: ChartDataFormatted[], payment: Payment) => {
            const date = new Date(payment.payment_date).toLocaleDateString();
            const existingEntry = acc.find(item => item.date === date);
            if (existingEntry) {
              existingEntry.amount += parseFloat(payment.amount);
            } else {
              acc.push({ date, amount: parseFloat(payment.amount) });
            }
            return acc;
          },
          []
        );

        processedData.sort(
          (a: ChartDataFormatted, b: ChartDataFormatted) =>
            new Date(a.date.split('/').reverse().join('-')).getTime() -
            new Date(b.date.split('/').reverse().join('-')).getTime()
        );

        setChartData(processedData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching payments:', error);
        setError('Error al cargar los datos');
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  const data: ChartData<'line'> = {
    labels: chartData.map(item => item.date),
    datasets: [
      {
        label: 'Pagos',
        data: chartData.map(item => item.amount),
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  const options: ChartOptions<'line'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem: TooltipItem<'line'>) => {
            return `$${(tooltipItem.raw as number).toFixed(2)}`;
          },
        },
      },
    },
    scales: {
      x: {
        type: 'category',
        ticks: {
          font: {
            size: 12,
          },
        },
      },
      y: {
        type: 'linear',
        suggestedMin: 0,
        ticks: {
          font: {
            size: 12,
          },
          callback: function (value) {
            const numericValue = typeof value === 'string' ? parseFloat(value) : value;
            return `$${numericValue.toFixed(2)}`;
          },
        },
      },
    },
  };

  if (loading) {
    return <p>Cargando datos...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <Card className="payment-card">
      <CardHeader>
        <CardTitle>Pagos Diarios</CardTitle>
        <CardDescription>Visualización de pagos día a día</CardDescription>
      </CardHeader>
      <CardContent className="card-content">
        <Line data={data} options={options} />
      </CardContent>
    </Card>
  );
}
