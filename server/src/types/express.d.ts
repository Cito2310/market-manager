// No verificado por humano
import { HydratedDocument } from "mongoose";
import { UserRecord } from "../features/auth/auth.model.js";

declare global {
    namespace Express {
        interface Request {
            user: HydratedDocument<UserRecord>;
        }
    }
}

export {};
