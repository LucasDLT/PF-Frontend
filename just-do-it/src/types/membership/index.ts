export interface Membership {
    id: string;
    name: string;
    price: number;
    duration: number;
    description: string;
    created_at: Date;
    stripeProductId: string,
    stripePriceId: string,
}

export interface Payment {
    id: string; 
    user_id: string;
    membership_id: string;
    payment_date: string;
    amount: number; 
    payment_method: string;
    status: "completed" | "pending" | "canceled";
    transaction_id: string;
    created_at: string;
    membership: {
      id: string;
      name: string;
      price: string; 
      duration: number;
      description: string;
      created_at: string;
      stripeProductId: string;
      stripePriceId: string;
    };
    user: {
      id: string;
      name: string;
      email: string;
      password: string;
      phone: string;
      auth: string;
      roles: string;
      membership_status: string;
      country: string;
      address: string;
      image: string;
      created_At: string;
      updated_At: string;
    };
  }
  
  export interface ChartData {
    name: string;
    amount: number;
  }
  
  export interface PieData {
    name: string;
    value: number;
  }
  

