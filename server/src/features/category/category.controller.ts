import type { Request, Response } from "express";
import { CategoryModel } from "./category.model.js";
import { CategoryInput, CategoryUpdate } from "../../../../shared/category.schema.js";
import { HttpError } from "../../middlewares/errors/HttpError.js";

export const getCategories = async (_req: Request, res: Response): Promise<void> => {
    const categories = await CategoryModel.find();
    res.json(categories);
};

export const createCategory = async (
    req: Request<Record<string, string>, unknown, CategoryInput>,
    res: Response
): Promise<void> => {
    const category = await CategoryModel.create(req.body);
    res.status(201).json(category);
};

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

export const deleteCategory = async (req: Request, res: Response): Promise<void> => {
    const category = await CategoryModel.findByIdAndDelete(req.params.id);
    if (!category) {
        throw new HttpError(404, "Category not found");
    }
    res.status(204).send();
};
