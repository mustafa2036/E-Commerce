import { Schema, Types, model } from 'mongoose';

// 2- Create Schema
const schema = new Schema({
    comment: String,
    user: {
        type: Types.ObjectId,
        ref: 'User',
        required: true
    },
    rate: {
        type: Number,
        min: 0,
        max: 5,
        required: true
    },
    product: {
        type: Types.ObjectId,
        ref: 'Product',
        required: true
    },
}, {
    timestamps: true,
    versionKey: false,
});

export const Review = model('Review', schema)