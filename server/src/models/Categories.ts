import { Schema, model, models, Document } from 'mongoose'
import { Types } from 'mongoose'

const CategorySchema = new Schema({
    name: { type: String, required: true },
    parent: { type: Types.ObjectId, ref: 'Category' },
    properties: [{ type: Object }],
})

export const Category = models.Category || model('Category', CategorySchema)
