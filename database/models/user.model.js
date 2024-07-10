import { Schema, model } from 'mongoose';

// 2- Create Schema
const schema = new Schema({
    name: String,
    email: String,
    password: String,
    isBlocked: {
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    }
}, {
    timestamps: true,
    versionKey: false,
});

export const User = model('User', schema)