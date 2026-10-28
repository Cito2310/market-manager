import { Schema, model } from "mongoose";
import { ROLES, UserMongo } from "../../../../shared/auth.schema.js";

const userSchema = new Schema<UserMongo>(
    {
        username: { type: String, required: true, unique: true, trim: true, lowercase: true },
        name: { type: String, required: true, trim: true, lowercase: true },
        role: { type: String, enum: ROLES, required: true, default: "cashier" },
        passwordHash: { type: String, required: true },
        active: { type: Boolean, default: true },
        createdBy: { type: String, required: true, trim: true, lowercase: true },
        updatedBy: { type: String, required: true, trim: true, lowercase: true }
    },
    {
        timestamps: true,
        optimisticConcurrency: true,
        toJSON: {
            transform: (_doc, { passwordHash: _passwordHash, ...user }) => user
        }
    }
);

export const UserModel = model<UserMongo>("User", userSchema);
