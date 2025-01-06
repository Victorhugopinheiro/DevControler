

export interface TicketsProps{
    id: string;
    name: string;
    description: string;
    status: string;
    created_at: Date | null;
    update: Date | null;
    customerId: string | null;
    userID: string | null;
}