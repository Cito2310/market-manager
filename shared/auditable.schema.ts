import { z } from "zod";
import { objectIdSchema } from "./common.schema.js";

export const auditableSchema = z.object({
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
    createdBy: objectIdSchema,
    updatedBy: objectIdSchema
});

export type Auditable = z.infer<typeof auditableSchema>;
