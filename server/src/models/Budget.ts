import { Schema, model, models } from 'mongoose'

const BudgetSchema = new Schema({
  name: { type: String, required: true },
  limit: { type: Number, required: true },
  description: { type: String },
  categories: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
})

export const Budget = models.Budget || model('Budget', BudgetSchema)
