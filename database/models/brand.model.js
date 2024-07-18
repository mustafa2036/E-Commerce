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
        lowercase: true
    },
    logo: String,
    createdBy: {
        type: Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true,
    versionKey: false,
});

schema.post('init', function (doc) {
    doc.logo = 'http://localhost:3000/uploads/brands/' + doc.logo
})

export const Brand = model('Brand', schema)