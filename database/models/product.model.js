import { Schema, Types, model } from 'mongoose';

// 2- Create Schema
const schema = new Schema({
    title: {
        type: String,
        unique: [true, 'name is required'],
        trim: true,
        required: true,
        minLength: [2, 'too short category name']
    },
    slug: {
        type: String,
        required: true,
        lowercase: true
    },
    decription: {
        type: String,
        required: true,
        minLength: 50,
        maxLength: 2000
    },
    imageCover: String,
    images: [String],
    price: {
        type: Number,
        required: true,
        min: 0
    },
    priceAfterDiscount: {
        type: Number,
        required: true,
        min: 0
    },
    sold: Number,
    stock: { // كمية
        type: Number,
        min: 0
    },
    category: {
        type: Types.ObjectId,
        ref: 'Category'
    },
    subcategory: {
        type: Types.ObjectId,
        ref: 'SubCategory'
    },
    brand: {
        type: Types.ObjectId,
        ref: 'Brand'
    },
    rateAvg: {
        type: Number,
        min: 0,
        max: 5
    },
    rateCount: Number,
    createdBy: {
        type: Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true,
    versionKey: false,
});

schema.post('init', function (doc) {
    
    if(doc.imageCover) doc.imageCover = process.env.BASE_URL + "uploads/products/" + doc.imageCover
    if(doc.images) doc.images = doc.images.map(img => process.env.BASE_URL + "uploads/products/" + img)
})

export const Product = model('Product', schema)