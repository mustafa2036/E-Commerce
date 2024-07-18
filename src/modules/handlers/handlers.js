import { catchError } from "../../middleware/catchError.js"
import { AppError } from '../../utils/appError.js'

export const deleteHandle = (model) => {
    return catchError( async(req, res, next) => {
        let document = await model.findByIdAndDelete(req.params.id)
        document || next(new AppError('document not found', 404))
        !document || res.json({ message: 'success', document })
    })
    
}