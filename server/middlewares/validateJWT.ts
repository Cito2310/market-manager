import jwt from 'jsonwebtoken';

import { User } from '../users_api/userModels';

import { NextFunction, Request, Response } from 'express';
import { Types } from 'mongoose';


export interface ITokenUser {
    id: Types.ObjectId
}



export const validateJWT = async (
        req: Request, 
        res: Response, 
        next: NextFunction
    ) => {

    const token = req.header("token");

    if (!token) {
        return res.status(401).json([{
            msg: "0013 - token needed"
        }])
    }

    try {
        const { id } = jwt.verify(token, process.env.SECRET_OR_PRIVATE_KEY as string) as ITokenUser;

        // search user with id
        const user = await User.findById(id);
        
        // check user exist
        if ( !user ) {
            return res.status(401).json([{
                msg: "0012 - invalid token"
            }])
        }

        req.user = user;
        next();

    } catch (error) {
        return res.status(401).json([{
            msg: "0012 - invalid token"
        }])       
    }
}