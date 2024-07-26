import { TypeCategory } from "./category";

export interface FormCreateProduct {
    barcode: string;
    category: string;
    subCategory: string;
    brand: string;
    name: string;
    size: number;
    price: number;
    typeSize: "kg" | "g" | "oz" | "cm3" | "l" | "ml" | "cc" | "u";
    type: "weight" | "unit";
    majorCategory: TypeCategory
}

export interface FormUpdateProduct {
    category: string;
    subCategory: string;
    brand: string;
    name: string;
    size: number;
    price: number;
    typeSize: "kg" | "g" | "oz" | "cm3" | "l" | "ml" | "cc" | "u";
    type: "weight" | "unit";
    majorCategory: TypeCategory
}