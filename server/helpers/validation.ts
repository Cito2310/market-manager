import bcryptjs from 'bcryptjs';

import { User } from '../users_api/userModels';
import { CustomValidator } from 'express-validator';

// check username exist
export const usernameExist: CustomValidator = async ( value: string ) => {
    const user = await User.findOne({ username: value })
    if ( user ) throw new Error;

    return true
}

// check username exist
export const emailExist: CustomValidator = async ( value: string ) => {
    const user = await User.findOne({ email: value })
    if ( user ) throw new Error;

    return true
}

// check email is equal to req.user.email
export const emailEqual: CustomValidator = async ( value: string, { req } ) => {
    if ( value === req.user.email ) throw new Error;

    return true;
}

// check password is equal to req.user.password
export const passwordEqual: CustomValidator = async ( value: string, { req } ) => {
    const validPassword = bcryptjs.compareSync( value, req.user.password );
    if ( validPassword ) throw new Error;
    
    return true;
}

// check username is equal to req.user.username
export const usernameEqual: CustomValidator = async ( value: string, { req } ) => {
    if ( value === req.user.username ) throw new Error;

    return true;
}