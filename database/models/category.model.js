import { Schema, Types, model } from 'mongoose';

// 2- Create Schema
const schema = new Schema({
    name: {
        type: String,
        unique: [true, 'name is required'],
        trim: true,
        required: true,
        minLength: [2, 'too short category name']
    },
    slug: {
        type: String,
        required: true,
        lowercase: true,
        unique: [true, 'name is required'],
    },
    image: String,
    createdBy: {
        type: Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true,
    versionKey: false,
});

schema.post('init', function (doc) {
    doc.image = 'http://localhost:3000/uploads/categories/' + doc.image
})

export const Category = model('Category', schema)