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

