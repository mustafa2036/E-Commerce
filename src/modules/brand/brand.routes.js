import { Router } from "express";
import { addBrand, deleteBrand, allBrands, getSignleBrand, updateBrand } from "./brand.controller.js";

const brandRouter = Router();

brandRouter
    .route('/')
    .post(addBrand)
    .get(allBrands)
brandRouter
    .route('/:id')
    .get(getSignleBrand)
    .put(updateBrand)
    .delete(deleteBrand)


export default brandRouter;