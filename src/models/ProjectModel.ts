import mongoose from 'mongoose'
import { Schema } from 'mongoose'

const projectSchema = new Schema({
    name     : String,
    userId   : String,
    cards    : Array <{
        id: String,
        name: String,
        priority: Number,
        columnIndex: Number
    }>
}, { autoCreate: false, autoIndex: true });

export const ProjectModel = mongoose.model('Project', projectSchema);
