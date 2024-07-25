export interface Ticket {
    date: string;
    idTicket: string;
    products: {
        total: number;
        amount: number;
        barcode: string;
    }[]
}