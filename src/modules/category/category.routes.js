import { Router } from "express";
import { addCategory, deleteCategory, getAllCategories, getSignleCategory, updateCategory } from "./category.controller.js";
import { uploadSingleFiles } from "../../fileUpload/fileUpload.js";
import { validate } from "../../middleware/validate.js";
import { addCategoryValidation } from "./category.validation.js";
import subCategoryRouter from "../subCategory/subcategory.routes.js";
import { allowedTo, protectedRoutes } from "../auth/auth.contoller.js";

const categoryRouter = Router();
categoryRouter.use('/:category/subcategories', subCategoryRouter)

categoryRouter
    .route('/')
    .post(protectedRoutes, allowedTo('user', 'admin', 'mrg'), uploadSingleFiles('image', 'categories'), validate(addCategoryValidation), addCategory)
    .get(getAllCategories)
categoryRouter
    .route('/:id')
    .get(getSignleCategory)
    .put(protectedRoutes, allowedTo('admin', 'mrg'), uploadSingleFiles('image', 'categories'), updateCategory)
    .delete(protectedRoutes, allowedTo('admin'), deleteCategory)


export default categoryRouter;