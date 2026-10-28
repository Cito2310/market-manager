// No verificado por humano
import { HttpError } from "./errors/HttpError.js";

export const notFound = (): never => {
    throw new HttpError(404, "Route not found");
};
