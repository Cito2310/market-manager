import { Details } from "../../../../shared/product.schema.js";
import { CategoryModel } from "../category/category.model.js";
import { HttpError } from "../../middlewares/errors/HttpError.js";

type CategoryRefs = Pick<Details, "categoryId" | "subcategoryId" | "brandId">;

export const assertCategoryRefs = async ({ categoryId, subcategoryId, brandId }: CategoryRefs) => {
    const category = await CategoryModel.findById(categoryId).lean();
    if (!category) throw new HttpError(400, "Category not found");

    const subcategory = category.subcategories.find((item) => String(item._id) === subcategoryId);
    if (!subcategory) throw new HttpError(400, "Subcategory does not belong to the category");

    const brand = subcategory.brands.find((item) => String(item._id) === brandId);
    if (!brand) throw new HttpError(400, "Brand does not belong to the subcategory");
};
