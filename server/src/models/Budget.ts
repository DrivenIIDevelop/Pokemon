import { Schema, Types, model } from 'mongoose'
import type { ICategory } from '.'

export interface IBudget extends Omit<Budget, '_id' | 'categories'> {
  _id: Types.ObjectId
  categories: ICategory['_id'][]
}

const BudgetSchema = new Schema<IBudget>({
  name: { type: String, required: true },
  limit: { type: Number, required: true },
  categories: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
})

export const Budget = model('Budget', BudgetSchema)
