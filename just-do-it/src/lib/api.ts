export async function fetchPayments(page = 1, limit = 10, token: string) {
  const API_URL = `${process.env.NEXT_PUBLIC_APP_API_DOMAIN}:${process.env.NEXT_PUBLIC_APP_API_PORT}`;

  const response = await fetch(`${API_URL}/payment?page=${page}&limit=${limit}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`, // Token en los headers
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch payments');
  }
  return response.json();
}

  