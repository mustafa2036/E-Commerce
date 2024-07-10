import slugify from "slugify"
import { SubCategory } from "../../../database/models/subCategory.model.js"
import { catchError } from "../../middleware/catchError.js"
import { AppError } from '../../utils/appError.js'

const addSubCategory = catchError( async(req, res, next) => {
    req.body.slug = slugify(req.body.name)
    let subCategory = new SubCategory(req.body)
    await subCategory.save()
    res.json({ message: 'success', subCategory })
})

const getAllSubCategories = catchError( async(req, res, next) => {
    let subCategories = await SubCategory.find()
    res.json({ message: 'success', subCategories })
})

const getSignleSubCategory = catchError( async(req, res, next) => {
    let subCategory = await SubCategory.findById(req.params.id)
    subCategory || next(new AppError('subcategory not found', 404))
    !subCategory || res.json({ message: 'success', subCategory })
})

const updateSubCategory = catchError( async(req, res, next) => {
    req.body.slug = slugify(req.body.name)
    let subCategory = await SubCategory.findByIdAndUpdate(req.params.id, req.body, {new: true})
    subCategory || next(new AppError('subcategory not found', 404))
    !subCategory || res.json({ message: 'success', subCategory })
})

const deleteSubCategory = catchError( async(req, res, next) => {
    let subCategory = await SubCategory.findByIdAndDelete(req.params.id)
    subCategory || next(new AppError('subcategory not found', 404))
    !subCategory || res.json({ message: 'success', subCategory })
})

export {
    addSubCategory,
    getAllSubCategories,
    getSignleSubCategory,
    updateSubCategory,
    deleteSubCategory
}