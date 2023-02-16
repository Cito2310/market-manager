import { contextBridge, ipcRenderer } from 'electron';

import { ipcNames } from '../Types/ipcNames';

contextBridge.exposeInMainWorld( "electronApi", {
    saveProductsList: ( token: string ) => ipcRenderer.send( "get-data-products" as ipcNames, token )
})