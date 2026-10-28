import { z } from "zod";
import { auditableSchema } from "./auditable.schema.js";

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
    "fiambrería",
] as const;


// SUB-SCHEMA
const nameSchema = z.string().trim().toLowerCase().min(2).max(50)

const objectIdSchema = z.string().regex(/^[0-9a-f]{24}$/i, { error: "Invalid id" });

const hasUniqueNames = (items: { name: string }[]): boolean =>
    new Set(items.map((item) => item.name)).size === items.length;

const uniqueNamesArray = <T extends z.ZodType<{ name: string }>>(item: T, error: string) =>
    z.array(item).refine(hasUniqueNames, { error });


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
    .omit({ _id: true, createdAt: true, updatedAt: true })
    .extend({
        subcategories: uniqueNamesArray(subcategoryInputSchema, "Subcategory names must be unique inside the category").default([]),
        active: z.boolean().default(true)
    });


// TYPES
export type Section = z.infer<typeof sectionSchema>;
export type Brand = z.infer<typeof brandSchema>;
export type Subcategory = z.infer<typeof subcategorySchema>;
export type Category = z.infer<typeof categorySchema>;
export type CategoryMongo = Omit<Category, "_id">;
export type CategoryApi = Category & { __v: number };
export type CategoryInput = z.input<typeof categoryInputSchema>;