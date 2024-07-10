import { Schema, model } from 'mongoose';

// 2- Create Schema
const schema = new Schema({
    name: {
        type: String
    },
    slug: {
        type: String,
        required: true
    }

});

export const Category = model('Category', schema)