import { Schema, Types, model } from 'mongoose'
import type { IBudget, IExpense } from '.'

export interface ICategory extends Omit<Category, '_id'> {
  _id: Types.ObjectId
  budget: IBudget['_id']
  expenses: IExpense['_id'][]
}

const CategorySchema = new Schema<ICategory>({
  name: { type: String, required: true },
  limit: { type: Number, required: true },
  icon: { type: String },
  budget: { type: Schema.Types.ObjectId, ref: 'Budget' },
  expenses: [{ type: Schema.Types.ObjectId, ref: 'Expense' }],
})

export const Category = model('Category', CategorySchema)
