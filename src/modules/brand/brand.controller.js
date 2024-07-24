import slugify from "slugify"
import { Brand } from "../../../database/models/brand.model.js"
import { catchError } from "../../middleware/catchError.js"
import { AppError } from '../../utils/appError.js'
import { deleteHandle } from "../handlers/handlers.js"
import { ApiFeatures } from '../../utils/apiFeatures.js'

const addBrand = catchError( async(req, res, next) => {
    req.body.slug = slugify(req.body.name)
    req.body.logo = req.file.filename
    let brand = new Brand(req.body)
    await brand.save()
    res.json({ message: 'success', brand })
})

const allBrands = catchError( async(req, res, next) => {
    let apiFeatures = new ApiFeatures(Brand.find(), req.query)
    .pagination().fields().filter().sort().search()
    let brands = await apiFeatures.monogoseQuery
    res.json({ message: 'success', page: apiFeatures.pageNumber, brands })
})

const getSignleBrand = catchError( async(req, res, next) => {
    let brand = await Brand.findById(req.params.id)
    brand || next(new AppError('brand not found', 404))
    !brand || res.json({ message: 'success', brand })
})

const updateBrand= catchError( async(req, res, next) => {
    if(req.body.slug) req.body.slug = slugify(req.body.name)
    if(req.file) req.body.logo = req.file.filename
    let brand = await Brand.findByIdAndUpdate(req.params.id, req.body, {new: true})
    brand || next(new AppError('brand not found', 404))
    !brand || res.json({ message: 'success', brand })
})

const deleteBrand = deleteHandle(Brand)

export {
    addBrand,
    allBrands,
    getSignleBrand,
    updateBrand,
    deleteBrand
}