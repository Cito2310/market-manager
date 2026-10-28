import type { Request, Response } from "express";
import type { CategoryInput } from "../../../../../shared/types/Category.js";
import { CategoryModel } from "../category.model.js";

export const createCategory = async (
    req: Request<Record<string, string>, unknown, CategoryInput>,
    res: Response
): Promise<void> => {
    const category = await CategoryModel.create(req.body);
    res.status(201).json(category);
};
