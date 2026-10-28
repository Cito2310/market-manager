import type { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

export const checkFields = (req: Request, res: Response, next: NextFunction): void => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
    }

    next();
};
