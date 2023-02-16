import { ipcMain } from 'electron';
import { existsSync, mkdirSync, writeFileSync } from 'fs';
import axios from 'axios';

import { ipcNames } from '../Types/ipcNames';
import { IProduct } from '../Types/product';


export const ipcConnections = () => {

    ipcMain.handle("save-data-products" as ipcNames, async (e, args) => {
        if (!existsSync("./database")) mkdirSync("./database");
        const { status, data } = await axios.get<IProduct[]>("https://market-product-rest.onrender.com/api/product/", {headers: {token: args}});

        if (status !== 200) {
            const response = await axios.get<IProduct[]>("./database/data_products.json");
            return response.data;
        }
        
        writeFileSync("./database/data_products.json", JSON.stringify(data));
        return data;
    })

}