import { Router } from "express";
import { addProduct, allProduct, deleteProduct, getSignleProduct, updateProduct } from "./product.controller.js";
import { uploadMixOfFiles } from "../../fileUpload/fileUpload.js";

const productRouter = Router();

productRouter
    .route('/')
    .post(uploadMixOfFiles([{ name: 'imageCover', maxCount: 1 }, { name: 'images', maxCount: 10 }], 'products'), addProduct)
    .get(allProduct)
productRouter
    .route('/:id')
    .get(getSignleProduct)
    .put(uploadMixOfFiles([{ name: 'imageCover', maxCount: 1 }, { name: 'images', maxCount: 10 }], 'products'), updateProduct)
    .delete(deleteProduct)


export default productRouter;