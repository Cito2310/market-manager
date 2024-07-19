import { Types } from "mongoose";

// MONGOOSE
export interface IProductMongo {
    brand: string,
    category: string,
    subCategory: string,
    majorCategory: string,
    
    barcode: string,
    name: string,
    price: number,
    type: "weight" | "unit"

    size: number,
    typeSize: TypeSize,
}


export type TypeSize = "kg" | "g" | "oz" | "cm3" | "l" | "ml" | "u" | "cc";


// PRODUCT DATA
export interface IProduct {
    brand: string,
    category: string,
    subCategory: string,
    majorCategory: string,
    
    barcode: string,
    name: string,
    price: number,
    type: "weight" | "unit"

    size: number,
    typeSize: TypeSize,

    _id: Types.ObjectId
}


// // BODY DATA FOR PRODUCT API
export interface IBodyCreateProduct {
    brand: string,
    category: string,
    subCategory: string,
    majorCategory: string,
    
    barcode: string,
    name: string,
    price: number,
    type: "weight" | "unit"

    size: number,
    typeSize: TypeSize,

    _id?: any,
    __V?: any,
}

export interface IBodyUpdateProduct {
    brand?: string,
    category?: string,
    subCategory?: string,
    majorCategory?: string,
    
    name?: string,
    price?: number,
    type?: "weight" | "unit"

    size?: number,
    typeSize?: TypeSize,

    _id?: any,
    __V?: any,
}