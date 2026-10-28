import type { Request, Response } from "express";
import { CategoryModel } from "../category.model.js";
import { CategoryApi } from "../../../../../shared/category.schema.js";

// El front manda el category completo, con _id y __v incluidos
export const updateCategory = async (
    req: Request<{ id: string }, unknown, CategoryApi>,
    res: Response
): Promise<void> => {
    const category = await CategoryModel.findById(req.params.id);
    if (!category) {
        res.status(404).json({ message: "Category not found" });
        return;
    }

    const { _id, __v, createdBy, createdAt, updatedAt, ...incoming } = req.body;

    if (__v !== undefined && __v !== category.__v) {
        res.status(409).json({ message: "Category was modified by someone else" });
        return;
    }

    category.overwrite({ ...incoming, createdBy: category.createdBy });
    await category.save();
    res.json(category);
};
