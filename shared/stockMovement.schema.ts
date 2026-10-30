import { z } from "zod";
import { auditableSchema } from "./auditable.schema.js";
import { objectIdSchema } from "./common.schema.js";

// CONSTANT
export const STOCK_MOVEMENT_TYPES = ["sale", "purchase", "adjustment", "shrinkage", "return"] as const;

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
        note: noteSchema.optional()
    })
    .extend(auditableSchema.pick({ createdAt: true, createdBy: true }).shape);

// INPUT-SCHEMA
const baseInputSchema = z.object({
    productId: objectIdSchema,
    note: noteSchema.optional()
});

export const stockMovementInputSchema = z.discriminatedUnion("type", [
    baseInputSchema.extend({
        type: z.enum(["purchase"]),
        quantity: positiveQuantitySchema,
        expirationDate: z.coerce.date().optional()
    }),
    baseInputSchema.extend({
        type: z.enum(["sale"]),
        quantity: negativeQuantitySchema
    }),
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

// TYPES
export type StockMovementType = z.infer<typeof stockMovementTypeSchema>;
export type StockMovement = z.infer<typeof stockMovementSchema>;
export type StockMovementInput = z.infer<typeof stockMovementInputSchema>;
export type StockMovementQuery = z.infer<typeof stockMovementQuerySchema>;
