import { Types } from "mongoose";

// MONGOOSE
export interface IUserMongo {
    username: string,
    password: string,
}


// USER DATA
export interface IUser {
    username: string,
    password: string,
    _id: Types.ObjectId,
}


// BODY DATA FOR USER API
export interface IBodyCreateUser {
    username: string,
    password: string,
    _id?: Types.ObjectId
}

export interface IBodyLogin {
    username: string,
    password: string,
}