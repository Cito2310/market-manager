import { Types } from "mongoose"

// MONGOOSE
export interface ICategoryMongo {
    name: string,
    type: TypePrimaryCategory,
    subcategories: ISubcategory[]
}


// CATEGORY DATA
export interface ICategory {
    name: string,
    type: TypePrimaryCategory,
    subcategories: ISubcategory[]
    _id: Types.ObjectId,
}

export interface ISubcategory {
    name: string,
    brands: string[]
}

export type TypePrimaryCategory = "almacen" | "limpieza" | "perfumeria" | "lacteos" | "bebidas" | "congelados" | "bazar" | "polleria" | "fiambreria"


// BODY DATA FOR CATEGORY API
export interface IBodyCreateCategory {
    name: string,
    type: TypePrimaryCategory,
    subcategories?: ISubcategory[]
}

export interface IBodyUpdateCategory {
    name?: string,
    type?: TypePrimaryCategory,
    subcategories?: ISubcategory[]
}