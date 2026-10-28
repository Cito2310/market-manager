import type { Request, Response } from "express";
import { CategoryModel } from "../category.model.js";
import { CategoryUpdate } from "../../../../../shared/category.schema.js";
import { HttpError } from "../../../middlewares/errors/HttpError.js";

// El front manda el category completo, con _id y __v incluidos
export const updateCategory = async (
    req: Request<{ id: string }, unknown, CategoryUpdate>,
    res: Response
): Promise<void> => {
    const category = await CategoryModel.findById(req.params.id);
    if (!category) {
        throw new HttpError(404, "Category not found");
    }

    const { __v, ...incoming } = req.body;

    if (__v !== category.__v) {
        throw new HttpError(409, "Category was modified by someone else");
    }

    category.overwrite({ ...incoming, createdBy: category.createdBy });
    await category.save();
    res.json(category);
};
