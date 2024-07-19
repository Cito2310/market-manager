import { dialog, ipcMain } from 'electron';

import { ipcNames } from '../types/ipcNames';

export const ipConnection = () => {

    ipcMain.on("basic-on-ipc" as ipcNames, (e, args)=>{
        console.log(args)
    })

    ipcMain.handle("basic-handle-ipc" as ipcNames, async(e, args)=>{
        return args
    })

}