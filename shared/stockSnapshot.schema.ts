// No verificado por humano
import { z } from "zod";
import { auditableSchema } from "./auditable.schema.js";
import { objectIdSchema } from "./common.schema.js";

// CONSTANT
export const MIN_SNAPSHOT_DELETE_AGE_DAYS = 90;

// SCHEMA
export const stockSnapshotItemSchema = z.object({
    productId: objectIdSchema,
    quantity: z.number()
});

// MAIN-SCHEMA
export const stockSnapshotSchema = z
    .object({
        _id: objectIdSchema,
        lastMovementId: objectIdSchema.nullable(),
        items: z
            .array(stockSnapshotItemSchema)
            .refine((items) => new Set(items.map((item) => item.productId)).size === items.length, {
                error: "Products must be unique inside the snapshot"
            })
    })
    .extend(auditableSchema.pick({ createdAt: true }).shape);

export const stockSnapshotSummarySchema = stockSnapshotSchema.pick({ _id: true, lastMovementId: true });

// INPUT-SCHEMA
export const stockSnapshotDeleteQuerySchema = z.object({
    before: z.coerce
        .date()
        .refine((before) => before.getTime() <= Date.now() - MIN_SNAPSHOT_DELETE_AGE_DAYS * 24 * 60 * 60 * 1000, {
            error: `'before' must be at least ${MIN_SNAPSHOT_DELETE_AGE_DAYS} days ago`
        })
});

// TYPES
export type StockSnapshotItem = z.infer<typeof stockSnapshotItemSchema>;
export type StockSnapshot = z.infer<typeof stockSnapshotSchema>;
export type StockSnapshotSummary = z.infer<typeof stockSnapshotSummarySchema>;
export type StockSnapshotDeleteQuery = z.infer<typeof stockSnapshotDeleteQuerySchema>;
