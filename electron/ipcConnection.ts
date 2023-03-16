import { ipcMain } from 'electron';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import axios from 'axios';

import { ipcNames } from '../Types/ipcNames';
import { IProduct } from '../Types/product';


export const ipcConnections = () => {

    ipcMain.handle("save-data-products" as ipcNames, async (e, args) => {
        if (!existsSync("./database")) mkdirSync("./database");
        const { data } = await axios.get<IProduct[]>("https://market-product-rest.onrender.com/api/product/", {headers: {token: args}});
        
        writeFileSync("./database/data_products.json", JSON.stringify(data));
        return data;
    })

    ipcMain.handle("get-data-products-offline" as ipcNames, async (e, args) => {
        if ( !existsSync("./database/data_products.json") ) return([]);
        return JSON.parse(readFileSync( "./database/data_products.json", "utf-8" ));
    })

}