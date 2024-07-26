export interface Ticket {
    date: string;
    idTicket: string;
    products: ProductForTicket[]
}

export interface ProductForTicket {
    total: number;
    amount: number;
    barcode: string;
}