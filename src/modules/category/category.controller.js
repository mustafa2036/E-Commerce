import { Category } from "../../../database/models/category.model.js"

const addCategory = async(req, res, next) => {
    let category = new Category(req.body)
    res.json({ message: 'Add Success' })

    
}

export {
    addCategory
}