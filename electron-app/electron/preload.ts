import { ipcNames } from "../types/ipcNames"

const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
    basicOnIpc: ( value: string ) => ipcRenderer.send('basic-on-ipc' as ipcNames, value),
    basicHandleIpc: ( value: string ) => ipcRenderer.invoke('basic-handle-ipc' as ipcNames, value)
})