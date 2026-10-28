import { z } from "zod";

export const nameSchema = z.string().trim().toLowerCase().min(2).max(50);

export const objectIdSchema = z.string().regex(/^[0-9a-f]{24}$/i, { error: "Invalid id" });

export const idParamsSchema = z.object({
    id: objectIdSchema
});

export const hasUniqueNames = (items: { name: string }[]): boolean =>
    new Set(items.map((item) => item.name)).size === items.length;

export const uniqueNamesArray = <T extends z.ZodType<{ name: string }>>(item: T, error: string) =>
    z.array(item).refine(hasUniqueNames, { error });
