import { ipcMain, ipcRenderer } from 'electron';
import { writeFileSync } from 'fs';

import { ipcNames } from '../Types/ipcNames';

export const ipcConnections = () => {
    ipcMain.on("get-data-products" as ipcNames, (e, args) => {
        writeFileSync("./text.txt", args)
    })
}