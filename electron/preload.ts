import { contextBridge, ipcRenderer } from 'electron';

import { ipcNames } from '../Types/ipcNames';
import { ITicketData } from '../Types/ticketData';
import { Product } from '../Types/product';

contextBridge.exposeInMainWorld( "electronAPI", {
    saveDataProduct: ( products: Product[] ) => ipcRenderer.send( "save-data-products" as ipcNames, products ),
    getDataProductsOffline: () => ipcRenderer.invoke( "get-data-products-offline" as ipcNames ),
    printPage: () => ipcRenderer.send("print-page" as ipcNames),
    saveTicket: ( ticketData: ITicketData ) => ipcRenderer.send("save-ticket" as ipcNames, ticketData),

})