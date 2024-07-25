export interface Category {
    _id: string;
    name: string;
    type: TypeCategory;

    subcategories: Subcategory[];
};

export type TypeCategory = "almacen" | "limpieza" | "perfumeria" | "lacteos" | "bebidas" | "congelados" | "bazar" | "polleria" | "fiambreria"

export interface Subcategory {
    name: string;
    brands: string[];
}




// FORM
export interface FormCategory {
    name: string;
    type: TypeCategory;
    
    subcategories: FormSubcategory[]
}

export interface FormSubcategory {
    name: string;
    brands: {name: string}[]
}



// CategoryInType
export interface CategoryInType {
    name: string;
    category: Category[];
}