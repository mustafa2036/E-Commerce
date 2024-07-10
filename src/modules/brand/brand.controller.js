import slugify from "slugify"
import { Brand } from "../../../database/models/brand.model.js"
import { catchError } from "../../middleware/catchError.js"
import { AppError } from '../../utils/appError.js'

const addBrand = catchError( async(req, res, next) => {
    req.body.slug = slugify(req.body.name)
    let brand = new Brand(req.body)
    await brand.save()
    res.json({ message: 'success', brand })
})

const allBrands = catchError( async(req, res, next) => {
    let brands = await Brand.find()
    res.json({ message: 'success', brands })
})

const getSignleBrand = catchError( async(req, res, next) => {
    let brand = await Brand.findById(req.params.id)
    brand || next(new AppError('brand not found', 404))
    !brand || res.json({ message: 'success', brand })
})

const updateBrand= catchError( async(req, res, next) => {
    req.body.slug = slugify(req.body.name)
    let brand = await Brand.findByIdAndUpdate(req.params.id, req.body, {new: true})
    brand || next(new AppError('brand not found', 404))
    !brand || res.json({ message: 'success', brand })
})

const deleteBrand = catchError( async(req, res, next) => {
    let brand = await Brand.findByIdAndDelete(req.params.id)
    brand || next(new AppError('brand not found', 404))
    !brand || res.json({ message: 'success', brand })
})

export {
    addBrand,
    allBrands,
    getSignleBrand,
    updateBrand,
    deleteBrand
}