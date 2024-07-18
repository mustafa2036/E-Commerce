import multer from "multer"
import { v4 as uuidv4 } from 'uuid';
import {AppError} from '../utils/appError.js'


export const fileUpload = (folderName) => {
    
    const storage = multer.diskStorage({
        // save image from file name [uploads]
        destination: (req, file, cb) => {
        cb(null, `uploads/${folderName}`)
        },
        filename: (req, file, cb) => {
        cb(null, uuidv4() + '-' +  file.originalname )
        }
    })

    function fileFilter (req, file, cb) {
        if(file.mimetype.startsWith('image')){
            cb(null, true)
        }else{
            cb(new AppError('images Only', 401), false)
        }
    }

    const upload = multer({ storage, fileFilter })
    return upload
}

export  const uploadSingleFiles = (fieldName, folderName) => fileUpload(folderName).single(fieldName)

export  const uploadMixOfFiles = (arrayOfFields, folderName) => 
    fileUpload(folderName).fields(arrayOfFields)