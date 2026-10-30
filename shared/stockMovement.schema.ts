// No verificado por humano
import { z } from "zod";
import { auditableSchema } from "./auditable.schema.js";
import { objectIdSchema } from "./common.schema.js";

// CONSTANT
export const STOCK_MOVEMENT_TYPES = ["sale", "purchase", "adjustment", "shrinkage", "return"] as const;

export const MIN_DELETE_AGE_DAYS = 90;

// SCHEMA
const stockMovementTypeSchema = z.enum(STOCK_MOVEMENT_TYPES);

const noteSchema = z.string().trim().min(1).max(200);

const positiveQuantitySchema = z.number().positive();

const nonZeroQuantitySchema = z.number().refine((value) => value !== 0, { error: "Quantity cannot be 0" });

const negativeQuantitySchema = z.number().negative();

// MAIN-SCHEMA
export const stockMovementSchema = z
    .object({
        _id: objectIdSchema,
        productId: objectIdSchema,
        type: stockMovementTypeSchema,
        quantity: nonZeroQuantitySchema,
        note: noteSchema.optional(),
        occurredAt: z.coerce.date()
    })
    .extend(auditableSchema.pick({ createdAt: true, createdBy: true }).shape);

// INPUT-SCHEMA
const baseInputSchema = z.object({
    productId: objectIdSchema,
    note: noteSchema.optional()
});

const saleInputSchema = baseInputSchema.extend({
    type: z.enum(["sale"]),
    quantity: negativeQuantitySchema
});

export const stockMovementInputSchema = z.discriminatedUnion("type", [
    baseInputSchema.extend({
        type: z.enum(["purchase"]),
        quantity: positiveQuantitySchema,
        expirationDate: z.coerce.date().optional()
    }),
    saleInputSchema,
    baseInputSchema.extend({
        batchId: objectIdSchema,
        type: z.enum(["shrinkage"]),
        quantity: negativeQuantitySchema
    }),
    baseInputSchema.extend({
        batchId: objectIdSchema,
        type: z.enum(["adjustment"]),
        quantity: nonZeroQuantitySchema
    }),
    baseInputSchema.extend({
        batchId: objectIdSchema,
        type: z.enum(["return"]),
        quantity: positiveQuantitySchema
    })
]);

const saleBatchItemSchema = saleInputSchema.extend({
    occurredAt: z.coerce.date(),
    createdBy: objectIdSchema
});

export const saleBatchInputSchema = z.array(saleBatchItemSchema).min(1);

export const stockMovementQuerySchema = z
    .object({
        from: z.coerce.date().optional(),
        to: z.coerce.date().optional(),
        productId: z
            .union([objectIdSchema, z.array(objectIdSchema)])
            .transform((value) => (Array.isArray(value) ? value : [value]))
            .optional()
    })
    .refine(({ from, to }) => !from || !to || from <= to, { error: "'from' must be before 'to'" });

export const stockMovementDeleteQuerySchema = z.object({
    before: z.coerce
        .date()
        .refine((before) => before.getTime() <= Date.now() - MIN_DELETE_AGE_DAYS * 24 * 60 * 60 * 1000, {
            error: `'before' must be at least ${MIN_DELETE_AGE_DAYS} days ago`
        })
});

// TYPES
export type StockMovementType = z.infer<typeof stockMovementTypeSchema>;
export type StockMovement = z.infer<typeof stockMovementSchema>;
export type StockMovementInput = z.infer<typeof stockMovementInputSchema>;
export type SaleBatchInput = z.infer<typeof saleBatchInputSchema>;
export type StockMovementQuery = z.infer<typeof stockMovementQuerySchema>;
export type StockMovementDeleteQuery = z.infer<typeof stockMovementDeleteQuerySchema>;
