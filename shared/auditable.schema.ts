import { z } from "zod";

export const auditableSchema = z.object({
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
    createdBy: z.string().trim().toLowerCase().min(1).max(50),
    updatedBy: z.string().trim().toLowerCase().min(1).max(50)
});

export type Auditable = z.infer<typeof auditableSchema>;
