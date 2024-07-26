import { TypeCategory } from "./category";

export interface Product {
    barcode: string;
    brand: string;
    category: string;
    name: string;
    price: number;
    size: number;
    typeSize: "kg" | "g" | "oz" | "cm3" | "l" | "ml" | "cc" | "u";
    subCategory: string;
    type: "weight" | "unit";
    majorCategory: TypeCategory
}


// ProductInType
export interface ProductInType {
    name: string;
    products: Product[];
}