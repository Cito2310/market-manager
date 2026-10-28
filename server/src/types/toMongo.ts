// No verificado por humano
import { Types } from "mongoose";

export type ToMongo<T> = Omit<T, "_id" | "createdBy" | "updatedBy"> & {
    createdBy: Types.ObjectId;
    updatedBy: Types.ObjectId;
};
