import { contextBridge, ipcRenderer } from 'electron';

import { ipcNames } from '../Types/ipcNames';

contextBridge.exposeInMainWorld( "electronAPI", {
    saveDataProduct: ( token: string ) => ipcRenderer.invoke( "save-data-products" as ipcNames, token )
})