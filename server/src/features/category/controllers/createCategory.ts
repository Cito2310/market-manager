import type { Request, Response } from "express";
import { CategoryModel } from "../category.model.js";
import { CategoryInput } from "../../../../../shared/category.schema.js";

export const createCategory = async (
    req: Request<Record<string, string>, unknown, CategoryInput>,
    res: Response
): Promise<void> => {
    const category = await CategoryModel.create(req.body);
    res.status(201).json(category);
};
