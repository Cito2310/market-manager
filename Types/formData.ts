export interface FormCategory {
    name: string;
    subcategories: {
        name: string;
        brands: { name: string }[]
    }[]
}

export interface FormCreateProduct {
    barcode: string;
    category: string;
    subcategory: string;
    brand: string;
    name: string;
    size: number;
    price: number;
    sizeUnit: "kg" | "g" | "oz" | "cm3" | "l" | "ml" | "cc" | "u";
    type: "weight" | "unit";
}

export interface FormUpdateProduct {
    category: string;
    subcategory: string;
    brand: string;
    name: string;
    size: number;
    price: number;
    sizeUnit: "kg" | "g" | "oz" | "cm3" | "l" | "ml" | "cc" | "u";
    type: "weight" | "unit";
}