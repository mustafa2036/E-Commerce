import { Schema, Types, model } from 'mongoose';

// 2- Create Schema
const schema = new Schema({
   code: {
    type: String,
    required: true,
    unique: true
   },
   expires: Date,
   discount: Number
    
}, {
    timestamps: true,
    versionKey: false,
});

export const Coupon = model('Coupon', schema)