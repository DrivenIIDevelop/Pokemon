import { Schema, Types, model } from 'mongoose'
import type { ICategory } from '.'

export interface IBudget {
  _id: Types.ObjectId
  name: string
  limit: number
  description?: string
  categories: ICategory['_id'][]
}

const BudgetSchema = new Schema<IBudget>({
  name: { type: String, required: true },
  limit: { type: Number, required: true },
  description: { type: String },
  categories: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
})

export const Budget = model('Budget', BudgetSchema)
