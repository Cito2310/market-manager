import type { Request, Response } from "express";
import { CategoryModel } from "../category.model.js";
import { HttpError } from "../../../middlewares/errors/HttpError.js";

export const deleteCategory = async (req: Request, res: Response): Promise<void> => {
    const category = await CategoryModel.findByIdAndDelete(req.params.id);
    if (!category) {
        throw new HttpError(404, "Category not found");
    }
    res.status(204).send();
};
