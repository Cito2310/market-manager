import { Request, Response } from "express";
import bcryptjs from "bcryptjs";

import { User } from "./userModels";

import { generatorJWT } from '../helpers/generatorJWT';

import { IBodyUser, IBodyChangeDataUser, IBodyLogin } from '../types/InputBodyTypes';



// Create User
export const createUser = async (req: Request, res: Response) => {
    try {
        const { _id, ...userData } = req.body as IBodyUser;
    
        // encrypt password
        const salt = bcryptjs.genSaltSync();
        userData.password = bcryptjs.hashSync( userData.password , salt)
    
        // create new user and save
        const newUser = new User(userData);
        await newUser.save();
    
        // generator JWT
        const token: string = await generatorJWT({ id: newUser._id });
    
        // return new user
        return res.json({ user: newUser, token });
        

    } catch (error) { return res.status(500).json({ msg: "1500 - unexpected server error" })}
}


// ChangeDataUser - Need Token
export const changeDataUser = async (req: Request, res: Response) => {
    try {
        const { _id: id, ...newData } = req.body as IBodyChangeDataUser;
        const { _id } = req.user;

        // change password && encrypt password
        if ( newData.password ) {
            const salt = bcryptjs.genSaltSync()
            newData.password = bcryptjs.hashSync(newData.password, salt)
        }

        // find user and update
        const userChanged = await User.findByIdAndUpdate( _id, newData );

        // save user data
        await userChanged?.save();

        // return
        return res.status(204).json()


    } catch (error) { return res.status(500).json({ msg: "1500 - unexpected server error" })}
}


// Get User - Need Token
export const getUser = async (req: Request, res: Response) => {
    try {
        return res.status(200).json(req.user);


    } catch (error) { return res.status(500).json({ msg: "1500 - unexpected server error" })}
}


// Delete User - Need Token
export const deleteUser = async (req: Request, res: Response) => {
    try {
        await User.findByIdAndDelete(req.user._id);
        return res.status(204).json();


    } catch (error) { return res.status(500).json({ msg: "1500 - unexpected server error" })}
}


// Login User
export const loginUser = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body as IBodyLogin;

        // get user with username
        const user = await User.findOne({ username });
        
        // check user exist
        if ( !user ) return res.status(400).json({ msg: "login invalid" });

        // check password is equal
        const samePassword = bcryptjs.compareSync( password, user.password );
        if ( !samePassword ) return res.status(400).json({ msg: "login invalid" })

        // generate JWT and return
        const token: string = await generatorJWT({ id: user._id });
        return res.status(200).json({ token });


    } catch (error) { return res.status(500).json({ msg: "1500 - unexpected server error" })}
}