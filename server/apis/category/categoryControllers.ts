import { Request, Response } from "express";
import { IBodyUpdateCategory, IBodyCreateCategory } from "../../types/Category";
import { Category } from "./categoryModels";

export const createCategory = async( req: Request, res: Response ) => {
    try {
        const { name, type } = req.body as IBodyCreateCategory;

        const newCategory = new Category({ name, type });
        await newCategory.save();

        return res.status(201).json(newCategory);


    } catch (error) { console.log(error); return res.status(500).json({ msg: "1500 - unexpected server error" }) }
}


export const getCategories = async( req: Request, res: Response ) => {
    try {
        const categories = await Category.find();
        return res.status(200).json(categories);
        

    } catch (error) { console.log(error); return res.status(500).json({ msg: "1500 - unexpected server error" }) }
}


export const deleteCategoryById = async ( req: Request, res: Response ) => {
    try {
        let { idCategory } = req.params;

        const category = await Category.findByIdAndDelete(idCategory);

        return res.status(200).json(category);
        

    } catch (error) { console.log(error); return res.status(500).json({ msg: "1500 - unexpected server error" }) }
}


export const updateCategoryById = async( req: Request, res: Response ) => {
    try {
        let { idCategory } = req.params;
        let { name, subcategories, type } = req.body as IBodyUpdateCategory;

        // get category
        let existCategory = await Category.findById( idCategory );
        
        // insert new data
        if ( type ) existCategory!.type = type;
        if ( name ) existCategory!.name = name;
        if ( subcategories ) existCategory!.subcategories = subcategories;

        await existCategory!.save();
        return res.json(existCategory);


    } catch (error) { console.log(error); return res.status(500).json({ msg: "1500 - unexpected server error" }) }
}