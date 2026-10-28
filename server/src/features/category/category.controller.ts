import { Request, Response } from "express";
import { CategoryInput, CategoryUpdate } from "../../../../shared/category.schema.js";
import { CategoryModel } from "./category.model.js";
import { HttpError } from "../../middlewares/errors/HttpError.js";

export const getCategories = async (req: Request, res: Response) => {
    const categories = await CategoryModel.find();
    res.status(200).json(categories);
};

export const createCategory = async (req: Request, res: Response) => {
    const bodyCategory = req.body as CategoryInput;
    const { _id } = req.user;

    const newCategory = await CategoryModel.create({ ...bodyCategory, createdBy: _id, updatedBy: _id });

    res.status(201).json(newCategory);
};

// El front manda el category completo, con _id y __v incluidos
export const updateCategory = async (req: Request<{ id: string }>, res: Response) => {
    const { id } = req.params;
    const { __v, ...bodyCategory } = req.body as CategoryUpdate;
    const { _id } = req.user;

    const category = await CategoryModel.findById(id);
    if (!category) throw new HttpError(404, "Category not found");

    if (__v !== category.__v) throw new HttpError(409, "Category was modified by someone else");

    category.overwrite({ ...bodyCategory, createdBy: category.createdBy, updatedBy: _id });
    await category.save();

    res.status(200).json(category);
};

export const deleteCategory = async (req: Request<{ id: string }>, res: Response) => {
    const { id } = req.params;

    const category = await CategoryModel.findByIdAndDelete(id);
    if (!category) throw new HttpError(404, "Category not found");

    res.status(204).send();
};
