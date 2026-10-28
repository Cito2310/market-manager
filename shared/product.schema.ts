// No verificado por humano
import { z } from "zod";
import { auditableSchema } from "./auditable.schema.js";
import { nameSchema, objectIdSchema } from "./common.schema.js";

// CONSTANT
export const SIZE_UNITS = ["unit", "kg", "g", "l", "ml", "m", "oz"] as const;

// SCHEMA
const sizeUnitSchema = z.enum(SIZE_UNITS);

const barcodeSchema = z
    .string()
    .trim()
    .regex(/^\d{4,14}$/, { error: "Invalid barcode" });

const priceSchema = z.number().nonnegative();

export const batchSchema = z.object({
    _id: objectIdSchema,
    quantity: z.number().nonnegative(),
    expirationDate: z.coerce.date().optional(),
    receivedAt: z.coerce.date()
});

export const alertsSchema = z
    .object({
        enabled: z.boolean(),
        warning: z.number().nonnegative(),
        low: z.number().nonnegative(),
        critical: z.number().nonnegative()
    })
    .refine((alerts) => alerts.warning >= alerts.low && alerts.low >= alerts.critical, {
        error: "Alerts must follow warning >= low >= critical"
    });

export const detailsSchema = z.object({
    name: nameSchema,
    brandId: objectIdSchema,
    categoryId: objectIdSchema,
    subcategoryId: objectIdSchema,
    barcodes: z.array(barcodeSchema).refine((codes) => new Set(codes).size === codes.length, {
        error: "Barcodes must be unique"
    }),
    size: z.number().positive(),
    sizeUnit: sizeUnitSchema
});

export const sellSchema = z.object({
    cost: priceSchema,
    salePrice: priceSchema,
    weighable: z.boolean()
});

export const inventorySchema = z.object({
    batches: z.array(batchSchema),
    alerts: alertsSchema
});

// MAIN-SCHEMA
export const productSchema = z
    .object({
        _id: objectIdSchema,
        details: detailsSchema,
        sell: sellSchema,
        inventory: inventorySchema,
        active: z.boolean()
    })
    .extend(auditableSchema.shape);

// INPUT-SCHEMA
const batchInputSchema = batchSchema.partial({ _id: true, receivedAt: true });

const inventoryInputSchema = inventorySchema.extend({
    batches: z.array(batchInputSchema).optional()
});

export const productInputSchema = productSchema
    .omit({ _id: true, createdAt: true, updatedAt: true, createdBy: true, updatedBy: true })
    .extend({
        details: detailsSchema.extend({ barcodes: detailsSchema.shape.barcodes.optional() }),
        sell: sellSchema.partial({ weighable: true }),
        inventory: inventoryInputSchema.optional(),
        active: z.boolean().optional()
    });

const batchUpdateSchema = batchInputSchema.required({ receivedAt: true });

export const productUpdateSchema = productInputSchema.extend({
    details: detailsSchema,
    sell: sellSchema,
    inventory: inventorySchema.extend({ batches: z.array(batchUpdateSchema) }),
    active: z.boolean(),
    __v: z.number().int().nonnegative()
});

// TYPES
export type SizeUnit = z.infer<typeof sizeUnitSchema>;
export type Batch = z.infer<typeof batchSchema>;
export type Alerts = z.infer<typeof alertsSchema>;
export type Details = z.infer<typeof detailsSchema>;
export type Sell = z.infer<typeof sellSchema>;
export type Inventory = z.infer<typeof inventorySchema>;
export type Product = z.infer<typeof productSchema>;
export type ProductApi = Product & { __v: number };
export type ProductInput = z.input<typeof productInputSchema>;
export type ProductUpdate = z.input<typeof productUpdateSchema>;
