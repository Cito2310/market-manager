import express from "express";
import cors from "cors";

import { dbConnection } from './database/config';
import { routeUser } from './apis/user/userRoutes';
import { routeCategory } from "./apis/category/categoryRoutes";
import { routeProduct } from "./apis/product/productRoutes";

export class Server {
    private app = express()
    private paths = {
        user : "/api/user",
        category: "/api/category",
        product : "/api/product"
    }

    constructor(){
        this.middlewares();
        this.routes();
        this.connectDB();
    }

    private routes() {
        this.app.use( this.paths.user, routeUser )
        this.app.use( this.paths.category, routeCategory )
        this.app.use( this.paths.product, routeProduct )
    }

    private connectDB() {dbConnection()}

    private middlewares() {
        this.app.use(cors());
        this.app.use(express.json());
    }

    public listen() { this.app.listen( process.env.PORT ) }
}