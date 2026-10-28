// No verificado por humano
import { Schema, model } from "mongoose";
import { ROLES, User } from "../../../../shared/auth.schema.js";
import { ToMongo } from "../../types/toMongo.js";

export type UserMongo = ToMongo<User> & { passwordHash: string };

const userSchema = new Schema<UserMongo>(
    {
        username: { type: String, required: true, unique: true, trim: true, lowercase: true },
        name: { type: String, required: true, trim: true, lowercase: true },
        role: { type: String, enum: ROLES, required: true, default: "cashier" },
        passwordHash: { type: String, required: true },
        active: { type: Boolean, default: true },
        createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
        updatedBy: { type: Schema.Types.ObjectId, ref: "User", required: true }
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
