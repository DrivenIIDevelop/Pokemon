import { Schema, Types, model } from 'mongoose'
import type { IBudget } from '.'

export interface ICategory extends Omit<Category, '_id' | 'budget'> {
  _id: Types.ObjectId
  budget: IBudget['_id']
}

const CategorySchema = new Schema<ICategory>(
  {
    name: { type: String, required: true },
    limit: { type: Number, required: true },
    icon: { type: String },
    budget: { type: Schema.Types.ObjectId, ref: 'Budget', required: true },
  },
  { toJSON: { virtuals: true } },
)

CategorySchema.virtual('expenses', {
  ref: 'Expense',
  localField: '_id',
  foreignField: 'category',
})

export const Category = model('Category', CategorySchema)
