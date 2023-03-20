import { contextBridge, ipcRenderer } from 'electron';

import { ipcNames } from '../Types/ipcNames';
import { ITicketData } from '../Types/ticketData';

contextBridge.exposeInMainWorld( "electronAPI", {
    saveDataProduct: ( token: string ) => ipcRenderer.invoke( "save-data-products" as ipcNames, token ),
    getDataProductsOffline: () => ipcRenderer.invoke( "get-data-products-offline" as ipcNames ),
    printPage: () => ipcRenderer.send("print-page" as ipcNames),
    saveTicket: ( ticketData: ITicketData ) => ipcRenderer.send("save-ticket" as ipcNames, ticketData),

})