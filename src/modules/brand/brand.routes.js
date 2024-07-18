import { Router } from "express";
import { addBrand, deleteBrand, allBrands, getSignleBrand, updateBrand } from "./brand.controller.js";
import { uploadSingleFiles } from "../../fileUpload/fileUpload.js";

const brandRouter = Router();

brandRouter
    .route('/')
    .post(uploadSingleFiles('logo', 'brands'), addBrand)
    .get(allBrands)
brandRouter
    .route('/:id')
    .get(getSignleBrand)
    .put(uploadSingleFiles('logo', 'brands'), updateBrand)
    .delete(deleteBrand)


export default brandRouter;