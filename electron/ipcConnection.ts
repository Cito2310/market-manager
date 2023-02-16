import { ipcMain, ipcRenderer } from 'electron';
import { existsSync, mkdirSync, writeFileSync } from 'fs';

import { ipcNames } from '../Types/ipcNames';
import * as path from 'path';
import axios from 'axios';

export const ipcConnections = () => {
    ipcMain.on("get-data-products" as ipcNames, async (e, args) => {
        if (!existsSync("./database")) mkdirSync("./database");
        const resp = await axios.get("https://market-product-rest.onrender.com/api/product/", {headers: {token: args}})
        writeFileSync("./database/data_products.json", JSON.stringify(resp.data))
    })
}