import { TypeCategory } from "./category";

export interface Product {
    barcode: string;
    brand: string;
    category: string;
    majorCategory: TypeCategory
    name: string;
    price: number;
    size: number;
    subCategory: string;
    type: "weight" | "unit";
    typeSize: "kg" | "g" | "oz" | "cm3" | "l" | "ml" | "cc" | "u";
}


// ProductInType
export interface ProductInType {
    name: string;
    products: Product[];
}


// ProductInCart
export interface ProductInCart extends Product {
    amount: number;
}