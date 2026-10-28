import { NextFunction, Request, Response } from "express";
import { Role } from "../../../shared/auth.schema.js";
import { HttpError } from "./errors/HttpError.js";

export const hasRole =
    (...roles: Role[]) =>
    (req: Request, _res: Response, next: NextFunction) => {
        if (!roles.includes(req.user.role)) {
            throw new HttpError(403, "Insufficient permissions");
        }

        next();
    };
