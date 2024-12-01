export async function fetchPayments(page = 1, limit = 10) {
  const API_URL = `${process.env.NEXT_PUBLIC_APP_API_DOMAIN}:${process.env.NEXT_PUBLIC_APP_API_PORT}`;

    const response = await fetch(`${API_URL}/payment?page=${page}&limit=${limit}`);
    if (!response.ok) {
      throw new Error('Failed to fetch payments');
    }
    return response.json();
  }
  
  