import mongoose from 'mongoose'
import { Schema } from 'mongoose'

const userSchema = new Schema({
  name     : String,
  email    : String,
  password : String
}, { autoCreate: false, autoIndex: true });

export const UserModel = mongoose.model('User', userSchema);
