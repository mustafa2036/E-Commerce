import slugify from "slugify"
import { SubCategory } from "../../../database/models/subCategory.model.js"
import { catchError } from "../../middleware/catchError.js"
import { AppError } from '../../utils/appError.js'
import { deleteHandle } from "../handlers/handlers.js"
import { ApiFeatures } from '../../utils/apiFeatures.js'

const addSubCategory = catchError( async(req, res, next) => {
    req.body.slug = slugify(req.body.name)
    let subCategory = new SubCategory(req.body)
    await subCategory.save()
    res.json({ message: 'success', subCategory })
})

const getAllSubCategories = catchError( async(req, res, next) => {
    let filter = {}
    if(req.params.category) filter.category = req.params.category
    let apiFeatures = new ApiFeatures(SubCategory.find(filter), req.query)
    .pagination().fields().filter().sort().search()
    
    let subCategories = await apiFeatures.monogoseQuery
    res.json({ message: 'success', page: apiFeatures.pageNumber, subCategories })

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

const deleteSubCategory = deleteHandle(SubCategory)

export {
    addSubCategory,
    getAllSubCategories,
    getSignleSubCategory,
    updateSubCategory,
    deleteSubCategory
}