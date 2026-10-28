import { z } from "zod";
import { auditableSchema } from "./auditable.schema.js";
import { nameSchema, objectIdSchema, uniqueNamesArray } from "./common.schema.js";

// CONSTANT
export const SECTIONS = [
    "almacén",
    "limpieza",
    "perfumería",
    "lácteos",
    "bebidas",
    "congelados",
    "bazar",
    "pollería",
    "fiambrería"
] as const;

// SCHEMA
const sectionSchema = z.enum(SECTIONS);

export const brandSchema = z.object({
    _id: objectIdSchema,
    name: nameSchema
});

export const subcategorySchema = z.object({
    _id: objectIdSchema,
    name: nameSchema,
    brands: uniqueNamesArray(brandSchema, "Brands must be unique inside the subcategory")
});

// MAIN-SCHEMA
export const categorySchema = z
    .object({
        _id: objectIdSchema,
        section: sectionSchema,
        name: nameSchema,
        subcategories: uniqueNamesArray(subcategorySchema, "Subcategory names must be unique inside the category"),
        active: z.boolean()
    })
    .extend(auditableSchema.shape);

// INPUT-SCHEMA
const brandInputSchema = brandSchema.partial({ _id: true });

const subcategoryInputSchema = subcategorySchema.partial({ _id: true }).extend({
    brands: uniqueNamesArray(brandInputSchema, "Brands must be unique inside the subcategory").default([])
});

export const categoryInputSchema = categorySchema
    .omit({ _id: true, createdAt: true, updatedAt: true, createdBy: true, updatedBy: true })
    .extend({
        subcategories: uniqueNamesArray(
            subcategoryInputSchema,
            "Subcategory names must be unique inside the category"
        ).default([]),
        active: z.boolean().default(true)
    });

export const categoryUpdateSchema = categoryInputSchema.extend({
    __v: z.number().int().nonnegative()
});

// TYPES
export type Section = z.infer<typeof sectionSchema>;
export type Brand = z.infer<typeof brandSchema>;
export type Subcategory = z.infer<typeof subcategorySchema>;
export type Category = z.infer<typeof categorySchema>;
export type CategoryMongo = Omit<Category, "_id">;
export type CategoryApi = Category & { __v: number };
export type CategoryInput = z.input<typeof categoryInputSchema>;
export type CategoryUpdate = z.input<typeof categoryUpdateSchema>;
