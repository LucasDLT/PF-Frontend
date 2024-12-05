export interface Login {
  email: string;
  password: string;
}

export interface Register {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  adrress: string;
  password: string;
  paswordConfirmation: string;
}

export interface Session {
  id: string | null;
  name: string | null;
  email: string;
  image: string | undefined;
  phone: string;
  address: string;
  country: string;
  roles: string;
  membership_status: string;
  auth:string;
  banned:boolean;
}
