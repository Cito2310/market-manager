// import bcryptjs from 'bcryptjs';

import { CustomValidator } from "express-validator";
import { Category } from "../apis/category/categoryModels";

// import { User } from '../apis/user/userModels';
// import { CustomValidator } from 'express-validator';

// check not exist category
export const notExistCategory: CustomValidator = async ( value: string ) => {
    const category = await Category.findOne({ name: value });

    if ( category ) throw new Error;

    return true;
}

// check valid type for category
export const validType: CustomValidator = async ( value: string ) => {
    const validData = ["almacen", "limpieza", "perfumeria", "lacteos", "bebidas", "congelados", "bazar", "polleria", "fiambreria"];

    if ( !validData.includes( value.toLowerCase() ) ) throw new Error;

    return true;
}

// check exist category id 
export const existCategoryId: CustomValidator = async ( value: string ) => {
    const category = await Category.findById( value );

    if ( category === null ) throw new Error;

    return true;
}

// check only array with subcategories
export const arrayOnlySubcategories: CustomValidator = async( value: any[] ) => {
    const resp = value.filter( item => (item.name && item.brands) && item )

    if ( resp.length !== value.length ) throw new Error;

    return true;
}