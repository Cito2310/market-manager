import { IUserMongo } from './TypesMoongose';

export interface IBodyUser extends IUserMongo {
    _id?: unknown
}

export interface IBodyChangeDataUser extends IUserMongo {
    _id?: unknown
}

export interface IBodyLogin extends IUserMongo {
    username: string,
    password: string,
}