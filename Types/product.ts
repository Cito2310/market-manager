export interface Product {
    barcode: string;
    brand: string;
    category: string;
    name: string;
    price: number;
    size: number;
    sizeUnit: "kg" | "g" | "oz" | "cm3" | "l" | "ml" | "cc" | "u";
    subcategory: string;
    type: "weight" | "unit";
}