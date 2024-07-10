import brandRouter from "./brand/brand.routes.js";
import categoryRouter from "./category/category.routes.js";
import subCategoryRouter from "./subCategory/subcategory.routes.js";


export const bootstrap = (app) => {
    app.use('/api/v1/categories', categoryRouter)
    app.use('/api/v1/subcategories', subCategoryRouter)
    app.use('/api/v1/brands', brandRouter)
}