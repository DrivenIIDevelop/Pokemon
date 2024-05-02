import { Schema, Types, model } from 'mongoose'

export interface IBudget extends Omit<Budget, '_id'> {
  _id: Types.ObjectId
}

const BudgetSchema = new Schema<IBudget>(
  {
    name: { type: String, required: true },
    limit: { type: Number, required: true },
  },
  { toJSON: { virtuals: true } },
)

BudgetSchema.virtual('categories', {
  ref: 'Category',
  localField: '_id',
  foreignField: 'budget',
})

export const Budget = model('Budget', BudgetSchema)
