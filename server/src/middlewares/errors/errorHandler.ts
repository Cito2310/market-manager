// No verificado por humano
import { NextFunction, Request, Response } from "express";
import { HttpError } from "./HttpError.js";
import { errorMappers } from "./errorMappers.js";

export const errorHandler = (err: unknown, _req: Request, res: Response, next: NextFunction): void => {
    if (res.headersSent) {
        next(err);
        return;
    }

    if (err instanceof HttpError) {
        res.status(err.status).json({ message: err.message });
        return;
    }

    const mapper = errorMappers.find(({ matches }) => matches(err));

    if (mapper) {
        res.status(mapper.status).json({ message: mapper.message });
        return;
    }

    console.error(err);
    res.status(500).json({ message: "Internal server error" });
};
