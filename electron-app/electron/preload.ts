import { contextBridge, ipcRenderer } from 'electron';
import { ipcNames, Ticket, Product } from '../Types';


contextBridge.exposeInMainWorld( "electronAPI", {
    saveDataProduct: ( products: Product[] ) => ipcRenderer.send( "save-data-products" as ipcNames, products ),
    getDataProductsOffline: () => ipcRenderer.invoke( "get-data-products-offline" as ipcNames ),
    printPage: () => ipcRenderer.send("print-page" as ipcNames),
    saveTicket: ( ticketData: Ticket ) => ipcRenderer.send("save-ticket" as ipcNames, ticketData),

})