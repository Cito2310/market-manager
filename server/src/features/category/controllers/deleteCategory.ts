import type { Request, Response } from "express";
import { CategoryModel } from "../category.model.js";

export const deleteCategory = async (req: Request, res: Response): Promise<void> => {
    const category = await CategoryModel.findByIdAndDelete(req.params.id);
    if (!category) {
        res.status(404).json({ message: "Category not found" });
        return;
    }
    res.status(204).send();
};
