import { NextFunction, Request, Response } from "express";
import { z } from "zod";

type Target = "body" | "params";

type ValidationSchemas = Partial<Record<Target, z.ZodType>>;

export const validate =
    (schemas: ValidationSchemas) =>
    (req: Request, res: Response, next: NextFunction): void => {
        for (const [target, schema] of Object.entries(schemas) as [Target, z.ZodType][]) {
            const result = schema.safeParse(req[target]);

            if (!result.success) {
                res.status(400).json({
                    errors: result.error.issues.map(({ path, message }) => ({
                        path: path.join("."),
                        message
                    }))
                });
                return;
            }

            req[target] = result.data as Request[Target];
        }

        next();
    };
