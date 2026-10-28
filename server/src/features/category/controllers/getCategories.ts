import type { Request, Response } from "express";
import { CategoryModel } from "../category.model.js";

export const getCategories = async (_req: Request, res: Response): Promise<void> => {
    const categories = await CategoryModel.find();
    res.json(categories);
};
