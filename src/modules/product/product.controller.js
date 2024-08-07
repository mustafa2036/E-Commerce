import slugify from "slugify"
import { catchError } from "../../middleware/catchError.js"
import { AppError } from '../../utils/appError.js'
import { Product } from "../../../database/models/product.model.js"
import { deleteHandle } from "../handlers/handlers.js"
import { ApiFeatures } from '../../utils/apiFeatures.js'

const addProduct = catchError( async(req, res, next) => {

    req.body.slug = slugify(req.body.title)
    req.body.imageCover = req.files.imageCover[0].filename
    req.body.images = req.files.images.map( img => img.filename )
    let product = new Product(req.body)
    await product.save()
    res.json({ message: 'success', product })

})

const allProduct = catchError( async(req, res, next) => {
    let apiFeatures = new ApiFeatures(Product.find(), req.query)
    .pagination().fields().filter().sort().search()
    let products = await apiFeatures.monogoseQuery
    res.json({ message: 'success', page: apiFeatures.pageNumber, products })
})

const getSignleProduct = catchError( async(req, res, next) => {
    let product = await Product.findById(req.params.id)
    product || next(new AppError('product not found', 404))
    !product || res.json({ message: 'success', product })
})

const updateProduct = catchError( async(req, res, next) => {
    req.body.slug = slugify(req.body.name)
    let product = await Product.findByIdAndUpdate(req.params.id, req.body, {new: true})
    product || next(new AppError('product not found', 404))
    !product || res.json({ message: 'success', product })
})

const deleteProduct = deleteHandle(Product)

export {
    addProduct,
    allProduct,
    getSignleProduct,
    updateProduct,
    deleteProduct
}