import * as mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: String,
    lastName: String,
    email: String,
    birthDate: String
}, { timestamps: true });

export const Users = mongoose.model('Users', userSchema);
