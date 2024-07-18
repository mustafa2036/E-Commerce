import slugify from "slugify"
import { Category } from "../../../database/models/category.model.js"
import { catchError } from "../../middleware/catchError.js"
import { AppError } from '../../utils/appError.js'
import { deleteHandle } from "../handlers/handlers.js"

const addCategory = catchError( async(req, res, next) => {
    req.body.slug = slugify(req.body.name)
    req.body.image = req.file.filename
    let category = new Category(req.body)
    await category.save()
    res.json({ message: 'success', category })
})

const getAllCategories = catchError( async(req, res, next) => {
    let categories = await Category.find()
    res.json({ message: 'success', categories })
})

const getSignleCategory = catchError( async(req, res, next) => {
    let category = await Category.findById(req.params.id)
    category || next(new AppError('category not found', 404))
    !category || res.json({ message: 'success', category })
})

const updateCategory = catchError( async(req, res, next) => {
    if(req.body.slug) req.body.slug = slugify(req.body.name)
    if(req.file) req.body.image = req.file.filename
    let category = await Category.findByIdAndUpdate(req.params.id, req.body, {new: true})
    category || next(new AppError('category not found', 404))
    !category || res.json({ message: 'success', category })
})

const deleteCategory = deleteHandle(Category)
export {
    addCategory,
    getAllCategories,
    getSignleCategory,
    updateCategory,
    deleteCategory
}