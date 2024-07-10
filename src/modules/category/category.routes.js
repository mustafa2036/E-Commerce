import { Router } from "express";
import { addCategory, deleteCategory, getAllCategories, getSignleCategory, updateCategory } from "./category.controller.js";

const categoryRouter = Router();

categoryRouter
    .route('/')
    .post(addCategory)
    .get(getAllCategories)
categoryRouter
    .route('/:id')
    .get(getSignleCategory)
    .put(updateCategory)
    .delete(deleteCategory)


export default categoryRouter;