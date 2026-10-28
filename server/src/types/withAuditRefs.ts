// No verificado por humano
import { Types } from "mongoose";

export type WithAuditRefs<T> = Omit<T, "createdBy" | "updatedBy"> & {
    createdBy: Types.ObjectId;
    updatedBy: Types.ObjectId;
};
