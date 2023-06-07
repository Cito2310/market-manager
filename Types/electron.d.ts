import { Ticket, Product } from './';

declare global {
    interface Window {
        electronAPI: {
            saveDataProduct: ( products: Product[] ) => Promise<void>,
            getDataProductsOffline: () => Promise<Product[]>,
            printPage: () => Promise<void>,
            saveTicket: ( ticketData: Ticket ) => Promise<void>
        }
    }
}