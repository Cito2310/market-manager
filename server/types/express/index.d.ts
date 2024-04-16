import { IUser } from '../Interfaces';

declare module 'express-serve-static-core' {
    interface Request {
        user: IUser;
    }
}