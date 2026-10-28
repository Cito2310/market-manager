// No verificado por humano
import { HydratedDocument } from "mongoose";
import { UserMongo } from "../features/auth/auth.model.js";

declare global {
    namespace Express {
        interface Request {
            user: HydratedDocument<UserMongo>;
        }
    }
}

export {};
