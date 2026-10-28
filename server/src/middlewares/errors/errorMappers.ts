// No verificado por humano
import mongoose from "mongoose";

interface ErrorMapper {
    matches: (err: unknown) => boolean;
    status: number;
    message: string;
}

const isJsonParseError = (err: unknown): boolean =>
    typeof err === "object" && err !== null && "type" in err && err.type === "entity.parse.failed";

const isDuplicateKeyError = (err: unknown): boolean =>
    err instanceof mongoose.mongo.MongoServerError && err.code === 11000;

export const errorMappers: ErrorMapper[] = [
    { matches: isJsonParseError, status: 400, message: "Malformed JSON body" },
    { matches: (err) => err instanceof mongoose.Error.VersionError, status: 409, message: "Resource was modified by someone else" },
    { matches: (err) => err instanceof mongoose.Error.ValidationError, status: 400, message: "Invalid data" },
    { matches: (err) => err instanceof mongoose.Error.CastError, status: 400, message: "Invalid value" },
    { matches: isDuplicateKeyError, status: 409, message: "Resource already exists" }
];
