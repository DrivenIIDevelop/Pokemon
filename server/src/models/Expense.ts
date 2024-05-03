import { Schema, Types, model } from 'mongoose'
import type { ICategory } from '.'

export interface IExpense extends Omit<Expense, '_id' | 'date' | 'category'> {
  _id: Types.ObjectId
  date: Date
  category: ICategory['_id']
}

const ExpenseSchema = new Schema<IExpense>(
  {
    title: { type: String, req: true },
    amount: { type: Number, req: true },
    description: { type: String },
    frequency: {
      type: String,
      enum: ['weekly', 'bi-weekly', 'monthly', 'quarterly', 'annually'],
    },
    date: { type: Date, required: true },
    category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
  },
  { toJSON: { virtuals: true } },
)

export const Expense = model('Expense', ExpenseSchema)
