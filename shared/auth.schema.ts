// No verificado por humano
import { z } from "zod";
import { auditableSchema } from "./auditable.schema.js";
import { nameSchema, objectIdSchema } from "./common.schema.js";

// CONSTANT
export const ROLES = ["cashier", "admin"] as const;

// SCHEMA
export const usernameSchema = z
    .string()
    .trim()
    .toLowerCase()
    .min(3)
    .max(30)
    .regex(/^[a-z0-9._-]+$/, { error: "Username can only contain letters, numbers, dots, underscores and hyphens" });

export const passwordSchema = z.string().min(8).max(24);

export const roleSchema = z.enum(ROLES);

// MAIN-SCHEMA
export const userSchema = z
    .object({
        _id: objectIdSchema,
        username: usernameSchema,
        name: nameSchema,
        role: roleSchema,
        active: z.boolean()
    })
    .extend(auditableSchema.shape);

// INPUT-SCHEMA
export const registerUserInputSchema = z.object({
    username: usernameSchema,
    name: nameSchema,
    password: passwordSchema,
    role: roleSchema.default("cashier")
});

export const loginInputSchema = z.object({
    username: usernameSchema,
    password: z.string().min(1)
});

export const deleteUserInputSchema = z.object({});

export const deleteUserAdminInputSchema = z.object({});

// TYPES
export type Role = z.infer<typeof roleSchema>;
export type User = z.infer<typeof userSchema>;
export type RegisterUserInput = z.input<typeof registerUserInputSchema>;
export type LoginInput = z.infer<typeof loginInputSchema>;
