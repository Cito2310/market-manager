import { ipcMain, BrowserWindow } from 'electron';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';

import { ipcNames, Product, Ticket } from '../Types';


export const ipcConnections = () => {

    ipcMain.on("save-data-products" as ipcNames, async (e, args: Product[]) => {
        if (!existsSync("./database")) mkdirSync("./database");
        
        writeFileSync("./database/data_products.json", JSON.stringify(args));
    })

    ipcMain.handle("get-data-products-offline" as ipcNames, async (e, args) => {
        if ( !existsSync("./database/data_products.json") ) return([]);
        return JSON.parse(readFileSync( "./database/data_products.json", "utf-8" ));
    })

    ipcMain.on("print-page" as ipcNames, async (e, args) => {
        const win = BrowserWindow.getFocusedWindow();
        win?.webContents.print({
            silent: true,
            margins: {
                marginType: "none",
            },
            header: "Mercadito Ale" 
        })
    })

    ipcMain.on("save-ticket" as ipcNames, async (e, args: Ticket) => {
        if (!existsSync("./tickets")) mkdirSync("./tickets");
        writeFileSync(`./tickets/${args.date.split(' ').join('_').split(':').join('-')}-${args.idTicket}.json`, JSON.stringify(args));
        return args;
    })

}