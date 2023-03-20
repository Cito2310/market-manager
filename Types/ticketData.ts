export interface ITicketData {
    date: string,
    idTicket: string,
    products: {
        amount: number,
        price: number
        barcode: string, 
    }[]
}