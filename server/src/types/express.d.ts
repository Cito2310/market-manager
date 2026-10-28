import { HydratedDocument } from "mongoose";
import { UserMongo } from "../../../shared/auth.schema.js";

declare global {
    namespace Express {
        interface Request {
            user: HydratedDocument<UserMongo>;
        }
    }
}

export {};
