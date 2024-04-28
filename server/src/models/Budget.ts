import { Schema, model, models } from 'mongoose'

const BudgetSchema = new Schema({
  name: { type: String, required: true },
  goalAmount: { type: Number, required: true },
  description: { type: String },
  goalDate: { type: Date, default: Date.now },
  status: { type: String, enum: ['in progress', 'completed', 'canceled'], default: 'pending' },
  categories: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
})

export const Budget = models.Budget || model('Budget', BudgetSchema)
