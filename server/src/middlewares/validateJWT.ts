import jwt from "jsonwebtoken";

import { NextFunction, Request, Response } from "express";
import { env } from "../config/env.js";
import { Types } from "mongoose";
import { HttpError } from "./errors/HttpError.js";
import { UserModel } from "../features/auth/auth.model.js";

export interface ITokenUser {
    id: Types.ObjectId;
}

export const validateJWT = async (req: Request, _res: Response, next: NextFunction) => {
    const token = req.header("token");
    if (!token) throw new HttpError(401, "Token needed");

    let payload: ITokenUser;
    try {
        payload = jwt.verify(token, env.secretOrPrivateKey) as ITokenUser;
    } catch {
        throw new HttpError(401, "Invalid token");
    }

    const user = await UserModel.findById(payload.id);
    if (!user) throw new HttpError(401, "Invalid token");

    // deactivated users lose access immediately
    if (!user.active) throw new HttpError(403, "User is inactive");

    req.user = user;
    next();
};
