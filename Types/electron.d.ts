import { IProduct } from '../backup/src/interfaces/IProduct';
import { ITicketData } from './ticketData';

declare global {
    interface Window {
        electronAPI: {
            saveDataProduct: ( token: string ) => Promise<IProduct[]>,
            getDataProductsOffline: () => Promise<IProduct[]>,
            printPage: () => Promise<void>,
            saveTicket: ( ticketData: ITicketData ) => Promise<void>
        }
    }
}