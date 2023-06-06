import { IProduct } from '../backup/src/interfaces/IProduct';
import { Product } from './product';
import { ITicketData } from './ticketData';

declare global {
    interface Window {
        electronAPI: {
            saveDataProduct: ( products: Product[] ) => Promise<void>,
            getDataProductsOffline: () => Promise<IProduct[]>,
            printPage: () => Promise<void>,
            saveTicket: ( ticketData: ITicketData ) => Promise<void>
        }
    }
}