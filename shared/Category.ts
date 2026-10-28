import type { Auditable } from "./Auditable.js";

export const SECTIONS = [
    "almacén",
    "limpieza",
    "perfumería",
    "lácteos",
    "bebidas",
    "congelados",
    "bazar",
    "pollería",
    "fiambrería",
] as const;

export type Section = (typeof SECTIONS)[number];

export interface Brand {
    _id: string;
    name: string;
}

export interface Subcategory {
    _id: string;
    name: string;
    brands: Brand[];
}


export interface Category extends Auditable {
    _id: string;
    section: Section;
    name: string;
    subcategories: Subcategory[];
    active: boolean;
}

export type CategoryMongo = Omit<Category, "_id">;

// // La API devuelve la forma compartida de Category más la version key de Mongo
// export type CategoryApi = Category & { __v: number };

// // Todo lo que la API necesita para crear una categoría; del resto se encarga el server
// export type CategoryInput = Omit<Category, "_id" | "createdAt" | "updatedAt">;