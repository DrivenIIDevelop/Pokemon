import { Schema, model, models } from 'mongoose'

const CategorySchema = new Schema({
  name: { type: String, required: true },
  budget: { type: Schema.Types.ObjectId, ref: 'Budget' },
  expenses: [{ type: Schema.Types.ObjectId, ref: 'Expense' }],
})

export const Category = models.Category || model('Category', CategorySchema)
