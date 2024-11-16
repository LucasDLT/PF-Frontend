
export interface Login {

    email: string;
    password: string;

}

export interface Register{
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    adrress: string;
    password: string;
    confirmPassword: string;

}

export interface Session{
id: string | null;
role: string | null;
firstName: string;
lastName: string;
email: string;
image: string|null;
phone: string;
address: string;



}